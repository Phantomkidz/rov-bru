<template>
  <div>
    <v-card>
      <form @submit.prevent="saveData()">
        <v-card-title class="justify-center">
          <span class="text-h5">แบบฟอร์มแก้ไขรายละเอียดของแมตท์</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select v-model="playerSelect" :items="dropdownPlayer" item-text="name" item-value="id" label="เลือกผู้เล่น" return-object> </v-select>
              </v-col>
              <v-col cols="12">
                <v-select v-model="heroSelect" :items="dropDownHero" item-text="name" item-value="id" label="เลือกฮีโร่" return-object> </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  name="makeDamage"
                  v-model="makeDamage"
                  label="ดาเมจที่ทำ"
                  v-validate="'required'"
                  :error-messages="errors.first('makeDamage') ? 'กรุณากรอกดามเมจที่ทำ' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  name="getDamage"
                  v-model="getDamage"
                  label="ดาเมจที่ได้รับ"
                  v-validate="'required'"
                  :error-messages="errors.first('getDamage') ? 'กรุณากรอกดามเมจที่ได้รับ' : ''"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  type="number"
                  name="teamFight"
                  v-model="teamFight"
                  label="ทีมไฟต์"
                  v-validate="'required'"
                  :error-messages="errors.first('teamFight') ? 'กรุณากรอกทีมไฟต์' : ''"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  type="number"
                  name="amountKill"
                  v-model="amountKill"
                  label="จำนวนครั้งที่ฆ่า"
                  v-validate="'required'"
                  :error-messages="errors.first('amountKill') ? 'กรุณากรอกจำนวนครั้งที่ฆ่า' : ''"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  type="number"
                  name="amountDead"
                  v-model="amountDead"
                  label="จำนวนครั้งที่ตาย"
                  v-validate="'required'"
                  :error-messages="errors.first('amountDead') ? 'กรุณากรอกจำนวนครั้งที่ตาย' : ''"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  type="number"
                  name="amountAssist"
                  v-model="amountAssist"
                  label="จำนวนครั้งที่ช่วยเหลือ"
                  v-validate="'required'"
                  :error-messages="errors.first('amountAssist') ? 'กรุณากรอกจำนวนครั้งช่วยเหลือ' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  name="money"
                  v-model="money"
                  label="จำนวนเงิน"
                  v-validate="'required'"
                  :error-messages="errors.first('money') ? 'กรุณากรอกจำนวนเงิน' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  name="score"
                  v-model="score"
                  label="คะแนน"
                  v-validate="'required'"
                  :error-messages="errors.first('score') ? 'กรุณากรอกคะแนน' : ''"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red lighten-2" @click="$emit('closePopup')"> ปิด </v-btn>
          <v-btn color="success" type="submit"> บันทึก </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'MatchDetailForm',
  props: {
    id: {
      default: null
    },
    process: {
      default: 'edit'
    },
    redTeam: {
      default: []
    },
    blueTeam: {
      default: []
    },
    teamType: {
      default: ''
    },
    playerRedTeam: {
      default: () => [],
      type: Array
    },
    playerBlueTeam: {
      default: () => [],
      type: Array
    }
  },
  data: () => ({
    dropdownPlayer: [],
    dropDownHero: [],
    heroSelect: {},
    heroId: null,
    makeDamage: null,
    getDamage: null,
    teamFight: null,
    amountKill: null,
    amountDead: null,
    amountAssist: null,
    money: null,
    score: null,
    sortHero: [],
    playerSelect: {}
  }),
  computed: {
    redTeamHero() {
      return this.redTeam.map(data => data.heroName)
    },
    blueTeamHero() {
      return this.blueTeam.map(data => data.heroName)
    },
    redTeamPlayer() {
      return this.redTeam.map(data => data.playerId)
    },
    blueTeamPlayer() {
      return this.blueTeam.map(data => data.playerId)
    }
  },

  async mounted() {
    const response = await this.$axios.get('hero')
    this.sortHero = _.orderBy(response.data.results, ['heroName', 'asc'])

    let filterHero = this.sortHero.filter(item => {
      let check = false

      if (this.teamType === 'R' && this.redTeamHero.includes(item.heroName)) {
        check = false
      } else if (this.teamType === 'R') {
        check = true
      }
      if (this.teamType === 'B' && this.blueTeamHero.includes(item.heroName)) {
        check = false
      } else if (this.teamType === 'B') {
        check = true
      }
      return check
    })
    this.dropDownHero = filterHero.map(data => {
      return {
        name: data.heroName,
        id: data.heroId
      }
    })
    if (this.process === 'edit') {
      this.getData()
    }
  },
  methods: {
    saveData() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          try {
            let bodyData = {
              playerId: this.playerSelect.id,
              heroId: this.heroSelect.id,
              makeDamage: this.makeDamage,
              getDamage: this.getDamage,
              teamFight: this.teamFight,
              amountKill: this.amountKill,
              amountDead: this.amountDead,
              amountAssist: this.amountAssist,
              money: this.money,
              score: this.score ? parseFloat(this.score) : 0
            }
            if (this.process === 'edit') {
              await this.$axios.put('match-detail/' + this.id, bodyData)
            }
            this.$emit('success')
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    async getData() {
      let response = await this.$axios.get('match-detail/one/' + this.id).catch(() => {})
      let defaultData = response.data.results
      this.makeDamage = defaultData.makeDamage
      this.getDamage = defaultData.getDamage
      this.teamFight = defaultData.teamFight
      this.amountKill = defaultData.amountKill
      this.amountDead = defaultData.amountDead
      this.amountAssist = defaultData.amountAssist
      this.money = defaultData.money
      this.score = defaultData.score

      if (this.teamType === 'R') {
        this.dropdownPlayer = this.playerRedTeam.filter(item => !this.redTeamPlayer.includes(item.id) || item.id === defaultData.playerId)
      }

      if (this.teamType === 'B') {
        this.dropdownPlayer = this.playerBlueTeam.filter(item => !this.blueTeamPlayer.includes(item.id) || item.id === defaultData.playerId)
      }

      if (defaultData.playerId) {
        let team = this.teamType === 'R' ? this.playerRedTeam : this.playerBlueTeam
        this.playerSelect = team.find(({ id }) => id === defaultData.playerId)
      }

      if (defaultData.heroId) {
        let getHero = this.sortHero.find(({ heroId }) => heroId === defaultData.heroId)
        let originHero = {
          id: getHero.heroId,
          name: getHero.heroName
        }
        this.dropDownHero.push(originHero)
        this.heroSelect = originHero
        this.dropDownHero = _.orderBy(this.dropDownHero, ['name', 'asc'])
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
