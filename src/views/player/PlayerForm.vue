<template>
  <div>
    <v-card>
      <form @submit.prevent="saveData()">
        <v-card-title class="justify-center">
          <span class="text-h5">แบบฟอร์มกรอกข้อมูลผู้เล่น</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="playerName"
                  v-model="playerName"
                  label="ชื่อผู้เล่น"
                  v-validate="'required'"
                  :error-messages="errors.first('playerName') ? 'กรุณากรอกชื่อผู้เล่น' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="playerIngameName"
                  v-model="playerIngameName"
                  label="ชื่อในเกม"
                  v-validate="'required'"
                  :error-messages="errors.first('playerIngameName') ? 'กรุณากรอกชื่อในเกม' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="playerPosition"
                  v-model="playerPosition"
                  label="ตำแหน่งในเกม"
                  v-validate="'required'"
                  :error-messages="errors.first('playerPosition') ? 'กรุณากรอกตำแหน่งในเกม' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select v-model="selectTeam" :items="dropDownTeam" item-text="name" item-value="id" label="ทีม" return-object> </v-select>
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
export default {
  name: 'PlayerForm',
  props: {
    id: {
      default: null
    },
    process: {
      default: 'create'
    }
  },
  data: () => ({
    playerName: '',
    playerIngameName: '',
    playerPosition: '',
    dropDownTeam: [],
    selectTeam: {}
  }),
  async mounted() {
    const response = await this.$axios.get('team')
    console.log(response)
    this.dropDownTeam = response.data.results.map(data => {
      return {
        name: data.teamName,
        id: data.teamId
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
              playerName: this.playerName,
              playerIngameName: this.playerIngameName,
              playerPosition: this.playerPosition,
              teamId: this.selectTeam.id
            }
            if (this.process === 'create') {
              await this.$axios.post('player', bodyData)
            } else if (this.process === 'edit') {
              await this.$axios.put('player/' + this.id, bodyData)
            }
            this.$emit('success')
          } catch (error) {
            console.log(error.response.data.message)
          }
        }
      })
    },
    async getData() {
      let response = await this.$axios.get('player/' + this.id).catch(() => {})
      let defaultData = response.data.results
      this.playerName = defaultData.playerName
      this.playerIngameName = defaultData.playerIngameName
      this.playerPosition = defaultData.playerPosition
      this.selectTeam = this.dropDownTeam.find(data => data.id === defaultData.teamId)
    }
  }
}
</script>

<style lang="scss" scoped></style>
