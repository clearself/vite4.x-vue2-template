<template>
    <div class="event tag-list" style="box-sizing: border-box; overflow-y: hidden !important">
        <div class="ub w100">
            <GroupList @getBusIdData="getBusIdData" @getCurrentNode="getCurrentNode" @getTreeData="getTreeData" @click="handleNode" @editNode="editNode"  @getParentIdData="getParentIdData" ref="groupList" />
            <div class="bg-color ub ub-f1 ub-ver" style="margin-left: 10px; height: 100%; overflow: auto">
                <div class="attendance-list event-content">
                    <div class="ub ub-pj w100">
                        <div class="list-tips">
                            数据分类
                        </div>
                        <div>
                            <!-- <cancel-btn title="编 辑"  @click="handleEdit"></cancel-btn> -->
                        </div>
                    </div>
                    <el-descriptions class="main" title="" :column="1" size="mini" border>
                        <!-- <el-descriptions-item v-if="grade === 2||grade === 3">
                            <template slot="label"> 资产类型 </template>
                            {{ tableData.assetTypes }}
                        </el-descriptions-item>
                        <el-descriptions-item  v-if="grade === 3">
                            <template slot="label"> 厂商名称 </template>
                            {{ tableData.manufacturer }}
                        </el-descriptions-item> -->
                        <el-descriptions-item>
                            <template slot="label"> 资产类型 </template>
                            {{ tableData.assetTypes }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 厂商名称 </template>
                            {{ tableData.manufacturer }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 属性字段 </template>
                            <div v-if="propertyField.length>0">
                                <el-tag type="success" size="mini" v-for="(item, index) in propertyField" :key="index" style="margin: 0 4px;">{{ item.name }}</el-tag>
                            </div>
                            <div v-else>
                                {{ '暂无数据' }}
                            </div>

                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { getDetail } from '@/server/data_manage/data_classify.js'
import GroupList from './GroupList'
export default {
    name: 'DataClassify',
    components: {
        GroupList
    },
    data() {
        return {
            busIdThree: '',
            tableData: {
                assetTypes: '',
                manufacturer: ''
            },
            treeData: [],
            grade: '',
            propertyField: [],
            rootId: '',
            parentId: '',
            currentNode: {},
            its: {}
        }
    },
    watch: {},
    mounted() {
        this.$nextTick(() => {
            // this.initTree()
        })
    },
    methods: {
        getParentIdData(val) {
            this.parentId = val
        },
        getBusIdData(val) {
            this.busIdThree = val
            // debugger
        },
        async handleEdit() {
            let currentNode = this.$getlocalStorage('treeClassifyData')
            // debugger
            await this.getNodeDetail(currentNode)
            this.$router.push({
                name: 'data_manage_data_classify_add',
                query: {
                    id: currentNode.id,
                    grade: currentNode.grade,
                    busId: currentNode.busId ? currentNode.busId : '',
                    mode: 1,
                    busIdThree: this.busIdThree ? this.busIdThree : null
                }
            })
            this.$setlocalStorage('propertyFieldData', this.propertyField)
        },
        getCurrentNode(val) {
            // debugger
            this.currentNode = val
        },
        getTreeData(val) {
            this.propertyField = []
            console.log(val)
            this.treeData = val
            this.grade = val[0].grade
            if (this.treeData && this.treeData.length > 0 && !this.$route.query.id) this.handleNode(this.treeData[0])
            if (this.$route.query.id) {
                // this.currentNode = this.$getlocalStorage('treeClassifyData')
                this.its = {}
                let idData = this.$route.query.id
                let data = this.findItem(this.treeData, idData)
                console.log(data)
                this.handleNode(data)
                this.$setlocalStorage('treeClassifyData', data)
            }
        },
        findItem(arr, id) {
            let item = arr.find(it => {
                return it.id === id
            })
            if (item) {
                this.its = item
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].child && arr[i].child.length) {
                    this.findItem(arr[i].child, id)
                }
            }
            return this.its
        },
        handleNode(node) {
            this.propertyField = []
            console.log(node)
            let nodes = []
            this.grade = node.grade
            let parentNode = this.findAllParent({ id: node.id, fid: node.parentId }, this.treeData, nodes)
            if (node.grade === 3) {
                this.tableData.manufacturer = node.name
            } else {
                this.tableData.manufacturer = '暂无数据'
            }
            if (node.grade === 3) {
                if (parentNode) this.tableData.assetTypes = parentNode[0].name
            } else if (node.grade === 2) {
                this.tableData.assetTypes = node.name
            } else {
                this.tableData.assetTypes = '暂无数据'
            }

            this.getNodeDetail(node)
        },
        async getNodeDetail(node) {
            this.propertyField = []
            let data = {
                queryData: {},
                paramsData: {
                    id: node.id,
                    grade: node.grade
                }
            }
            await getDetail(data).then(res => {
                this.propertyField = res
            }).catch(error => {
                console.log('error' + error)
            })
        },
        async editNode(node) {
            await this.getNodeDetail(node)
            // this.getParentId(node)
            this.$router.push({
                name: 'data_manage_data_classify_add',
                query: {
                    id: node.id,
                    grade: node.grade,
                    busId: node.busId ? node.busId : '',
                    mode: 1,
                    busIdThree: this.busIdThree ? this.busIdThree : null
                }
            })
            this.$setlocalStorage('propertyFieldData', this.propertyField)
        },
        findAllParent(node, tree, parentNodes = [], index = 0) {
            if (!node || node.fid == 0) {
                return
            }
            this.findParent(node, parentNodes, tree)
            let parentNode = parentNodes[index]
            this.findAllParent(parentNode, tree, parentNodes, ++index)
            return parentNodes
        },
        findParent(node, parentNodes, tree) {
            for (let i = 0; i < tree.length; i++) {
                let item = tree[i]
                if (item.id === node.fid) {
                    parentNodes.push(item)
                    return
                }
                if (item.child && item.child.length > 0) {
                    this.findParent(node, parentNodes, item.child)
                }
            }
        }

    }
}
</script>

