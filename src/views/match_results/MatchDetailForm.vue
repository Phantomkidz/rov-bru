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
export default {
  name: 'MatchDetailForm',
  props: {
    id: {
      default: null
    },
    process: {
      default: 'edit'
    }
  },
  data: () => ({
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
    score: null
  }),
  async mounted() {
    const response = await this.$axios.get('hero')
    this.dropDownHero = response.data.results.map(data => {
      return {
        name: data.heroName,
        id: data.heroId
      }
    })
  },
  methods: {
    saveData() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          try {
            let bodyData = {
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
              console.log(bodyData)
              await this.$axios.put('match-detail/' + this.id, bodyData)
            }
            this.$emit('success')
          } catch (error) {
            console.log(error)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
