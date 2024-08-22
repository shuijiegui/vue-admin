<template>
  <div class="employee-container">
    <div class="search-container">
      <div class="search-label">员工名称：</div>
      <el-input
        v-model="params.name"
        clearable
        placeholder="请输入内容"
        class="search-main"
        @clear="doSearch"
      />
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" @click="hShow">添加员工</el-button>
    </div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" :index="hIndex" />
      <el-table-column prop="userName" label="员工姓名" width="150" />
      <el-table-column prop="name" label="登陆账号" width="130" />
      <el-table-column prop="phonenumber" label="联系方式" width="160" />
      <el-table-column prop="roleName" label="角色" width="130" />
      <el-table-column label="状态" width="100" prop="status">
        <template #default="scope">
          <el-tag :type="statusType(scope.row.status)">{{
            statusInfo(scope.row.status)
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            size="mini"
            type="text"
            @click="getRoleDetailAPI(scope.row.id)"
          >编辑</el-button>
          <el-button size="mini" type="text" @click="hDelete(scope.row.id)">删除</el-button>
          <el-button size="mini" type="text" @click="resetPwd(scope.row.id)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- // 新增员工弹窗 -->
    <add-employee
      :dialog-visible.sync="dialogVisible"
      :options.sync="options"
      :form.sync="form"
      :form-rules.sync="formRules"
      :h-add="hAdd"
      :h-edit="hEdit"
    />

    <!-- //分页 -->
    <div class="page-container">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="params.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getUserListAPI, getRoleListAPI } from '@/api/system'
import { AddRoleAPI, RoleDetailAPI, EditRoleAPI, DeleteRoleAPI, resetPwdAPI } from '@/api/role'
import AddEmployee from './component/add.vue'
export default {
  name: 'EmployeeIndex',
  components: { AddEmployee },
  data() {
    return {
      params: {
        page: 1,
        pageSize: 5,
        name: '' // 增加字段name
      },
      userList: [],
      total: 0,
      dialogVisible: false,
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
    this.getUserList()
    this.getRoleList()
  },

  methods: {
    async getUserList() {
      const res = await getUserListAPI(this.params)
      this.userList = res.data.rows
      this.total = res.data.total
    },
    statusType(status) {
      const obj = {
        0: 'error',
        1: 'success'
      }
      return obj[status]
    },
    statusInfo(status) {
      const obj = {
        0: '禁用',
        1: '启用'
      }
      return obj[status]
    },
    doSearch() {
      this.params.page = 1
      this.getUserList(this.params)
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.getUserList()
    },
    hIndex(index) {
      return this.params.pageSize * (this.params.page - 1) + index + 1
    },
    hShow() {
      this.dialogVisible = true
    },
    async getRoleList() {
      const res = await getRoleListAPI()
      this.options = res.data
    },
    async hAdd() {
      await AddRoleAPI(this.form)
      this.getUserList()
    },
    async hEdit() {
      await EditRoleAPI(this.form)
      this.getUserList()
    },
    async getRoleDetailAPI(userid) {
      const res = await RoleDetailAPI(userid)
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
      this.dialogVisible = true
    },
    async hDelete(id) {
      this.$confirm('是否确认删除该员工吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await DeleteRoleAPI(id)
        this.getUserList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async resetPwd(id) {
      this.$confirm('是否确认重置该员工密码为：123456?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await resetPwdAPI(id)
        this.getUserList()
        this.$message({
          type: 'success',
          message: '重置成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.employee-container {
  padding: 10px;
}
.create-container {
  margin: 10px 0px;
}
.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, 0.9);
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.page-container {
  padding: 4px 0px;
  text-align: right;
}
</style>
