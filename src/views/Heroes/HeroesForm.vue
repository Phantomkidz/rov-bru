<template>
  <div>
    <v-card>
      <form @submit.prevent="saveData()">
        <v-card-title class="justify-center">
          <span class="text-h5">แบบฟอร์มสำหรับกรอกชื่อฮีโร่</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="heroesName"
                  v-model="heroesName"
                  label="ชื่อฮีโร่"
                  v-validate="'required'"
                  :error-messages="errors.first('heroesName') ? 'กรุณากรอกชื่อฮีโร่' : ''"
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
  name: 'HeroesForm',
  props: {
    id: {
      default: null
    },
    process: {
      default: 'create'
    }
  },
  data: () => ({
    heroesName: '',
    heroesNameAlert: ''
  }),
  mounted() {
    if (this.process === 'edit') {
      this.getData()
    }
  },
  watch: {
    heroesName(value) {
      if (value) {
        this.heroesNameAlert = ''
      }
    }
  },
  methods: {
    saveData() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          try {
            let bodyData = {
              heroName: this.heroesName
            }
            if (this.process === 'create') {
              await this.$axios.post('hero', bodyData)
            } else if (this.process === 'edit') {
              await this.$axios.put('hero/' + this.id, bodyData)
            }
            this.$emit('success')
          } catch (error) {
            this.heroesNameAlert = 'ชื่อฮีโร่ตัวนี้ถูกใช้ไปแล้ว'
          }
        }
      })
    },
    async getData() {
      let response = await this.$axios.get('hero/' + this.id).catch(error => {
        console.log(error.response.data.message)
      })
      let defaultData = response.data.results
      this.heroesName = defaultData.heroesName
    }
  }
}
</script>

<style lang="scss" scoped></style>
