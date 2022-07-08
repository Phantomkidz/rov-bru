<template>
  <div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table no-results-text="ไม่มีข้อมูลแมตท์" no-data-text="ไม่มีข้อมูลแมตท์" :headers="headers" :items="matchResultList" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <div class="search-text-field">
              <v-text-field v-model="search" width="200px" append-icon="mdi-magnify" label="Search" hide-details></v-text-field>
            </div>
            <v-spacer></v-spacer>

            <v-btn color="primary" @click="openPopup('create')" dark class="mb-2"> เพิ่มข้อมูลผลการแข่ง </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="grey" class="ml-2" :to="{ name: 'match-detail', params: { id: item.matchId } }"
            ><v-icon small> mdi-text-box-search-outline </v-icon>ดูข้อมูลแมตท์</v-btn
          >
          <v-btn color="warning" @click="openPopup('edit', item.matchId)" class="ml-2"><v-icon small> mdi-pencil </v-icon>แก้ไข</v-btn>
          <v-btn color="error" @click="delMatchResult(item.matchId)" class="ml-2"><v-icon small> mdi-delete </v-icon>ลบ</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <match-result-form @closePopup="dialog = false" @success="successDialog" v-if="dialog" :id="pk" :process="process"></match-result-form>
    </v-dialog>
    <change-action @success="confirmDel" v-model="dialogDel"></change-action>
  </div>
</template>

<script>
import MatchResultForm from './MatchResultForm.vue'
import ChangeAction from '@/components/ChangeAction.vue'

export default {
  name: 'MatchResultList',
  components: {
    MatchResultForm,
    ChangeAction
  },
  data() {
    return {
      search: '',
      matchResultList: [],
      dialog: false,
      pk: null,
      process: '',
      dialogDel: false,
      headers: [
        {
          text: 'ชื่อแมตท์',
          align: 'start',
          sortable: false,
          value: 'matchGameName'
        },
        { text: 'รอบที่', sortable: false, value: 'matchRound' },
        { text: 'ทีมแดง', sortable: false, value: 'redTeam.teamName' },
        { text: 'คะแนนทีมแดง', sortable: false, value: 'scoreRedTeam' },
        { text: 'ทีมน้ำเงิน', sortable: false, value: 'blueTeam.teamName' },
        { text: 'คะแนนทีมน้ำเงิน', sortable: false, value: 'scoreBlueTeam' },
        { text: 'ทีมผู้ชนะ', sortable: false, value: 'matchWinner' },
        { text: 'เวลาเริ่มแข่ง', value: 'matchDate' },
        { text: '', value: 'actions', sortable: false }
      ]
    }
  },
  async mounted() {
    await this.getMatchResults()
  },
  methods: {
    async getMatchResults() {
      const response = await this.$axios.get('match-result')
      this.matchResultList = response.data.results
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
