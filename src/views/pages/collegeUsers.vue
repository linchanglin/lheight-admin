<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.search" placeholder="内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getCollegeUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="collegeUsers" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="100" sortable>
            </el-table-column>
            <el-table-column prop="college_name" label="学校" width="100" sortable>
            </el-table-column>
            <el-table-column prop="avatarUrl" label="头像" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="signature" label="签名" min-width="120" sortable>
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
                <el-form-item label="昵称">
                    <el-input v-model="editForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-input type="textarea" autosize v-model="editForm.avatarUrl"></el-input>
                </el-form-item>
                <el-form-item label="学校">
                    <el-input v-model="editForm.college_name"></el-input>
                </el-form-item>
                <el-form-item label="签名">
                    <el-input type="textarea" autosize v-model="editForm.signature"></el-input>
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
                <el-form-item label="昵称">
                    <el-input v-model="addForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-input type="textarea" autosize v-model="addForm.avatarUrl"></el-input>
                </el-form-item>
                <el-form-item label="学校">
                    <el-input v-model="addForm.college_name"></el-input>
                </el-form-item>
                <el-form-item label="签名">
                    <el-input type="textarea" autosize v-model="addForm.signature"></el-input>
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
import { getCollegeUsersList, removeCollegeUser, batchRemoveCollegeUser, editCollegeUser, addCollegeUser } from '../../api/api';

export default {
    data() {
        return {
            filters: {
                search: ''
            },
            collegeUsers: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [],//列表选中列

            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            editFormRules: {
                // content: [
                //     { required: true, message: '请输入内容', trigger: 'blur' }
                // ]
            },
            //编辑界面数据
            editForm: {},

            addFormVisible: false,//新增界面是否显示
            addLoading: false,
            addFormRules: {
                // content: [
                //     { required: true, message: '请输入内容', trigger: 'blur' }
                // ]
            },
            //新增界面数据
            addForm: {}
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val;
            this.getCollegeUsers();
        },
        //获取表白列表
        getCollegeUsers() {
            let para = {
                page: this.page,
                search: this.filters.search
            };
            this.listLoading = true;
            getCollegeUsersList(para).then((res) => {
                console.log('getCollegeUsersList res', res);
                this.total = res.data.dataLength;
                this.collegeUsers = res.data.data;
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
                removeCollegeUser(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getCollegeUsers();
                });
            }).catch(() => {

            });
        },
        //显示编辑界面
        handleEdit: function (row) {
            this.editFormVisible = true;
            console.log('row', row);
            this.editForm = Object.assign({}, row);
        },
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
            this.addForm = {
                nickname: '',
                avatarUrl: '',
                college_name: '',
                signature: ''
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
                        editCollegeUser(para).then((res) => {
                            this.editLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getCollegeUsers();
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
                        addCollegeUser(para).then((res) => {
                            this.addLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.getCollegeUsers();
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
                batchRemoveCollegeUser(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getCollegeUsers();
                });
            }).catch(() => {

            });
        }
    },
    mounted() {
        this.getCollegeUsers();
    }
}

</script>

<style scoped>

</style>