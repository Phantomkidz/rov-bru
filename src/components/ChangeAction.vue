<template>
  <div>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"><div class="text-center full-width">ต้องการลบข้อมูลปัจจุบันใช่หรือไม่</div> </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="deleteItemConfirm">ตกลง</v-btn>
          <v-btn color="grey" @click="dialogDelete = false">ยกเลิก</v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ChangeAction',
  props: {
    value: {
      default: false
    }
  },
  data() {
    return {
      dialogDelete: false
    }
  },
  watch: {
    value(newValue) {
      this.dialogDelete = newValue
    },
    dialogDelete(newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    deleteItemConfirm() {
      this.$emit('success')
      this.dialogDelete = false
    }
  }
}
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
}
</style>
