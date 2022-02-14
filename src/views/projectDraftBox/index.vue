<template>
  <div class="box">
    <div class="box" v-show="show === 0">
      <div class="box-card">
        <div style="font-size: 16px; color: #000">筛选条件</div>
        <div class="seach">
          <div
            style="
              display: flex;
              align-items: center;
              white-space: nowrap;
              width: calc(75% - 7px);
            "
          >
            项目名称：
            <el-input
              v-model="searchParameters.resName"
              size="small"
              placeholder="请输入"
            ></el-input>
          </div>
          <div style="display: flex">
            <el-button
              type="primary"
              class="button"
              size="small"
              @click="search"
              >搜索</el-button
            >
            <el-button class="button" size="small" @click="resize"
              >重置</el-button
            >
          </div>
        </div>
      </div>
      <div class="box-card" style="margin-top: 20px">
        <div style="margin-bottom: 10px">
          <el-button
            class="button"
            type="primary"
            size="small"
            :disabled="multipleSelection.length > 0 ? false : true"
            @click="exportExcle"
            >导出</el-button
          >
        </div>
        <div>
          <el-table
            ref="multipleTable"
            v-loading="loading"
            class="table"
            size="small"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            height="100vh"
            max-height="calc(100vh - 380px)"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="项目名称" prop="resName" sortable>
            </el-table-column>
            <el-table-column label="建设单位" prop="build" sortable>
            </el-table-column>
            <el-table-column label="申报单位" prop="declare" sortable>
            </el-table-column>
            <el-table-column label="最新更新时间" prop="time" sortable>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="details(scope.row)"
                  type="text"
                  size="small"
                >
                  查看
                </el-button>
                <el-button
                  @click.native.prevent="edit(scope.row)"
                  type="text"
                  size="small"
                >
                  {{ editState[scope.row.state] }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="my-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="searchParameters.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="edit-box" v-show="show === 1"></div>
  </div>
</template>
<script>
import { exportXlsx } from "@/utils/xlsx";
import { getProcessList, approve } from "@/api/resources/index";
export default {
  components: {},
  data() {
    return {
      input: "",
      show: 0,
      process: [
        "待材料审核",
        "待修改",
        "待评审",
        "待发起评审会",
        "待评分",
        "待确认评分",
        "待方案备案",
        "待传评审结论",
        "待预算备案",
        "待采购备案",
      ],
      searchParameters: {
        resName: "",
        resType: "",
        state: "",
        pageSize: 10,
        pageNum: 1,
      },
      resId: null,
      processId: null,
      detailsType: true,
      option1: [
        {
          value: 1,
          label: "数据资源",
        },
        {
          value: 2,
          label: "组件资源",
        },
      ],
      option2: [
        {
          value: 1,
          label: "待审核",
        },
        {
          value: 2,
          label: "调用权限已开通",
        },
        {
          value: 3,
          label: "调用请求未通过",
        },
      ],
      tableData: [],
      multipleSelection: [],
      total: 0,
      stateTable: {
        1: ["待审核", "#D26610"],
        2: ["调用权限已开通", "#239F84"],
        3: ["调用请求未通过", "#747070"],
      },
      editState: {
        1: "审核回执",
        2: "更新授权",
        3: "",
      },
      approveForm: {
        processId: null,
        result: "",
        remark: "",
      },
      rules: {
        result: [{ required: true, message: "请审核", trigger: "change" }],
      },
      editTitle: "审核回执",
      activeName: "first",
      loading: true,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    getData() {
      return new Promise((resolve) => {
        const list = [];
        for (let i = 0; i < 9; i++) {
          const obj = {
            resName: `项目${i}`,
            build: "住建局-城建处",
            declare: "住建局-信息中心",
            time: "2021-08-10",
            resType: i,
          };
          list.push(obj);
        }
        setTimeout(() => resolve({ list, total: list.length }), 1000);
      });
    },
    exportExcle() {
      let header = ["资源名称", "资源类型", "资源审核状态"];
      let arr = [];
      if (this.multipleSelection.length > 0) {
        arr = this.multipleSelection.map((item) => {
          let list = [];
          list.push(item.name);
          list.push(item.type == 1 ? "数据资源" : "组件资源");
          list.push(this.stateTable[item.state][0]);
          return list;
        });
        arr.unshift(header);
        console.log(arr);
        exportXlsx(arr, "资源审核表");
      }
    },
    details(val) {
      console.log(val);
      this.detailsType = val.resType == 2 ? true : false;
      this.resId = val.resId - 0;
      this.processId = val.processId - 0;
      this.show = 2;
    },
    edit(val) {
      val.state == 1
        ? (this.editTitle = "更新授权")
        : (this.editTitle = "审核回执");
      this.$set(this.approveForm, "processId", val.processId);
      this.show = 1;
    },
    search() {
      this.$set(this.searchParameters, "pageNum", 1);
      this.getList();
    },
    resize() {
      this.searchParameters = {
        ...this.searchParameters,
        resName: "",
        resType: "",
        state: "",
      };
    },
    getList() {
      this.loading = true;
      let _opt = this.searchParameters;
      this.getData(_opt).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.total = res.total;
        this.loading = false;
      });
      // getProcessList(_opt).then((res) => {
      //   this.tableData = res.list;
      //   this.total = res.total;
      //   this.loading = false;
      // });
    },
    handleSizeChange(val) {
      this.searchParameters.pageSize = val;
      this.searchParameters.pageNum = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.searchParameters.pageNum = val;
      this.getList();
    },
    submitForm() {
      console.log(this.$refs.formName);
      this.$refs.approveForm.validate((valid) => {
        if (valid) {
          console.log(this.approveForm);
          this.approveFn();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    approveFn() {
      approve(this.approveForm).then((res) => {
        this.successFn(res);
      });
    },
    // 成功回调
    successFn(res) {
      this.$alert("是否返回上一页", "成功", {
        confirmButtonText: "确定",
      })
        .then((res) => {
          this.show = 0;
        })
        .catch(() => {})
        .finally(() => {
          this.getList();
        });
    },
    resetForm() {
      this.$refs.approveForm.resetFields();
    },
  },
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
