<template>
  <!-- 添加楼宇弹框 -->
  <el-dialog
    title="添加楼宇"
    :visible="dialogVisible"
    width="580px"
    @close="closeDialog"
  >
    <!-- 表单接口 -->
    <div class="form-container">
      <el-form ref="addForm" :model="addForm" :rules="addFormRules">
        <el-form-item label="楼宇名称" prop="name">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="楼宇层数" prop="floors">
          <el-input v-model="addForm.floors" />
        </el-form-item>
        <el-form-item label="在管面积" prop="area">
          <el-input v-model="addForm.area" />
        </el-form-item>
        <el-form-item label="物业费" prop="propertyFeePrice">
          <el-input v-model="addForm.propertyFeePrice" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button size="mini" @click="closeDialog">取 消</el-button>
      <el-button size="mini" type="primary" @click="confirmAdd">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { createBuildingListAPI, getBuildingDetailAPI, editBuildingListAPI } from '@/api/building'
export default {
  name: 'AddDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      addForm: {
        name: '',
        floors: null,
        area: null,
        propertyFeePrice: null
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入楼宇名称', trigger: 'blur' }
        ],
        floors: [
          { required: true, message: '请输入楼宇层数', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请输入楼宇面积', trigger: 'blur' }
        ],
        propertyFeePrice: [
          { required: true, message: '请输入楼宇物业费', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addForm.resetFields()
      delete this.addForm.id
    },
    confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          // 1. 提交接口
          if (this.addForm.id) {
            await editBuildingListAPI(this.addForm)
          } else {
            await createBuildingListAPI(this.addForm)
          }
          // 2. 获取列表
          this.$emit('getBuildingList')
          // 3. 关闭弹框
          this.closeDialog()
        }
      })
    },
    // 编辑楼宇
    async editBuilding(bulieId) {
      const res = await getBuildingDetailAPI(bulieId)
      const { name, floors, area, propertyFeePrice, id } = res.data
      this.addForm = { name, floors, area, propertyFeePrice, id }
    }
  }

}
</script>

<style>

</style>
