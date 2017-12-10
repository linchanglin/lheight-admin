<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.search" placeholder="内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getRadios">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="radios" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="120" sortable>
            </el-table-column>
            <el-table-column prop="author" label="作者" width="120" sortable>
            </el-table-column>
            <el-table-column prop="url" label="音频地址" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="duration" label="时长" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="upload_time" label="上传时间" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="praise_number" label="点赞数" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="play_number" label="播放数" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="img_url" label="图片" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="article_author" label="文章作者" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="article_content" label="文章内容" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="article_remark" label="文章备注" min-width="120" sortable>
            </el-table-column>

            <el-table-column prop="created_at" label="创建时间" width="120" sortable>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="标题">
                    <el-input v-model="editForm.title"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="editForm.author"></el-input>
                </el-form-item>
                <el-form-item label="音频地址">
                    <el-input type="textarea" autosize v-model="editForm.url"></el-input>
                </el-form-item>
                <el-form-item label="时长">
                    <el-input v-model="editForm.duration"></el-input>
                </el-form-item>
                <el-form-item label="上传时间">
                    <el-input v-model="editForm.upload_time"></el-input>
                </el-form-item>
                <el-form-item label="点赞数">
                    <el-input v-model="editForm.praise_number"></el-input>
                </el-form-item>
                <el-form-item label="播放数">
                    <el-input v-model="editForm.play_number"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input type="textarea" autosize v-model="editForm.img_url"></el-input>
                </el-form-item>
                <el-form-item label="文章作者">
                    <el-input type="textarea" autosize v-model="editForm.article_author"></el-input>
                </el-form-item>
                <el-form-item label="文章内容">
                    <el-input type="textarea" autosize v-model="editForm.article_content"></el-input>
                </el-form-item>
                <el-form-item type="textarea" autosize label="文章备注">
                    <el-input v-model="editForm.article_remark"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    
        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="标题">
                    <el-input v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="addForm.author"></el-input>
                </el-form-item>
                <el-form-item label="音频地址">
                    <el-input type="textarea" autosize v-model="addForm.url"></el-input>
                </el-form-item>
                <el-form-item label="时长">
                    <el-input v-model="addForm.duration"></el-input>
                </el-form-item>
                <el-form-item label="上传时间">
                    <el-input v-model="addForm.upload_time"></el-input>
                </el-form-item>
                <el-form-item label="点赞数">
                    <el-input v-model="addForm.praise_number"></el-input>
                </el-form-item>
                <el-form-item label="播放数">
                    <el-input v-model="addForm.play_number"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input type="textarea" autosize v-model="addForm.img_url"></el-input>
                </el-form-item>
                <el-form-item label="文章作者">
                    <el-input type="textarea" autosize v-model="addForm.article_author"></el-input>
                </el-form-item>
                <el-form-item label="文章内容">
                    <el-input type="textarea" autosize v-model="addForm.article_content"></el-input>
                </el-form-item>
                <el-form-item label="文章备注">
                    <el-input type="textarea" autosize v-model="addForm.article_remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import util from "../../common/js/util";
import {
  getRadiosList,
  removeRadio,
  batchRemoveRadio,
  editRadio,
  addRadio
} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        search: ""
      },
      radios: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        // content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {},

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        // content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {}
    };
  },
  methods: {
    //是否显示转换
    // formatAnonymous: function(row, column) {
    //   return row.anonymous == 1 ? "是" : row.anonymous == 0 ? "否" : "未知";
    // },
    // formatAvailable: function(row, column) {
    //   return row.available == 1 ? "是" : row.available == 0 ? "否" : "未知";
    // },
    handleCurrentChange(val) {
      this.page = val;
      this.getRadios();
    },
    //获取帖子列表
    getRadios() {
      let para = {
        page: this.page,
        search: this.filters.search
      };
      this.listLoading = true;
      getRadiosList(para).then(res => {
        console.log("getRadiosList res", res);
        this.total = res.data.dataLength;
        this.radios = res.data.data;
        this.listLoading = false;
      });
    },
    //删除
    handleDel: function(row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeRadio(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getRadios();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        title: "",
        author: "",
        url: "",
        duration: "",
        upload_time: "",
        praise_number: "",
        play_number: "",
        img_url: "",
        article_author: "",
        article_content: "",
        article_remark: "",
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            console.log("editSubmit para", para);
            editRadio(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getRadios();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            console.log("addSubmit para", para);
            addRadio(para).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getRadios();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      // var ids = this.sels.map(item => item.id).toString();
      var ids = this.sels.map(item => item.id);
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveRadio(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getRadios();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getRadios();
  }
};
</script>

<style scoped>

</style>