<template>
  <div class="card-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <span class="search-label">车牌号码：</span>
      <el-input v-model="params.carNumber" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">车主姓名：</span>
      <el-input v-model="params.personName" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">状态：</span>
      <el-select v-model="params.cardStatus">
        <el-option
          v-for="item in cardStatusList"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        />
      </el-select>
      <el-button type="primary" class="search-btn" @click="doSearch">查询</el-button>
    </div>
    <!-- 新增删除操作区域 -->
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/cardAdd')">添加月卡</el-button>
      <el-button @click="delCartList">批量删除</el-button>
    </div>

    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="cardList" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column label="序号" type="index" width="60" :index="hIndex" />
        <el-table-column label="车主名称" prop="personName" />
        <el-table-column label="联系方式" prop="phoneNumber" />
        <el-table-column label="车牌号码" prop="carNumber" />
        <el-table-column label="车辆品牌" prop="carBrand" />
        <el-table-column label="剩余有效天数" prop="totalEffectiveDate" />
        <el-table-column label="状态" prop="cardStatus">
          <!-- row是elUI里的默认对象 -->
          <template #default="{ row }">
            <el-tag v-if="row.cardStatus === 0" type="success">可用</el-tag>
            <el-tag v-if="row.cardStatus === 1" type="danger">已过期</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button size="mini" type="text">续费</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text" @click="editCard(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="deleteCard(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        layout="total, prev, pager, next"
        :page-size="params.pageSize"
        :total="total"
        @current-change="pageChange"
      />
    </div>
    <!-- 添加楼宇 -->
    <el-dialog
      title="添加楼宇"
      width="580px"
    >
      <!-- 表单接口 -->
      <div class="form-container">
        <!-- <el-form ref="addForm" :model="addForm" :rules="addFormRules">
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
        </el-form> -->
      </div>
      <template #footer>
        <el-button size="mini">取 消</el-button>
        <el-button size="mini" type="primary">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCardList, delCardAPI, delCardListAPI } from '@/api/card'
export default {
  data() {
    return {
      params: {
        page: 1,
        pageSize: 4,
        carNumber: null,
        personName: null,
        cardStatus: null
      },
      selectedCarList: [],
      total: 0,
      cardList: [],
      cardStatusList: [
        {
          id: null,
          name: '全部'
        },
        {
          id: 0,
          name: '可用'
        },
        {
          id: 1,
          name: '已过期'
        }
      ]

    }
  },
  computed: {

  },
  mounted() {
    this.getDataList()
  },
  methods: {
    async getDataList() {
      const res = await getCardList(this.params)
      this.cardList = res.data.rows
      this.total = res.data.total
    },
    formatStatus(row) {
      const MAP = {
        0: '可用',
        1: '已过期'
      }
      return MAP[row.cardStatus]
    },
    pageChange(page) {
      this.params.page = page
      this.getDataList()
    },
    doSearch() {
      this.params.page = 1
      this.getDataList()
    },
    editCard(id) {
      this.$router.push('/cardAdd?id=' + id)
    },
    hIndex(index) {
      return this.params.pageSize * (this.params.page - 1) + index + 1
    },
    async deleteCard(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delCardAPI(id)
        this.getDataList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    handleSelectionChange(rowList) {
      this.selectedCarList = rowList
    },
    delCartList() {
      this.$confirm('此操作将永久删除选择的月卡, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 处理id
        await delCardListAPI(this.selectedCarList.map(item => item.id))
        this.getDataList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;
  .search-main {
    width: 220px;
    margin-right: 10px;
  }
  .search-btn{
    margin-left:20px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
</style>
