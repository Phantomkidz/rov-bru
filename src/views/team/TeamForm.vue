<template>
  <div>
    <v-card>
      <form @submit.prevent="saveData()">
        <v-card-title class="justify-center">
          <span class="text-h5">แบบฟอร์มกรอกชื่อทีม</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="teamName"
                  v-model="teamName"
                  label="ชื่อทีม"
                  v-validate="'required'"
                  :error-messages="errors.first('teamName') ? 'ชื่อทีม' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select v-model="schoolSelect" :items="dropdownSchool" item-text="name" item-value="id" label="Select" return-object> </v-select>
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
  name: 'TeamForm',
  props: {
    id: {
      default: null
    },
    process: {
      default: 'create'
    }
  },
  data: () => ({
    teamName: '',
    dropdownSchool: [],
    schoolSelect: {}
  }),
  async mounted() {
    const response = await this.$axios.get('school')
    let schoolList = _.orderBy(response.data.results, ['schoolName'], ['asc'])
    this.dropdownSchool = schoolList.map(data => {
      return {
        name: data.schoolName,
        id: data.schoolId
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
              teamName: this.teamName,
              schoolId: this.schoolSelect.id
            }
            if (this.process === 'create') {
              await this.$axios
                .post('team', bodyData)
                .then(result => {
                  console.log(result)
                })
                .catch(err => {
                  console.log(err)
                })
              console.log(bodyData)
            } else if (this.process === 'edit') {
              await this.$axios.put('team/' + this.id, bodyData)
            }
            this.$emit('success')
          } catch (error) {
            console.log(error.response.data.message)
          }
        }
      })
    },
    async getData() {
      let response = await this.$axios.get('team/' + this.id).catch(() => {})
      let defaultData = response.data.results
      this.teamName = defaultData.teamName
      this.schoolSelect = this.dropdownSchool.find(data => data.id === defaultData.schoolId)
    }
  }
}
</script>

<style lang="scss" scoped></style>
