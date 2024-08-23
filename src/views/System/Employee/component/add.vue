<template>
  <el-dialog :visible="dialogVisible" width="680px" :title="title" :close-on-click-modal="false" @close="hCloseDialog">
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
import { EditRoleAPI, AddRoleAPI, RoleDetailAPI } from '@/api/role'
import { getRoleListAPI } from '@/api/system'
export default {
  name: 'AddEmployee',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }

<<<<<<< HEAD
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

=======
>>>>>>> role
  },
  data() {
    return {
      title: '添加员工',
      options: [],
      form: {
        phonenumber: '',
        status: 1,
        roleId: '',
        userName: '',
        name: '',
        roleName: ''
      },
      formRules: {
        phonenumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入登陆账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }

    }
  },
  mounted() {
    this.getRoleList()
  },

  methods: {
    async confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          if (this.form.id) {
            console.log('编辑')
            await this.hEdit()
            this.$message.success('编辑成功')
          } else {
            console.log('新增')
            await this.hAdd()
            this.$message.success('新增成功')
          }
        } else {
          console.log('error submit!!')
          return false
        }
        this.hCloseDialog()
        this.$emit('getUserList')
      })
    },
    async hCloseDialog() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addForm.resetFields()
      this.form.roleId = ''
      delete this.form.id
      console.log(this.dialogVisible)
    },
    async hAdd() {
      await AddRoleAPI(this.form)
      this.$emit('getUserList')
    },
    async hEdit() {
      await EditRoleAPI(this.form)
      this.$emit('getUserList')
    },
    async getRoleDetail(roleid) {
      const res = await RoleDetailAPI(roleid)
      console.log(res)
      // 数据回填
      const { phonenumber, status, roleId, userName, name, roleName, id } = res.data
      this.form = {
        phonenumber,
        status,
        roleId,
        userName,
        name,
        roleName,
        id
      }
    },
    async getRoleList() {
      const res = await getRoleListAPI()
      this.options = res.data
    }

  }
}
</script>

<style lang="scss" scoped>
.form-container{
  padding:0px 10px;
}
</style>
