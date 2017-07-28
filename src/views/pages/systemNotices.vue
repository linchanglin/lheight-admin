<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.search" placeholder="内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getSystemNotices">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="systemNotices" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="100" sortable>
            </el-table-column>
            <el-table-column label="对象" width="100">
                <template scope="scope">
                    <router-link :to="{ path: 'user', params: { userId: scope.row.userInfo.id }}">{{scope.row.userInfo.nickname}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="image" label="图片" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="video_url" label="视频" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="content" label="内容" min-width="120" sortable>
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
                <el-form-item label="类型">
                    <el-input v-model="editForm.type" placeholder="请输入数字0或1，0表示对所有用户，1表示对单一用户"></el-input>
                </el-form-item>
                <el-form-item label="对象ID">
                    <el-input v-model="editForm.user_id"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input type="textarea" autosize v-model="editForm.image"></el-input>
                </el-form-item>
                <el-form-item label="视频">
                    <el-input type="textarea" autosize v-model="editForm.video_url"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" autosize v-model="editForm.content"></el-input>
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
                <el-form-item label="类型">
                    <el-input v-model="addForm.type" placeholder="请输入数字0或1，0表示对所有用户，1表示对单一用户"></el-input>
                </el-form-item>
                <el-form-item label="对象ID">
                    <el-input v-model="addForm.user_id"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input type="textarea" autosize v-model="addForm.image"></el-input>
                </el-form-item>
                <el-form-item label="视频">
                    <el-input type="textarea" autosize v-model="addForm.video_url"></el-input>
                </el-form-item>
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
import { getSystemNoticesList, removeSystemNotice, batchRemoveSystemNotice, editSystemNotice, addSystemNotice } from '../../api/api';

export default {
    data() {
        return {
            filters: {
                search: ''
            },
            systemNotices: [],
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
        formatAnonymous: function (row, column) {
            return row.anonymous == 1 ? '是' : row.anonymous == 0 ? '否' : '未知';
        },
        formatAvailable: function (row, column) {
            return row.available == 1 ? '是' : row.available == 0 ? '否' : '未知';
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getSystemNotices();
        },
        //获取帖子列表
        getSystemNotices() {
            let para = {
                page: this.page,
                search: this.filters.search
            };
            this.listLoading = true;
            getSystemNoticesList(para).then((res) => {
                console.log('getSystemNoticesList res', res);
                this.total = res.data.dataLength;
                this.systemNotices = res.data.data;
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
                removeSystemNotice(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getSystemNotices();
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
                type: '',
                user_id: '',
                image: '',
                video_url: '',
                content: '',
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
                        console.log('editSubmit para', para);
                        editSystemNotice(para).then((res) => {
                            this.editLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getSystemNotices();
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
                        console.log('addSubmit para', para);
                        addSystemNotice(para).then((res) => {
                            this.addLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.getSystemNotices();
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
                batchRemoveSystemNotice(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getSystemNotices();
                });
            }).catch(() => {

            });
        }
    },
    mounted() {
        this.getSystemNotices();
    }
}

</script>

<style scoped>

</style>