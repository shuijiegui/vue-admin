<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header
        content="告警详情"
        @back="$router.back()"
      />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">告警详情</div>
        <div class="form">
          <el-form ref="carInfoForm" v-loading="loading" label-width="100px">
            <el-form-item label="告警时间：">{{ warnList.warningTime }}</el-form-item>
            <el-form-item label="一体杆名称：">{{ warnList.poleName }}</el-form-item>
            <el-form-item label="告警区域：">{{ warnList.areaName }}</el-form-item>
            <el-form-item label="一体杆编号：">{{ warnList.poleNumber }}</el-form-item>
            <el-form-item label="故障类型：">{{ warnList.errorType }}</el-form-item>
            <el-form-item label="处置状态：">{{ warningType(warnList.handleStatus) }}</el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">告警处理</div>
        <div class="form">
          <el-form ref="feeForm" label-width="100px">
            <el-form-item label="处理人：">{{ warnList.handleUser }}</el-form-item>
            <el-form-item label="联系方式：">{{ warnList.phonenumber }}</el-form-item>
            <el-form-item label="处理结果：">{{ warnList.handleResult }}</el-form-item>
            <el-form-item label="完成时间：">{{ warnList.handleTime }}</el-form-item>
          </el-form>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import { getPoleWarningDetailAPI } from '@/api/rod'
export default {
  data() {
    return {
      id: this.$route.query.id || '',
      warnList: {},
      loading: true
    }
  },
  mounted() {
    this.getPoleWarningDetail()
  },
  methods: {
    async getPoleWarningDetail() {
      const res = await getPoleWarningDetailAPI(this.id)
      this.warnList = res.data
      this.loading = false
    },
    warningType(status) {
      const warningMap = {
        0: '未派单',
        1: '已派单',
        2: '已接单',
        3: '已完成'
      }
      return warningMap[status]
    }

  }

}
</script>

<style scoped lang="scss">
.add-card {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }
      .arrow{
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;

      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }

      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;

        .el-form {
          display: flex;
          flex-wrap: wrap;

          .el-form-item {
            width: 50%;
          }
        }
      }
    }
    .preview{
      img{
        width: 100px;
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
  }
}
</style>