<style lang="scss" scoped>
// .list-tips {
//     height: 24px;
//     line-height: 24px;
//     &::before {
//         height: 24px;
//     }
// }
//   .event ::v-deep .el-tag.el-tag--success {
//     background-color: rgba(0, 0, 0, 0);
//     border-color: #01c5ff;
//     color: #00fdff;
//     margin: 6px;
//   }
//   .event ::v-deep .el-descriptions-row {
//       th {
//           box-sizing: border-box;
//           min-height: 32px;
//           line-height: 32px;
//       }
//       td {
//           box-sizing: border-box;
//           min-height: 32px;
//           line-height: 32px;
//       }
//   }
//   .event ::v-deep .el-descriptions__body {
//     background: #033254;
//     color: #fff;
//   }
//   .event ::v-deep .el-descriptions .is-bordered .el-descriptions-item__cell {
//     border: none;
//     box-shadow: inset 0px 0px 6px 0px rgba(0, 186, 255, 0.73), inset 0px -1px 0px 0px rgba(40, 82, 124, 0.5);
//   }
//   .event ::v-deep .el-descriptions-item__label.is-bordered-label {
//     width: 120px;
//     background: #00466d;
//     color: #fff;
//     box-shadow: none !important;
//     border-left: 1px solid #3990d8 !important;
//     border-right: 1px solid #3990d8 !important;
//   }
//   .event ::v-deep .el-descriptions__table tbody:first-child .is-bordered-label {
//     border-top: 1px solid #3990d8 !important;
//     border-bottom: 1px solid #3990d8 !important;
//   }
//    .event ::v-deep .el-descriptions__table tbody:nth-child(2) .is-bordered-label {
//     border-bottom: 1px solid #3990d8 !important;
//   }
//   .event ::v-deep .el-descriptions__table tbody:last-child .is-bordered-label {
//     border-bottom: 1px solid #3990d8 !important;
//   }
//   .event ::v-deep .el-descriptions__table tbody:first-child td {
//     border-top: 1px solid #3990d8 !important;
//   }
//   .event ::v-deep .el-descriptions__table tbody:last-child td {
//     border-bottom: 1px solid #3990d8 !important;
//   }
//   .event ::v-deep .el-descriptions__table tbody td {
//     border-right: 1px solid #3990d8 !important;
//   }
.event ::v-deep .el-descriptions-item__label.is-bordered-label {
    width: 100px;
}
  .data_center_tags-content {
    position: relative;
  }
  .main {
    margin: 20px 0;
  }

  .data_center_tags-content:before {
    content: '标签内容：';
    font-size: 12px;
    position: absolute;
    color: #fff;
    left: 40px;
  }

  .tag-item {
    display: inline-block;
    width: 68px;
    color: #00fcff;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    height: 20px;
    border-radius: 4px;
    border: solid 1px #00c6ff;
  }
