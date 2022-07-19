<template>
  <div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table no-results-text="ไม่มีข้อมูล" no-data-text="ไม่มีข้อมูล" :headers="headers" :items="schoolList" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <div class="search-text-field">
              <v-text-field v-model="search" width="200px" append-icon="mdi-magnify" label="Search" hide-details></v-text-field>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="exportToExcel()" dark class="mb-2 mr-2"><v-icon>mdi-microsoft-excel </v-icon> ออกรายงาน </v-btn>
            <v-btn color="primary" @click="openPopup('create')" dark class="mb-2"><v-icon>mdi-plus-thick</v-icon> เพิ่มข้อมูลโรงเรียน </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="warning" @click="openPopup('edit', item.schoolId)"><v-icon small> mdi-pencil </v-icon>แก้ไข</v-btn>
          <v-btn color="error" @click="delSchool(item.schoolId)" class="ml-2"><v-icon small> mdi-delete </v-icon>ลบ</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <school-form @closePopup="dialog = false" @success="successDialog" v-if="dialog" :id="pk" :process="process"></school-form>
    </v-dialog>
    <change-action @success="confirmDel" v-model="dialogDel"></change-action>
    <v-snackbar v-model="snackbar" multi-line color="error" :timeout="2000"> ไม่สามารถลบโรงเรียนนี้ได้เนื่องจากมีผู้ใช้งานแล้ว </v-snackbar>
  </div>
</template>

<script>
import SchoolForm from './SchoolForm.vue'
import ChangeAction from '@/components/ChangeAction.vue'
import * as XLSX from 'xlsx'
import moment from 'moment'

export default {
  name: 'SchoolList',
  components: {
    SchoolForm,
    ChangeAction
  },
  data() {
    return {
      search: '',
      schoolList: [],
      pk: null,
      process: '',
      dialog: false,
      dialogDel: false,
      snackbar: false,
      headers: [
        {
          text: 'โรงเรียน',
          align: 'start',
          sortable: false,
          value: 'schoolName'
        },
        { text: 'จังหวัด', value: 'schoolCity' },
        { text: '', value: 'actions', sortable: false, width: '20%' }
      ]
    }
  },

  async mounted() {
    await this.getSchool()
  },
  methods: {
    async getSchool() {
      const response = await this.$axios.get('school')
      this.schoolList = response.data.results
    },
    async successDialog() {
      this.dialog = false
      await this.getSchool()
    },
    delSchool(id) {
      this.dialogDel = true
      this.pk = id
    },
    async confirmDel() {
      try {
        await this.$axios.delete('school/' + this.pk)
      } catch (error) {
        this.snackbar = true
      }
      await this.getSchool()
    },
    openPopup(process, pk = '') {
      this.process = process
      this.pk = pk
      this.dialog = true
    },
    exportToExcel() {
      const fileName = 'schoolList' + moment().format('YYYY-MM-DD') + '.xls'
      const ws = XLSX.utils.json_to_sheet(this.schoolList)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'schoolList1')
      XLSX.writeFile(wb, fileName)
    }
  }
}
</script>

<style lang="scss" scoped>
.font-size {
  font-size: 1.5rem;
}
</style>
