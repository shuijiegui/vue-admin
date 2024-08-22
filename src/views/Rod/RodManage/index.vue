<template>
  <div class="employee-container">
    <div class="search-container">
      <div class="search-label">一体杆名称：</div>
      <el-input
        v-model="search"
        clearable
        placeholder="请输入内容"
        class="search-main"
        @clear="doSearch"
      />
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" @click="hShow">添加一体杆</el-button>
    </div>
    <el-table style="width: 100%" :data="poleList">
      <el-table-column type="index" label="序号" width="100" :index="hIndex" />
      <el-table-column prop="poleName" label="议题杆名称" width="150" />
      <el-table-column prop="poleNumber" label="一体杆编号" width="120" />
      <el-table-column prop="poleIp" label="一体杆IP" width="160" />
      <el-table-column prop="areaName" label="安装区域" width="130" />

      <el-table-column prop="poleType" label="一体杆类型" width="120">
        <template #default="{row}">
          {{ PoleType(row.poleType) }}
        </template>
      </el-table-column>
      <el-table-column label="运行状态" width="180">
        <template #default="{row}">
          {{ PoleStatus(row.poleStatus) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template #default="{row}">
          <el-button size="mini" type="text" @click="edit(row.poleName)">编辑</el-button>
          <el-button size="mini" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- // 增加一体杆弹窗 -->
    <add-pole-dialog
      :dialog-visible.sync="dialogVisible"
      :form.sync="form"
      :form-rules.sync="formRules"
      :area-name-options.sync="areaNameOptions"
      :pole-type-options.sync="poleTypeOptions"
      :h-add="hAdd"
      :h-edit="hEdit"
    />

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
import { getPoleListAPI, getAreaListAPI, addPoleAPI, editPoleAPI } from '@/api/rod'
import addPoleDialog from './components/addPole.vue'
export default {
  name: 'RodManage',
  components: {
    addPoleDialog
  },
  data() {
    return {
      params: {
        page: 1,
        pageSize: 8,
        poleName: '' // 增加字段name
      },
      total: 0,
      poleList: [],
      dialogVisible: false,
      search: '',
      form: {
        poleName: '',
        poleNumber: '',
        poleIp: '',
        areaId: '',
        poleType: ''
      },
      formRules: {
        poleName: [
          { required: true, message: '请输入议题杆名称', trigger: 'blur' }
        ],
        poleNumber: [
          { required: true, message: '请输入一体杆编号', trigger: 'blur' }
        ],
        poleIp: [
          { required: true, message: '请输入一体杆IP', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '请输入安装区域', trigger: 'blur' }
        ],
        poleType: [
          { required: true, message: '请输入一体杆类型', trigger: 'blur' }
        ]

      },
      areaNameOptions: [],
      poleTypeOptions: []
    }
  },
  created() {

  },
  mounted() {
    this.getPoleList()
    this.getAreaList()
  },
  methods: {
    doSearch() {
      this.params.page = 1
      this.params.poleName = this.search
      this.getPoleList()
    },
    hShow() {
      this.dialogVisible = true
    },
    hIndex(index) {
      return this.params.pageSize * (this.params.page - 1) + index + 1
    },
    async getPoleList() {
      const res = await getPoleListAPI(this.params)
      this.poleList = res.data.rows
      this.total = res.data.total
    },
    PoleStatus(status) {
      const obj = {
        0: '正常',
        1: '异常'
      }
      return obj[status]
    },
    PoleType(type) {
      const obj = {
        'entrance': '入口',
        'export': '出口'
      }
      return obj[type]
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.getPoleList()
    },
    async getAreaList() {
      const res = await getAreaListAPI()
      this.areaNameOptions = res.data
    },
    async hAdd() {
      await addPoleAPI(this.form)
      this.getPoleList()
    },
    async edit(poleNameInfo) {
      this.params.poleName = poleNameInfo
      const res = await getPoleListAPI(this.params)
      console.log(res)
      const { areaId, poleNumber, poleIp, poleType, id, poleName } = res.data.rows[0]
      this.form = {
        poleName,
        poleNumber,
        poleIp,
        areaId,
        poleType,

        id
      }
      this.hShow()
    },
    async hEdit() {
      await editPoleAPI(this.form)
      this.params.poleName = ''
      this.getPoleList()
      console.log(1)
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
