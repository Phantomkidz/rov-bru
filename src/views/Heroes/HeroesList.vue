<template>
  <div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table no-results-text="ไม่มีข้อมูลฮีโร่" no-data-text="ไม่มีข้อมูลฮีโร่" :headers="headers" :items="heroesList" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <div class="search-text-field">
              <v-text-field v-model="search" width="200px" append-icon="mdi-magnify" label="Search" hide-details></v-text-field>
            </div>
            <v-spacer></v-spacer>

            <v-btn color="primary" @click="openPopup('create')" dark class="mb-2"> เพิ่มฮีโร่ </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="warning" @click="openPopup('edit', item.heroId)"><v-icon small> mdi-pencil </v-icon>แก้ไข</v-btn>
          <v-btn color="error" @click="delPlayer(item.heroId)" class="ml-2"><v-icon small> mdi-delete </v-icon>ลบ</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <heroes-form @closePopup="dialog = false" @success="successDialog" v-if="dialog" :id="pk" :process="process"></heroes-form>
    </v-dialog>
    <change-action @success="confirmDel" v-model="dialogDel"></change-action>
  </div>
</template>

<script>
import HeroesForm from './HeroesForm.vue'
import ChangeAction from '@/components/ChangeAction.vue'

export default {
  name: 'HeroesList',
  components: {
    HeroesForm,
    ChangeAction
  },
  data() {
    return {
      search: '',
      dialogDel: false,
      heroesList: [],
      pk: null,
      process: '',
      dialog: false,
      headers: [
        {
          text: 'ชื่อฮีโร่',
          align: 'start',
          value: 'heroName',
          width: '80%'
        },

        { text: '', value: 'actions', sortable: false, width: '20%' }
      ]
    }
  },
  async mounted() {
    await this.getHeroes()
  },
  methods: {
    async getHeroes() {
      const response = await this.$axios.get('hero')
      this.heroesList = response.data.results
    },
    async successDialog() {
      this.dialog = false
      await this.getHeroes()
    },
    async delHeroes(id) {
      await this.$axios.delete('hero/' + id)
      await this.getHeroes()
    },
    openPopup(process, pk = '') {
      this.process = process
      this.pk = pk
      this.dialog = true
    },
    async confirmDel() {
      await this.$axios.delete('player/' + this.pk).catch(error => {
        console.log(error.response.data.message)
      })
      await this.getPlayer()
    }
  }
}
</script>

<style lang="scss" scoped>
.font-size {
  font-size: 1.5rem;
}
</style>
