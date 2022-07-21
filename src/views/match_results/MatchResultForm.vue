<template>
  <div>
    <v-card>
      <form @submit.prevent="saveData()">
        <v-card-title class="justify-center">
          <span class="text-h5">แบบฟอร์มกรอกผลแข่งขัน</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="matchGameName"
                  v-model="matchGameName"
                  label="ชื่อแมตท์"
                  v-validate="'required'"
                  :error-messages="errors.first('matchGameName') ? 'กรุณากรอกชื่อแมตท์' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="matchRound"
                  v-model="matchRound"
                  label="แมตท์รอบที่"
                  v-validate="'required'"
                  :error-messages="errors.first('matchRound') ? 'กรุณากรอกรอบแมตท์' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select v-model="redTeam" :items="dropDownRedTeam" item-text="name" item-value="id" label="Red Team" return-object> </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  name="scoreRedTeam"
                  v-model="scoreRedTeam"
                  label="คะแนนทีมแดง"
                  v-validate="'required'"
                  :error-messages="errors.first('scoreRedTeam') ? 'คะแนนทีมแดง' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select v-model="blueTeam" :items="dropDownBlueTeam" item-text="name" item-value="id" label="Blue Team" return-object> </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  name="scoreBlueTeam"
                  v-model="scoreBlueTeam"
                  label="คะแนนทีมน้ำเงิน"
                  v-validate="'required'"
                  :error-messages="errors.first('scoreBlueTeam') ? 'คะแนนทีมน้ำเงิน' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="matchWinner"
                  :disabled="!redTeam.id || !blueTeam.id"
                  :items="dropDownWinner"
                  item-text="name"
                  item-value="id"
                  label="Winner"
                  return-object
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="datetime" label="เลือกวันที่แข่งขัน" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="datetime" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(datetime)"> OK </v-btn>
                  </v-date-picker>
                </v-dialog>
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
import moment from 'moment'
// import Datepicker from 'vuejs-datepicker'

export default {
  name: 'MatchResultForm',
  components: {
    // Datepicker
  },
  props: {
    id: {
      default: null
    },
    process: {
      default: 'create'
    }
  },
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    modal: false,
    matchGameName: '',
    matchRound: '',
    dropDownRedTeam: [],
    dropDownBlueTeam: [],
    dropDownWinner: [],
    selectTeam: {},
    redTeam: {},
    blueTeam: {},
    scoreRedTeam: null,
    scoreBlueTeam: null,
    matchWinner: {},
    dropDownTeam: [],
    datetime: ''
  }),
  watch: {
    redTeam(newValue) {
      this.dropDownBlueTeam = this.dropDownTeam.filter(data => data.id !== newValue.id)
      this.getWinner('red', newValue)
    },
    blueTeam(newValue) {
      if (newValue) {
        this.dropDownRedTeam = this.dropDownTeam.filter(data => data.id !== newValue.id)
        this.getWinner('blue', newValue)
      }
    }
  },
  async mounted() {
    const response = await this.$axios.get('team')
    this.dropDownTeam = response.data.results.map(data => {
      return {
        name: data.teamName,
        id: data.teamId
      }
    })
    this.dropDownRedTeam = this.dropDownTeam
    this.dropDownBlueTeam = this.dropDownTeam
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
              matchGameName: this.matchGameName,
              matchRound: this.matchRound,
              redTeam: this.redTeam.id,
              scoreRedTeam: this.scoreRedTeam,
              blueTeam: this.blueTeam.id,
              scoreBlueTeam: this.scoreBlueTeam,
              matchWinner: this.matchWinner.name,
              matchDate: moment(this.datetime).format('YYYY-MM-DD')
            }
            if (this.process === 'create') {
              await this.$axios.post('match-result', bodyData)
            } else if (this.process === 'edit') {
              await this.$axios.put('match-result/' + this.id, bodyData)
            }
            this.$emit('success')
          } catch (error) {
            console.log(error.response.data.message)
          }
        }
      })
    },
    async getData() {
      let response = await this.$axios.get('match-result/' + this.id).catch(() => {})
      let defaultData = response.data.results
      this.matchGameName = defaultData.matchGameName
      this.matchRound = defaultData.matchRound
      this.redTeam = this.dropDownRedTeam.find(data => data.id === defaultData.redTeam.teamId)
      this.scoreRedTeam = defaultData.scoreRedTeam
      this.blueTeam = this.dropDownBlueTeam.find(data => data.id === defaultData.blueTeam.teamId)
      this.scoreBlueTeam = defaultData.scoreBlueTeam
      this.datetime = defaultData.matchDate
      setTimeout(() => {
        this.matchWinner = this.dropDownWinner.find(data => data.name == defaultData.matchWinner)
      }, 300)
    },
    getWinner(type, value) {
      let index = this.dropDownWinner.findIndex(data => data.type === type)
      let payload = {
        ...value,
        type
      }
      if (index !== -1) {
        this.dropDownWinner.splice(index, 1, payload)
      } else {
        this.dropDownWinner.push(payload)
      }
      this.matchWinner = {}
    }
  }
}
</script>

<style lang="scss" scoped></style>
