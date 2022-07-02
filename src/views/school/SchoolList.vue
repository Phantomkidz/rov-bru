<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">School Name</th>
            <th class="text-left">School City</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in schoolList" :key="item.name">
            <td>{{ item.schoolName }}</td>
            <td>{{ item.schoolCity }}</td>
            <td><v-btn color="green">แก้ไข</v-btn><v-btn class="ml-1" color="red">ลบ</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="mt-6"><v-btn>เพิ่มข้อมูล</v-btn></div>
  </div>
</template>

<script>
export default {
  name: 'SchoolList',
  data() {
    return {
      schoolList: []
    }
  },
  async mounted() {
    await this.getSchool()
  },
  methods: {
    async getSchool() {
      const response = await this.$axios.get('school')
      this.schoolList = response.data.results
    }
  }
}
</script>

<style lang="scss" scoped>
.font-size {
  font-size: 1.5rem;
}
</style>
