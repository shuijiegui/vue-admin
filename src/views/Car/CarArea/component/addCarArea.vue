<template>
  <el-dialog width="680px" :visible="dialogVisible" :title="title" @close="hCloseDialog">
    <!-- 表单接口 -->
    <div class="form-container">
      <el-form ref="addForm" :model="form" label-position="top" :rules="formRules">
        <el-form-item label="区域名称" prop="areaName">
          <el-input v-model="form.areaName" />
        </el-form-item>
        <el-form-item label="车位数（个）" prop="spaceNumber">
          <el-input v-model="form.spaceNumber" />
        </el-form-item>
        <el-form-item label="面积（m²）" prop="areaProportion">
          <el-input v-model="form.areaProportion" />
        </el-form-item>
        <el-form-item label="关联计费规则" prop="ruleId">
          <el-select v-model="form.ruleId" placeholder="请选择">
            <el-option
              v-for="item in ruleList"
              :key="item.ruleId"
              :label="item.ruleName"
              :value="item.ruleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" />

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
import { getAreaDropListAPI, addAreaAPI, getAreaListAPI, editAreaAPI } from '@/api/carArea'
export default {
  name: 'AddCarArea',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    params: {
      type: Object,
      required: true
    }

  },
  data() {
    return {
      form: {
        areaName: '',
        spaceNumber: '',
        areaProportion: '',
        ruleId: '',
        remark: ''
      },
      formRules: {
        areaName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ],
        spaceNumber: [
          { required: true, message: '请输入车位数', trigger: 'blur' }
        ],
        areaProportion: [
          { required: true, message: '请输入面积', trigger: 'blur' }
        ],
        ruleId: [
          { required: true, message: '请选择关联计费规则', trigger: 'blur' }
        ],
        remark: [
          { message: '请输入备注', trigger: 'blur' }
        ]
      },

      ruleList: [],
      title: ''

    }
  },
  mounted() {
    this.getDropList()
  },
  created() {
  },
  methods: {
    async confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          if (this.form.id) {
            await this.hEdit()
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          } else {
            await this.hAdd()
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
        this.$emit('getAreaList')
        this.hCloseDialog()
      })
    },
    async hCloseDialog() {
      this.$refs.addForm.resetFields()
      delete this.form.id
      this.$emit('update:dialogVisible', false)
    },
    async getDropList() {
      const res = await getAreaDropListAPI()
      console.log(res)
      this.ruleList = res.data
    },
    async hAdd() {
      await addAreaAPI(this.form)
    },
    async hEdit() {
      await editAreaAPI(this.form)
    },
    async edit(Id) {
      const res = await getAreaListAPI(this.params)
      const { areaId, areaName, spaceNumber, areaProportion, ruleId, remark } = res.data.rows.find(item => item.id === Id)
      this.form = { areaId, areaName, spaceNumber, areaProportion, ruleId, remark }
    }

  }
}
</script>

<style lang="scss" scoped>
.form-container{
  padding:0px 10px;
}
</style>
