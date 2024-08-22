<template>
  <el-dialog :visible="dialogVisible" width="680px" title="添加员工" @close="hCloseDialog">
    <!-- 表单接口 -->
    <div class="form-container">
      <el-form ref="addForm" label-position="top" :model="form" :rules="formRules">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="登陆账号" prop="userName">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phonenumber">
          <el-input v-model="form.phonenumber" />
        </el-form-item>
        <el-form-item label="默认密码：123456" />
        <el-form-item label="分配角色" prop="roleName">
          <el-select v-model="form.roleId" placeholder="请选择分配角色">
            <el-option
              v-for="item in options"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="员工状态" prop="status">
          <template>
            <el-radio v-model="form.status" :label="Number(0)">禁用</el-radio>
            <el-radio v-model="form.status" :label="Number(1)">启用</el-radio>
          </template>
        </el-form-item>

      </el-form>
    </div>
    <template #footer>
      <el-button size="mini" @click="hCloseDialog">取 消</el-button>
      <el-button size="mini" type="primary" @click="confirmAdd">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddEmployee',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },

    options: {
      type: Array,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    formRules: {
      type: Object,
      required: true
    },
    hAdd: {
      type: Function,
      required: true
    },
    hEdit: {
      type: Function,
      required: true
    }

  },
  data() {
    return {

    }
  },
  methods: {
    async confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          if (this.form.id) {
            console.log('编辑')
            await this.hEdit()
          } else {
            console.log('新增')
            await this.hAdd()
          }
        } else {
          console.log('error submit!!')
          return false
        }
        this.hCloseDialog()
      })
    },
    async hCloseDialog() {
      this.$refs.addForm.resetFields() // 同步操作
      this.form.roleId = '' // 同步操作
      delete this.form.id
      this.$emit('update:dialogVisible', false)
    }

  }
}
</script>

<style lang="scss" scoped>
.form-container{
  padding:0px 10px;
}
</style>
