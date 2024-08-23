<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">车牌号码:</div>
      <el-input v-model="params.carNumber" placeholder="请输入内容" class="search-main" />
      <div class="search-label">缴费状态:</div>
      <el-input v-model="status" placeholder="请输入内容" class="search-main" />
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>

    <!-- 表格区域 -->
    <div class="table">
      <el-table
        v-loading="loading"
        style="width: 100%"
        :data="paymentList"
      >
        <el-table-column
          type="index"
          label="序号"
          width="120"
          :index="hIndex"
        />
        <el-table-column
          label="车牌号码"
          width="180"
          prop="carNumber"
        />
        <el-table-column
          label="收费类型"
          width="120"
        >
          <template #default="{ row }">
            {{ chargeType(row.chargeType) }}
          </template>
        </el-table-column>
        <el-table-column
          label="停车总时长"
          width="150"
          prop="parkingTime"
        />
        <el-table-column
          label="缴纳费用（元）"
          width="130"
          prop="actualCharge"
        />
        <el-table-column
          label="缴纳状态"
          width="130"
        >
          <template #default="{ row }">
            {{ paymentStatus(row.paymentStatus) }}
          </template>
        </el-table-column>
        <el-table-column
          label="缴纳方式"
          width="120"
        >
          <template #default="{ row }">
            {{ paymentMethod(row.paymentMethod) }}
          </template>
        </el-table-column>
        <el-table-column
          label="缴纳时间"
          prop="paymentTime"
        />

      </el-table>
      <!-- 分页区域 -->
      <div class="page-container">
        <el-pagination
          layout="total, prev, pager, next"
          :total="total"
          :page-size="params.pageSize"
          @current-change="getPaymentListChange"
        />
      </div>

    </div>
  </div>
</template>

<script>
import { getPaymentListAPI } from '@/api/carPay'
export default {
  name: 'PaymentIndex',

  data() {
    return {
      params: { // 请求参数
        page: 1,
        pageSize: 10,
        carNumber: '',
        paymentStatus: ''
      },
      paymentList: [], // 缴费列表
      total: 0, // 总条数
      status: '',
      loading: true
    }
  },
  mounted() {
    this.getPaymentList()
  },
  methods: {
    async getPaymentList() {
      const res = await getPaymentListAPI(this.params)
      console.log(res)
      this.paymentList = res.data.rows
      this.total = res.data.total
      this.loading = false
    },

    getPaymentListChange(page) {
      this.params.page = page
      this.getPaymentList()
    },
    hIndex(index) {
      return this.params.pageSize * (this.params.page - 1) + index + 1
    },
    doSearch() {
      this.params.page = 1
      this.params.paymentStatus = this.paymentInfo(this.status) || ''
      this.getPaymentList()
    },
    paymentInfo(status) {
      const paymentStatus = {
        未缴费: '0',
        已缴费: '1'
      }
      return paymentStatus[status]
    },
    async delWraning(id) {
      this.$confirm('是否确认删除该员工吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.getPaymentList()
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
    chargeType(type) {
      const chargeType = {
        card: '月卡',
        temp: '临时停车'
      }
      return chargeType[type]
    },
    paymentStatus(status) {
      const paymentStatus = {
        0: '未缴纳',
        1: '已缴纳'
      }
      return paymentStatus[status]
    },
    paymentMethod(method) {
      const methods = {
        Alipay: '支付宝',
        Wechat: '微信',
        Cash: '现金'
      }
      return methods[method]
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
