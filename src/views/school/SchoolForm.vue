<template>
  <div>
    <v-card>
      <form @submit.prevent="saveData()">
        <v-card-title class="justify-center">
          <span class="text-h5">แบบฟอร์มกรอกโรงเรียนและจังหวัด</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="schoolName"
                  v-model="schoolName"
                  label="ชื่อโรงเรียน"
                  v-validate="'required'"
                  :error-messages="errors.first('schoolName') ? 'กรุณากรอกชื่อโรงเรียน' : ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="schoolCity"
                  v-model="schoolCity"
                  label="ชื่อจังหวัด"
                  v-validate="'required'"
                  :error-messages="errors.first('schoolCity') ? 'กรุณากรอกชื่อจังหวัด' : ''"
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
export default {
  name: 'SchoolForm',
  props: {
    id: {
      default: null
    },
    process: {
      default: 'create'
    }
  },
  data: () => ({
    schoolName: '',
    schoolCity: ''
  }),
  mounted() {
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
              schoolName: this.schoolName,
              schoolCity: this.schoolCity
            }
            if (this.process === 'create') {
              await this.$axios.post('school', bodyData)
            } else if (this.process === 'edit') {
              await this.$axios.put('school/' + this.id, bodyData)
            }
            this.$emit('success')
          } catch (error) {
            console.log(error.response.data.message)
          }
        }
      })
    },
    async getData() {
      let response = await this.$axios.get('school/' + this.id).catch(() => {})
      let defaultData = response.data.results
      this.schoolName = defaultData.schoolName
      this.schoolCity = defaultData.schoolCity
    }
  }
}
</script>

<style lang="scss" scoped></style>