//   .el-tree {
//     background: rgba(0, 0, 0, 0);
//   }
  .attendance-list {
    margin-top: 0;
    padding-bottom: 30px;
    min-height: calc(100vh - 80px);
    flex-shrink: 0;
    padding-left: 20px;
    padding-right: 20px;
  }
  .event ::v-deep .custom-tree-node {
    height: 26px;
    line-height: 26px;
  }
  .tree ::v-deep .el-tree--highlight-current .el-tree-node > .el-tree-node__content {
    .custom-tree-node {
      span:nth-child(1) {
        color: #bfdce4 !important;
      }
      span:nth-child(2) {
        color: #fff !important;
      }
    }
  }
//   .tree ::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
//     background-color: rgba(0, 0, 0, 0) !important;
//     .custom-tree-node {
//       span {
//         color: #1cd7fa !important;
//       }
//     }
//   }
//   .tree ::v-deep .el-tree--highlight-current .el-tree-node > .el-tree-node__content:hover {
//     background-color: rgba(0, 0, 0, 0) !important;
//     .custom-tree-node {
//       span {
//         color: #1cd7fa !important;
//       }
//     }
//   }
//   .hightlight {
//     color: #00fcff;
//   }

  .sep-line {
    width: 20px;
    margin: 0 5px;
    display: inline-block;
    text-align: center;
    margin-top: 6px;
  }

  .operate-wrap {
    display: inline-block;
    color: #389bf7;
    width: 26px;
    text-align: center;

    i {
      cursor: pointer;
      font-size: 16px;
    }
  }

  .tag-cont-wrap {
    //   text-align: right;
    .addbtn {
      cursor: pointer;
      display: inline-block;
      color: #01e9ff;
      font-size: 14px;

      span {
        margin-left: 9px;
      }
    }

    .tag-cont {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px 4px 2px 4px;
      border: solid 1px #1cd7fa;
      padding: 20px;
    }

    .cont-inner {
      background: rgba(255, 255, 255, 0.1);
      padding: 10px 10px 10px 10px;
      height: 400px;
      overflow-y: auto;
    }

    .cont-inner .cont-item:not(:nth-last-child(2)) {
      margin-bottom: 10px;
    }
  }
  .event .el-divider {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .event ::v-deep .el-divider__text {
    background-color: #1d3141;
    padding: 0 5px;
    color: #fff;
  }

  .event > .el-divider--horizontal {
    width: 97%;
  }

  .del-btn {
    font-size: 12px;
    color: #1cd7fa;
    margin-left: 0px;
    cursor: pointer;

    i {
      margin-right: 4px;
    }
  }

  .operate-color {
    font-size: 12px;
    color: #1cd7fa;
    cursor: pointer;
    position: relative;
    z-index: 10;
    width: 70px;
    &.active {
      top: -14px;
    }

    i {
      margin-right: 4px;
    }
  }
  .grpop.active {
    padding-left: 70px;
  }
  .el-table th > .cell {
    white-space: pre-line;
    text-align: center;
  }

  .dialog-conten {
    width: 100%;
  }

  .tag-list > .attendance-dialog {
    .el-dialog__header {
      .el-dialog__title {
        font-size: 14px;
      }
    }

    .el-form-item__label {
      font-size: 12px;
    }

    .el-input__inner,
    .el-textarea__inner {
      font-size: 12px;
    }
  }

  .dialog-item {
    margin-bottom: 30px;
  }

  .w50 {
    width: 50%;
  }

  .dialog-item {
    .dialog-label {
      display: inline-block;
      text-align: right;
      width: 86px;
      color: #fff;
      opacity: 0.6;
    }
  }
  .event  ::v-deep .vue-treeselect__control {
    height: 32px !important;
  }
</style>
<style>
  .custom-tree-node .node-label:hover {
    color: #0052d9 !important;
  }
  .custom-tree-node .node-edit:hover {
    color: #0052d9 !important;;
  }
  .custom-tree-node .node-del:hover {
    color: #0052d9 !important;
  }
  .el-tree-node__content {
    background-color: rgba(0, 0, 0, 0) !important;
    color: #0052d9;
  }
  /*高亮当前点击项*/
  .el-tree-node__content:hover,
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content .custom-tree-node .node-label {
    background: none !important;
    color: #0052d9 !important;
  }
</style>
