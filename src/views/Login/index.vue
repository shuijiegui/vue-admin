<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <el-form ref="form" :rules="rules" :model="formData">
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="formData.password" placeholder="请输入密码" />
        </el-form-item>

        <el-form-item prop="remember">
          <el-checkbox v-model="formData.remember">记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login_btn" @click="Login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      formData: {
        username: '',
        password: '',
        remember: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 判断本地缓存有无表单数据
    const formData = JSON.parse(localStorage.getItem('remember_key'))
    if (formData) {
      this.formData.username = formData.username
      this.formData.password = formData.password
      this.formData.remember = true
    }
  },
  methods: {
    Login() {
      this.$refs.form.validate(async valis => {
        if (!valis) return
        await this.$store.dispatch('user/doLogin', {
          username: this.formData.username,
          password: this.formData.password
        })
        if (this.formData.remember) {
          localStorage.setItem('remember_key', JSON.stringify({
            username: this.formData.username,
            password: this.formData.password

          }))
        } else {
          localStorage.removeItem('remember_key')
        }
        this.$message.success('登录成功')
        this.$router.push('/')
      })
    }
  }

}

</script>

<style scoped lang="scss">
  .login_body {
    display: flex;
  }
  .bg {
    width: 60vw;
    height: 100vh;
    background: url('~@/assets/login-bg.svg') no-repeat;
    background-position: right top;
    background-size: cover;
  }
  .box {
    margin: 200px 10% 0;
    flex: 1;
    .title {
      padding-bottom: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #1e2023;
    }
    ::v-deep() {
      .ant-form-item {
        display: flex;
        margin-bottom: 62px;
        flex-direction: column;
      }
      .ant-form-item-label label {
        font-size: 16px;
        color: #8b929d;
      }
      .ant-input,
      .ant-input-password {
        border-radius: 8px;
      }
    }
  }
  .login_btn{
    width: 100%;
  }
</style>
