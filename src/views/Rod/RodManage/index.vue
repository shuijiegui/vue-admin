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
          <el-button size="mini" type="text" @click="edit(row.id)">编辑</el-button>
          <el-button size="mini" type="text" @click="del(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- // 增加一体杆弹窗 -->
    <add-pole-dialog
      ref="addPoleDialog"
      :dialog-visible.sync="dialogVisible"
      :params.sync="params"
      @resetpoleName="resetpoleName"
      @changePoleName="changePoleName"
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
import { getPoleListAPI, delPoleAPI } from '@/api/rod'
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
        id: '' // 增加字段name
      },
      poleList: [],
      total: 0,
      dialogVisible: false,
      search: ''

    }
  },

  mounted() {
    this.getPoleList()
  },
  methods: {
    doSearch() {
      this.params.page = 1
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
      console.log(res)
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
    edit(id) {
      console.log(id)
      this.$refs.addPoleDialog.edit(id)
      this.dialogVisible = true
    },
    resetpoleName() {
      this.params.id = ''
    },
    changePoleName(id) {
      this.params.id = id
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delPoleAPI(id)
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
      this.getPoleList()
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
