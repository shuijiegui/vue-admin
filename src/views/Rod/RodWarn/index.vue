<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">一体杆名称：</div>
      <el-input v-model="params.poleName" placeholder="请输入内容" class="search-main" />
      <div class="search-label">一体杆编号：</div>
      <el-input v-model="params.poleNumber" placeholder="请输入内容" class="search-main" />
      <div class="search-label">处置状态：</div>
      <el-input v-model="status" placeholder="请输入内容" class="search-main" />
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>

    <!-- 表格区域 -->
    <div class="table">
      <el-table
        v-loading="loading"
        style="width: 100%"
        :data="warnList"
      >
        <el-table-column
          type="index"
          label="序号"
          width="120"
          :index="hIndex"
        />
        <el-table-column
          label="一体杆名称"
          width="180"
          prop="poleName"
        />
        <el-table-column
          label="一体杆编号"
          prop="poleNumber"
          width="120"
        />
        <el-table-column
          label="故障类型"
          width="150"
          prop="errorType"
        />
        <el-table-column
          label="处置状态"
          width="150"
          prop="handleStatus"
        >
          <template #default="{row}">
            {{ warningType(row.handleStatus) }}
          </template>
        </el-table-column>
        <el-table-column
          label="告警时间"
          prop="warningTime"
        />
        <el-table-column
          label="操作"
        >
          <template #default="{row}">
            <el-button
              size="mini"
              type="text"
              :disabled="row.handleStatus === 1"
            >派单</el-button>
            <el-button
              size="mini"
              type="text"
              @click="$router.push('/detail?id='+row.id)"
            >详细</el-button>
            <el-button
              size="mini"
              type="text"
              @click="delWraning(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="page-container">
        <el-pagination
          layout="total, prev, pager, next"
          :total="total"
          :page-size="params.pageSize"
          @current-change="getWaringListChange"
        />
      </div>

    </div>
  </div>
</template>

<script>
import { getPoleWarningListAPI, delPoleWarningAPI } from '@/api/rod'
export default {
  name: 'Building',

  data() {
    return {
      params: { // 请求参数
        page: 1,
        pageSize: 10,
        poleNumber: '',
        poleName: '',
        handleStatus: ''
      },
      warnList: [],
      total: 0, // 总条数
      status: '',
      loading: true
    }
  },
  mounted() {
    this.getWarningList()
  },
  methods: {
    async getWarningList() {
      const res = await getPoleWarningListAPI(this.params)
      this.warnList = res.data.rows
      this.total = res.data.total
      this.loading = false
    },

    getWaringListChange(page) {
      this.params.page = page
      this.getBuildingList()
    },
    hIndex(index) {
      return this.params.pageSize * (this.params.page - 1) + index + 1
    },
    doSearch() {
      this.params.page = 1
      this.params.handleStatus = this.warningInfo(this.status)
      this.getWarningList()
    },
    warningType(status) {
      const warningMap = {
        0: '未派单',
        1: '已派单',
        2: '已接单',
        3: '已完成'
      }
      return warningMap[status]
    },
    warningInfo(status) {
      const warningMap = {
        '未派单': 0,
        '已派单': 1,
        '已接单': 2,
        '已完成': 3
      }
      return warningMap[status]
    },
    async delWraning(id) {
      this.$confirm('是否确认删除该员工吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delPoleWarningAPI(id)
        this.getWarningList()
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
    }

  }
}
</script>

<style lang="scss" scoped>
.department-container{
  padding:10px;
}
.search-container{
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237,237,237,.9);;
  padding-bottom: 20px;
  .search-label{
    width:100px;
  }
  .search-main{
    width: 220px;
    margin-right: 10px;
  }
}
  .page-container{
    padding:4px 0px;
    text-align: right;
  }
</style>
