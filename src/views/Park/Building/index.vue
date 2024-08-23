<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">楼宇名称：</div>
      <el-input v-model="params.name" placeholder="请输入内容" class="search-main" />
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>
    <el-button type="primary" @click="addBuilding">添加楼宇</el-button>
    <el-button type="primary" @click="exportToExcel">导出Excel</el-button>

    <!-- 表格区域 -->
    <div class="table">
      <el-table
        style="width: 100%"
        :data="buildingList"
      >
        <el-table-column
          type="index"
          label="序号"
          width="120"
          :index="hIndex"
        />
        <el-table-column
          label="楼宇名称"
          width="180"
          prop="name"
        />
        <el-table-column
          label="层数"
          prop="floors"
          width="120"
        />
        <el-table-column
          label="在管面积(m²)"
          width="180"
          prop="area"
        />
        <el-table-column
          label="物业费(元/m²)"
          width="180"
          prop="propertyFeePrice"
        />
        <el-table-column
          label="状态"
          prop="status"
        >
          <template #default="{row}">
            {{ buildingStatus(row.status) }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template #default="{row}">
            <el-button
              size="mini"
              type="text"
              @click="editBuilding(row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="delBuliding(row.id)"
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
          @current-change="getBuildingListChange"
        />
      </div>
      <!-- 弹窗区域 -->
      <add-building-dialog
        ref="add"
        :dialog-visible.sync="dialogVisible"
        @getBuildingList="getBuildingList"
      />

    </div>
  </div>
</template>

<script>
import { getBuildingListAPI, delBuildingListAPI } from '@/api/building'
import { utils, writeFileXLSX } from 'xlsx'
import addBuildingDialog from './components/addDialog.vue'
export default {
  name: 'Building',
  components: {
    addBuildingDialog
  },
  data() {
    return {
      buildingList: [],
      params: { // 请求参数
        page: 1,
        pageSize: 10,
        name: '' // 增加字段name
      },
      total: 0, // 总条数
      dialogVisible: false // 弹窗显示状态
    }
  },
  mounted() {
    this.getBuildingList()
  },
  methods: {
    async getBuildingList() {
      const res = await getBuildingListAPI(this.params)
      this.buildingList = res.data.rows
      this.total = res.data.total
    },
    buildingStatus(status) {
      const statusMap = {
        0: '空置中',
        1: '租聘中'
      }
      return statusMap[status]
    },
    getBuildingListChange(page) {
      this.params.page = page
      this.getBuildingList()
    },
    hIndex(index) {
      return this.params.pageSize * (this.params.page - 1) + index + 1
    },
    doSearch() {
      this.params.page = 1
      this.getBuildingList()
    },
    addBuilding() {
      this.dialogVisible = true
    },
    async delBuliding(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delBuildingListAPI(id)
        this.getBuildingList()
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
    editBuilding(id) {
      this.$refs.add.editBuilding(id)
      this.dialogVisible = true
    },
    async exportToExcel() {
      const res = await getBuildingListAPI(this.params)
      const tableHeader = ['name', 'floors', 'area', 'propertyFeePrice', 'status']
      // 处理数据保证
      const sheetData = res.data.rows.map((item) => {
        const obj = {}
        tableHeader.forEach(key => {
          obj[key] = item[key]
        })
        return obj
      })
      console.log(sheetData)
      // 创建一个工作表
      const worksheet = utils.json_to_sheet(sheetData)
      // 创建一个新的工作簿
      const workbook = utils.book_new()
      // 把工作表添加到工作簿
      utils.book_append_sheet(workbook, worksheet, 'Data')
      // 改写表头
      utils.sheet_add_aoa(worksheet, [['楼宇名称', '层数', '在管面积(㎡)', '物业费(㎡)', '状态']], { origin: 'A1' })
      // 导出Excle
      writeFileXLSX(workbook, 'SheetJSVueAoO.xlsx')
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
