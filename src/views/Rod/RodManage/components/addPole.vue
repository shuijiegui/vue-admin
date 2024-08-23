<template>
  <el-dialog width="680px" :visible="dialogVisible" title="添加员工" @close="hCloseDialog">
    <!-- 表单接口 -->
    <div class="form-container">
      <el-form ref="addForm" :model="form" label-position="top" :rules="formRules">
        <el-form-item label="一体杆名称" prop="poleName">
          <el-input v-model="form.poleName" />
        </el-form-item>
        <el-form-item label="一体杆编号" prop="poleNumber">
          <el-input v-model="form.poleNumber" />
        </el-form-item>
        <el-form-item label="一体杆IP" prop="poleIp">
          <el-input v-model="form.poleIp" />
        </el-form-item>
        <el-form-item label="关联区域" prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择关联区域">
            <el-option
              v-for="item in areaNameOptions"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-model="form.poleType" label="一体杆类型" prop="poleType">
          <el-select v-model="form.poleType" placeholder="请选择">
            <el-option

              label="出口"
              value="export"
            />
            <el-option
              label="入口"
              value="entrance"
            />
          </el-select>
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
import { getAreaListAPI, addPoleAPI, editPoleAPI, getPoleListAPI } from '@/api/rod'
export default {
  name: 'AddRod',
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
  mounted() {
    this.getAreaList()
  },
  created() {
  },
  methods: {
    async confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          if (this.form.id) {
            try {
              console.log('编辑')
              await this.hEdit()
            } catch (error) {
              console.log(error)
            }
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
      this.$refs.addForm.resetFields()
      this.$emit('resetpoleName')
      delete this.form.id
      this.$emit('update:dialogVisible', false)
    },
    async getAreaList() {
      const res = await getAreaListAPI()
      this.areaNameOptions = res.data
    },
    async hAdd() {
      await addPoleAPI(this.form)
      this.$emit('getPoleList')
    },
    async edit(rodId) {
      this.$emit('changePoleName', rodId)
      const res = await getPoleListAPI(this.params)
      const { areaId, poleNumber, poleIp, poleType, id, poleName } = res.data.rows.find(item => item.id === rodId)
      this.form = {
        poleName,
        poleNumber,
        poleIp,
        areaId,
        poleType,
        id
      }
    },
    async hEdit() {
      await editPoleAPI(this.form)
      this.$emit('getPoleList')
    }

  }
}
</script>

<style lang="scss" scoped>
.form-container{
  padding:0px 10px;
}
</style>
