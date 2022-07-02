<template>
  <div class="login">
    <v-container>
      <v-row>
        <v-col class="full-height d-flex justify-center align-items-center">
          <v-card class="rounded-xl" width="600px">
            <div class="ma-8">
              <h2 class="py-5 text-center">ยินดีต้อนรับเข้าสู่หน้า Login</h2>
              <v-row justify="center">
                <v-col class="d-flex align-center" cols="10">
                  <v-icon class="mr-5" color="rgb(203, 50, 50)">fas fa-user</v-icon>
                  <v-text-field label="Username" color="rgb(203, 50, 50)"> </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col class="d-flex align-center" cols="10">
                  <v-icon class="mr-5" color="rgb(203, 50, 50)">fas fa-key</v-icon>
                  <v-text-field label="Password" color="rgb(203, 50, 50)"></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" class="pb-5">
                <v-btn class="font-weight-bold" color="rgb(203, 50, 50)" dark>เข้าสู่ระบบ</v-btn>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss" scoped>
.login {
  background: rgb(203, 50, 50);
  background: radial-gradient(circle, rgba(203, 50, 50, 1) 0%, rgba(0, 0, 0, 1) 100%);
  height: 100vh;
  width: 100vw;
}
.full-height {
  height: 100vh;
  align-items: center;
}
.login-textfield {
  width: 200px;
}
</style>
