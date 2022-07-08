<template>
  <div>
    <div class="mt-12">
      <v-card>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">ชื่อผู้เล่น</th>
                <th class="text-left">ชื่อในเกม</th>
                <th class="text-left">ฮีโร่</th>
                <th class="text-left">ดาเมจที่ทำ</th>
                <th class="text-left">ดาเมจที่ได้รับ</th>
                <th class="text-left">ทีมไฟต์</th>
                <th class="text-left">ฆ่า</th>
                <th class="text-left">ตาย</th>
                <th class="text-left">ช่วยเหลือ</th>
                <th class="text-left">เงิน</th>
                <th class="text-left">คะแนน</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in blueTeam" :key="item.name">
                <td>{{ item.playerName }}</td>
                <td>{{ item.playerIngameName }}</td>
                <td>{{ item.heroName }}</td>
                <td>{{ item.makeDamage }}</td>
                <td>{{ item.getDamage }}</td>
                <td>{{ item.teamFight }}</td>
                <td>{{ item.amountKill }}</td>
                <td>{{ item.amountDead }}</td>
                <td>{{ item.amountAssist }}</td>
                <td>{{ item.money }}</td>
                <td>{{ item.score }}</td>

                <v-btn color="warning" @click="openPopup('edit', item.matchDetailId)" class="ml-2"><v-icon small> mdi-pencil </v-icon>แก้ไข</v-btn>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </div>
    <v-divider class="mt-12"></v-divider>
    <div>
      <v-card>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">ชื่อผู้เล่น</th>
                <th class="text-left">ชื่อในเกม</th>
                <th class="text-left">ฮีโร่</th>
                <th class="text-left">ดาเมจที่ทำ</th>
                <th class="text-left">ดาเมจที่ได้รับ</th>
                <th class="text-left">ทีมไฟต์</th>
                <th class="text-left">ฆ่า</th>
                <th class="text-left">ตาย</th>
                <th class="text-left">ช่วยเหลือ</th>
                <th class="text-left">เงิน</th>
                <th class="text-left">คะแนน</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in redTeam" :key="item.name">
                <td>{{ item.playerName }}</td>
                <td>{{ item.playerIngameName }}</td>
                <td>{{ item.heroName }}</td>
                <td>{{ item.makeDamage }}</td>
                <td>{{ item.getDamage }}</td>
                <td>{{ item.teamFight }}</td>
                <td>{{ item.amountKill }}</td>
                <td>{{ item.amountDead }}</td>
                <td>{{ item.amountAssist }}</td>
                <td>{{ item.money }}</td>
                <td>{{ item.score }}</td>

                <v-btn color="warning" @click="openPopup('edit', item.matchDetailId)" class="ml-2"><v-icon small> mdi-pencil </v-icon>แก้ไข</v-btn>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider></v-divider>
      </v-card>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <match-detail-form @closePopup="dialog = false" @success="successDialog" v-if="dialog" :id="pk" :process="process"></match-detail-form>
    </v-dialog>
    <change-action @success="confirmDel" v-model="dialogDel"></change-action>
  </div>
</template>

<script>
import ChangeAction from '@/components/ChangeAction.vue'
import MatchDetailForm from './MatchDetailForm.vue'

export default {
  name: 'matchDetail',
  components: {
    ChangeAction,
    MatchDetailForm
  },
  data() {
    return {
      search: '',
      matchDetail: [],
      dialog: false,
      pk: null,
      process: '',
      dialogDel: false,
      matchResultId: '',
      redTeam: [],
      blueTeam: []
    }
  },
  async mounted() {
    this.matchResultId = this.$route.params.id
    await this.getMatchResults()
  },
  methods: {
    async getMatchResults() {
      const response = await this.$axios.get('match-detail/' + this.matchResultId)
      this.matchDetail = response.data.results
      this.blueTeam = this.matchDetail.filter(data => data.teamType === 'B')
      this.redTeam = this.matchDetail.filter(data => data.teamType === 'R')
    },
    async successDialog() {
      this.dialog = false
      await this.getMatchResults()
    },
    delMatchResult(id) {
      this.dialogDel = true
      this.pk = id
    },
    async confirmDel() {
      await this.$axios.delete('match-result/' + this.pk).catch(error => {
        console.log(error.response.data.message)
      })
      await this.getMatchResults()
    },
    openPopup(process, pk = '') {
      this.process = process
      this.pk = pk
      this.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
