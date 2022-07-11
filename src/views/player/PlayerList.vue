<template>
  <div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table no-results-text="ไม่มีข้อมูลผู้เล่น" no-data-text="ไม่มีข้อมูลผู้เล่น" :headers="headers" :items="playerList" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <div class="search-text-field">
              <v-text-field v-model="search" width="200px" append-icon="mdi-magnify" label="Search" hide-details></v-text-field>
            </div>
            <v-spacer></v-spacer>

            <v-btn color="primary" @click="openPopup('create')" dark class="mb-2"> เพิ่มข้อมูลผู้เล่น </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="warning" @click="openPopup('edit', item.playerId)"><v-icon small> mdi-pencil </v-icon>แก้ไข</v-btn>
          <v-btn color="error" @click="delPlayer(item.playerId)" class="ml-2"><v-icon small> mdi-delete </v-icon>ลบ</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <player-form @closePopup="dialog = false" @success="successDialog" v-if="dialog" :id="pk" :process="process"></player-form>
    </v-dialog>
    <change-action @success="confirmDel" v-model="dialogDel"></change-action>
  </div>
</template>

<script>
import PlayerForm from './PlayerForm.vue'
import ChangeAction from '@/components/ChangeAction.vue'

export default {
  name: 'playerList',
  components: {
    PlayerForm,
    ChangeAction
  },
  data() {
    return {
      search: '',
      playerList: [],
      dialog: false,
      pk: null,
      process: '',
      dialogDel: false,
      headers: [
        {
          text: 'ชื่อผู้เล่น',
          align: 'start',
          sortable: false,
          value: 'playerName'
        },
        { text: 'ชื่อในเกม', value: 'playerIngameName', sortable: false },
        { text: 'ตำแหน่งผู้เล่น', value: 'playerPosition', sortable: false },
        { text: 'ชื่อทีม', value: 'teamName' },
        { text: 'ชื่อโรงเรียน', value: 'schoolName' },
        { text: 'ชื่อจังหวัด', value: 'schoolCity', sortable: false },
        { text: '', value: 'actions', sortable: false }
      ]
    }
  },
  async mounted() {
    await this.getPlayer()
  },
  methods: {
    async getPlayer() {
      const response = await this.$axios.get('player')
      this.playerList = response.data.results
    },
    async successDialog() {
      this.dialog = false
      await this.getPlayer()
    },
    delPlayer(id) {
      this.dialogDel = true
      this.pk = id
    },
    async confirmDel() {
      await this.$axios.delete('player/' + this.pk).catch(error => {
        console.log(error.response.data.message)
      })
      await this.getPlayer()
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
