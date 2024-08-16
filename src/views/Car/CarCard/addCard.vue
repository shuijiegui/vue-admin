<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header
        :content="id ? '编辑月卡' : '增加月卡'"
        @back="$router.back()"
      />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <el-form ref="carInfoForm" :rules="carInfoRules" :model="carInfoForm" label-width="100px">
            <el-form-item label="车主姓名" prop="personName">
              <el-input v-model="carInfoForm.personName" :rules="carInfoRules.personName" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="carInfoForm.phoneNumber" :rules="carInfoRules.phoneNumber" />
            </el-form-item>
            <el-form-item label="车辆号码" prop="carNumber">
              <el-input v-model="carInfoForm.carNumber" :rules="carInfoRules.carNumber" />
            </el-form-item>
            <el-form-item label="车辆品牌" prop="carBrand">
              <el-input v-model="carInfoForm.carBrand" :rules="carInfoRules.carBrand" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <div class="form">
          <el-form ref="feeForm" :model="feeForm" :rules="feeFormRules" label-width="100px">
            <el-form-item label="有效日期" prop="payTime">
              <el-date-picker
                v-model="feeForm.payTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              />
            </el-form-item>
            <el-form-item label="支付金额" prop="paymentAmount">
              <el-input v-model="feeForm.paymentAmount" />
            </el-form-item>
            <el-form-item label="支付方式" prop="paymentMethod">
              <el-select v-model="feeForm.paymentMethod">
                <el-option
                  v-for="item in payMethodList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { createCardAPI, getCardDetailAPI, updateCardAPI } from '@/api/card'
export default {
  data() {
    const validaeCarNumber = (rule, value, callback) => {
      const plateNumberRegex = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/
      if (plateNumberRegex.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的车牌号'))
      }
    }
    return {
      // 车辆信息表单
      id: this.$route.query.id || '',
      carInfoForm: {
        personName: '', // 车主姓名
        phoneNumber: '', // 联系方式
        carNumber: '', // 车牌号码
        carBrand: '' // 车辆品牌
      },
      carInfoRules: {
        personName: [
          {
            required: true, message: '请输入车主姓名', trigger: 'blur'
          }
        ],
        phoneNumber: [
          {
            required: true, message: '请输入联系方式', trigger: 'blur'
          }
        ],
        carNumber: [
          {
            required: true, message: '请输入车辆号码', trigger: 'blur'
          },
          {
            validator: validaeCarNumber, trigger: 'blur'
          }
        ],
        carBrand: [
          {
            required: true, message: '请输入车辆品牌', trigger: 'blur'
          }
        ]
      },
      // 缴费信息表单
      feeForm: {
        payTime: '', // 支付时间
        paymentAmount: null, // 支付金额
        paymentMethod: '' // 支付方式
      },
      // 缴费规则
      feeFormRules: {
        payTime: [
          {
            required: true,
            message: '请选择支付时间'
          }
        ],
        paymentAmount: [
          {
            required: true,
            message: '请输入支付金额',
            trigger: 'blur'
          }
        ],
        paymentMethod: [
          {
            required: true,
            message: '请选择支付方式',
            trigger: 'change'
          }
        ]
      },

      // 支付方式列表
      payMethodList: [
        {
          id: 'Alipay',
          name: '支付宝'
        },
        {
          id: 'WeChat',
          name: '微信'
        },
        {
          id: 'Cash',
          name: '线下'
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      }

    }
  },
  mounted() {
    // 通过路由传入的参数判断是新增还是编辑

    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    confirmAdd() {
      this.$refs.carInfoForm.validate(async valid => {
        if (valid) {
          this.$refs.feeForm.validate(async valid => {
            if (valid) {
              const payload = {
                ...this.feeForm,
                ...this.carInfoForm,
                // 单独处理时间
                cardStartDate: this.feeForm.payTime[0],
                cardEndDate: this.feeForm.payTime[1]
              }
              // 删掉多余字段
              delete payload.payTime
              if (this.id) {
                // 编辑--车牌换不了
                await updateCardAPI(payload)
                this.$message.success('编辑成功')
              } else {
                await createCardAPI(payload)
                this.$message.success('新增成功')
              }
              this.$router.back()
            }
          })
        }
      })
    },
    resetForm() {
      this.$refs.feeForm.resetFields()
      this.$refs.carInfoForm.resetFields()
    },
    // 获取详情--编辑功能
    async getDetail() {
      const res = await getCardDetailAPI(this.id)
      // 回填车辆信息表单
      const { carInfoId, personName, phoneNumber, carNumber, carBrand } = res.data
      this.carInfoForm = {
        personName, phoneNumber, carNumber, carBrand, carInfoId
      }

      // 回填缴费信息表单
      const { rechargeId, cardStartDate, cardEndDate, paymentAmount, paymentMethod } = res.data
      this.feeForm = {
        rechargeId,
        paymentAmount,
        paymentMethod,
        payTime: [cardStartDate, cardEndDate]
      }
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
