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
            <v-btn color="success" @click="exportToExcel()" dark class="mb-2 mr-2"><v-icon>mdi-microsoft-excel </v-icon> ออกรายงาน </v-btn>
            <v-btn color="primary" @click="openPopup('create')" dark class="mb-2"><v-icon>mdi-plus-thick</v-icon> เพิ่มข้อมูลผู้เล่น </v-btn>
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
    <v-snackbar v-model="snackbar" multi-line color="error" :timeout="2000"> ไม่สามารถลบผู้เล่นนี้ได้นี้ได้เนื่องจากมีผู้ใช้งานแล้ว </v-snackbar>
  </div>
</template>

<script>
import PlayerForm from './PlayerForm.vue'
import ChangeAction from '@/components/ChangeAction.vue'
import * as XLSX from 'xlsx'
import moment from 'moment'

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
      snackbar: false,
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
      try {
        await this.$axios.delete('player/' + this.pk)
      } catch (error) {
        this.snackbar = true
      }
      await this.getPlayer()
    },
    openPopup(process, pk = '') {
      this.process = process
      this.pk = pk
      this.dialog = true
    },
    exportToExcel() {
      const fileName = 'playerList' + moment().format('YYYY-MM-DD') + '.xls'
      const ws = XLSX.utils.json_to_sheet(this.playerList)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'playerList')
      XLSX.writeFile(wb, fileName)
    }
  }
}
</script>

<style lang="scss" scoped></style>
