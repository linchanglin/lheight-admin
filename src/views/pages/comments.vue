<template>
    <section>
    
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding: 0 10px;">
            <div style="font-size: 15px;">
                <p>
                    <span>{{love.userInfo.nickname}}:</span>
                    <span>{{love.content}}</span>
                </p>
            </div>
            <!--<el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filters.search" placeholder="内容"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="getComments">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleAdd">新增</el-button>
                    </el-form-item>
                </el-form>-->
        </el-col>
    
        <!--工具条-->
        <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-input v-model="filters.search" placeholder="内容"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="getComments">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleAdd">新增</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>-->
    
        <!--列表-->
        <el-table :data="comments" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="content" label="内容" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="reply_nums" label="回复数" width="100">
                <template scope="scope">
                    <router-link :to="{ name: '回复管理', params: { id: scope.row.id }}">{{scope.row.reply_nums}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="praise_nums" label="喜欢数" width="100" sortable>
            </el-table-column>
            <el-table-column prop="available" label="可见" width="100" :formatter="formatAvailable" sortable>
            </el-table-column>
            <el-table-column label="创建人" width="100">
                <template scope="scope">
                    <router-link :to="{ path: 'user', params: { userId: scope.row.userInfo.id }}">{{scope.row.userInfo.nickname}}</router-link>
                </template>
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
                <el-form-item label="内容">
                    <el-input type="textarea" autosize v-model="editForm.content"></el-input>
                </el-form-item>
                <el-form-item label="可见性">
                    <el-radio-group v-model="editForm.available">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
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
                <el-form-item label="内容">
                    <el-input type="textarea" autosize v-model="addForm.content"></el-input>
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
import util from '../../common/js/util'
//import NProgress from 'nprogress'
// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
import { getLove, getCommentsList, removeComment, batchRemoveComment, editComment, addComment } from '../../api/api';

export default {
    data() {
        return {
            filters: {
                search: ''
            },
            love: {
                content: '',
                userInfo: {
                }
            },
            comments: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [],//列表选中列

            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            editFormRules: {
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ]
            },
            //编辑界面数据
            editForm: {},

            addFormVisible: false,//新增界面是否显示
            addLoading: false,
            addFormRules: {
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ]
            },
            //新增界面数据
            addForm: {}
        }
    },
    methods: {
        //是否显示转换
        formatAvailable: function (row, column) {
            return row.available == 1 ? '是' : row.available == 0 ? '否' : '未知';
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getComments();
        },
        //获取表白
        getLove() {
            let para = {
                id: this.$route.params.id,
            };
            console.log('para ss', para);
            getLove(para).then((res) => {
                console.log('getLove res', res);
                this.love = res.data.data;
            });
        },
        //获取评论列表
        getComments() {
            let para = {
                id: this.$route.params.id,
                page: this.page,
                search: this.filters.search
            };
            console.log('para ddx', para);
            this.listLoading = true;
            getCommentsList(para).then((res) => {
                console.log('getCommentsList res', res);
                this.total = res.data.dataLength;
                this.comments = res.data.data;
                this.listLoading = false;
            });
        },
        //删除
        handleDel: function (row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = { id: row.id };
                removeComment(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getComments();
                });
            }).catch(() => {

            });
        },
        //显示编辑界面
        handleEdit: function (row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
            this.addForm = {
                content: ''
            };
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.editForm);
                        editComment(para).then((res) => {
                            this.editLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getComments();
                        });
                    });
                }
            });
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.addForm);
                        addComment(para).then((res) => {
                            this.addLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.getComments();
                        });
                    });
                }
            });
        },
        selsChange: function (sels) {
            this.sels = sels;
        },
        //批量删除
        batchRemove: function () {
            // var ids = this.sels.map(item => item.id).toString();
            var ids = this.sels.map(item => item.id);
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = { ids: ids };
                batchRemoveComment(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getComments();
                });
            }).catch(() => {

            });
        }
    },
    mounted() {
        this.getLove();
        this.getComments();
    }
}

</script>

<style scoped>

</style>