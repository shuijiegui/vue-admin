<template>
  <div class="role-container">

    <!-- right -->
    <div class="right-wrapper">

      <el-tabs v-model="activeName">

        <el-tab-pane label="功能权限" name="tree">

          <div class="tree-wrapper">
            <!-- left -->
            <div class="left-wrapper">
              <div
                v-for="(item, index) in roleList"
                :key="item.roleId"
                class="role-item"
                :class="{active: index === activeIndex}"
                @click="changeRole(index)"
              >
                <div class="role-info">
                  <svg-icon :icon-class="index === activeIndex ? 'user-active' : 'user'" class="icon" />
                  {{ item.roleName }}
                </div>
                <div class="more">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      <svg-icon icon-class="more" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="$router.push(`/roleAdd?id=${item.roleId}`)">编辑角色</el-dropdown-item>
                      <el-dropdown-item @click.native="delRole(item.roleId)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <el-button class="addBtn" size="mini" @click="$router.push('/roleAdd')">
                添加角色
              </el-button>
            </div>
            <div v-for="item in treeList" :key="item.id" class="tree-item">
              <!-- title -->
              <div class="tree-title">{{ item.title }}</div>
              <!-- 树形结构 -->
              <el-tree
                ref="tree"
                :props="{label:'title'}"
                :data="item.children"
                show-checkbox
                :default-expand-all="true"
                node-key="id"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`成员(${roleUserList.length})`" name="user">
          <div class="user-wrapper">
            <el-table
              :data="roleUserList"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="250"
                label="序号"
              />
              <el-table-column
                prop="name"
                label="员工姓名"
              />
              <el-table-column
                prop="userName"
                label="登录账号"
              />
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
import { getRoleListAPI, getTreeListAPI, getRoleDetailAPI, getRoleUserAPI, delRoleUserAPI } from '@/api/system'
export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      activeIndex: 0,
      treeList: [], // 权限树形列表
      perms: [], // 当前角色权限点列表
      activeName: 'tree', // 默认打开tree
      roleUserList: [] // 当前角色下的成员列表
    }
  },
  async mounted() {
  // 先获取角色列表和可选权限列表
    await this.getRoleList()
    await this.getTreeList()
    // 再获取当前角色下的权限列表
    this.getRoleDetail(this.roleList[0].roleId)
    this.getRoleUserList(this.roleList[0].roleId)
  },
  methods: {
    async  getRoleList() {
      const res = await getRoleListAPI()
      this.roleList = res.data
    },
    // 切换角色是获取roleId
    changeRole(index) {
      this.activeIndex = index
      // 1. 获取当前角色下的权限点数据列表
      const roleId = this.roleList[index].roleId
      this.getRoleDetail(roleId)
      // 2. 获取当前角色下的成员数据列表
      this.getRoleUserList(roleId)
    },
    async getTreeList() {
      const res = await getTreeListAPI()
      this.treeList = res.data
      this.addDisabled(this.treeList)
    },
    addDisabled(treeList) {
      treeList.forEach(item => {
        item.disabled = true
        // 递归处理
        if (item.children) {
          this.addDisabled(item.children)
        }
      })
    },
    // 封装请求方法
    async getRoleDetail(roleId) {
      const res = await getRoleDetailAPI(roleId)
      this.perms = res.data.perms
      // 高亮权限列表
      const treeComponentList = this.$refs.tree
      // 调用setCheckedKeys方法
      treeComponentList.forEach((tree, index) => {
        tree.setCheckedKeys(this.perms[index])
      })
    },
    // 封装获取当前角色下的成员的方法
    async getRoleUserList(roleId) {
      const res = await getRoleUserAPI(roleId)
      this.roleUserList = res.data.rows
    },
    delRole(roleId) {
      this.$confirm('是否确认删除当前角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delRoleUserAPI(roleId)
        this.getRoleList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }

  }
}
</script>

<style scoped lang="scss">
.role-container {
  display: flex;
  font-size: 14px;
  background-color: #fff;
  padding:20px;
  .left-wrapper {
    width: 200px;
    border-right: 1px solid #e4e7ec;
    padding: 4px;
    text-align: center;

    .role-item {
      position: relative;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      cursor: pointer;

      &.active {
        background: #edf5ff;
        color: #4770ff;
      }
    }

    .role-info {
      display: flex;
      align-items: center;

      .icon {
        margin-right: 10px;
      }
    }

    .more {
      display: flex;
      align-items: center;
    }
    .addBtn{
      width: 100%;
      margin-top: 20px;
    }
  }

  .right-wrapper {
    flex: 1;

    .tree-wrapper {
      display: flex;
      justify-content: space-between;

      .tree-item {
        flex: 1;
        border-right: 1px solid #e4e7ec;
        padding: 0px 4px;
        text-align: center;
        .tree-title {
          background: #f5f7fa;
          text-align: center;
          padding: 10px 0;
          margin-bottom: 12px;
        }
      }
    }

    ::v-deep .el-tabs__nav-wrap {
      padding-left: 20px;
    }

    .user-wrapper{
      padding:20px;
    }
  }
}
</style>
