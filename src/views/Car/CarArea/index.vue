<template>
  <div class="rule-container">
    <div class="create-container">
      <el-button type="primary" @click="hAdd">添加区域</el-button>
    </div>

    <!-- 表格区域 -->
    <div class="table">
      <el-table v-loading="loading" :data="areaList" style="width: 100%">
        <el-table-column type="index" label="序号" width="120" />
        <el-table-column label="区域名称" prop="areaName" width="150" />
        <el-table-column label="车位数（个）" prop="spaceNumber" />
        <el-table-column label="面积（m²）" prop="areaProportion" />
        <el-table-column label="计费规则" prop="ruleName" />
        <el-table-column label="备注" prop="remark" />

        <el-table-column label="操作" fixed="right" width="120">
          <template #default="{row}">
            <el-button size="mini" type="text" @click="hEdit(row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="hDel(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- //弹窗 -->
      <add-car-area
        ref="addCarArea"
        :dialog-visible.sync="dialogVisible"
        :params.sync="params"
        @getAreaList="getAreaList"
      />
    </div>
  </div>
</template>

<script>
import { getAreaListAPI, delAreaAPI } from '@/api/carArea'
import addCarArea from './component/addCarArea.vue'
export default {
  name: 'Building',
  components: {
    addCarArea
  },
  data() {
    return {
      areaList: [],
      params: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      loading: true,
      dialogVisible: false // 控制弹框关闭打开

    }
  },
  mounted() {
    this.getAreaList()
  },

  methods: {
  // 获取规则列表
    async getAreaList() {
      const res = await getAreaListAPI(this.params)
      console.log(res)
      this.areaList = res.data.rows
      this.loading = false
    },
    hAdd() {
      this.dialogVisible = true
      this.$refs.addCarArea.title = '添加区域'
    },
    hEdit(id) {
      this.dialogVisible = true
      this.$refs.addCarArea.edit(id)
      this.$refs.addCarArea.title = '编辑区域'
    },
    hDel(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delAreaAPI(id)
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
      this.getAreaList()
    }

  }
}
</script>

<style lang="scss" scoped>
.rule-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
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
