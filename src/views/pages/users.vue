<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.search" placeholder="内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="users" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <!--<el-table-column type="selection" width="55">
            </el-table-column>-->
            <el-table-column type="index" width="60">
            </el-table-column>
            
            <el-table-column prop="id" label="ID" width="100" sortable>
            </el-table-column>

            <el-table-column prop="nickname" label="昵称" width="100" sortable>
            </el-table-column>

            <!--<el-table-column prop="role" label="角色" width="100" :formatter="formatRole" sortable>
            </el-table-column>-->
            <el-table-column prop="trust" label="信任" width="100" :formatter="formatTrust" sortable>
            </el-table-column>
            <el-table-column prop="available" label="可用" width="100" :formatter="formatAvailable" sortable>
            </el-table-column>
            <el-table-column prop="disabled_reason" label="禁原因" min-width="100" sortable>
            </el-table-column>
            <el-table-column prop="praise_nums" label="喜欢数" width="100" sortable>
            </el-table-column>

            <el-table-column prop="realname" label="真名" width="100" sortable>
            </el-table-column>
            <el-table-column prop="gender_name" label="性别" width="100" sortable>
            </el-table-column>
            <el-table-column prop="college_name" label="学校" width="100" sortable>
            </el-table-column>
            <el-table-column prop="major" label="专业" width="100" sortable>
            </el-table-column>
            <el-table-column prop="grade_name" label="年级" width="100" sortable>
            </el-table-column>

            <el-table-column prop="avatarUrl" label="头像" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="pictures" label="相册" min-width="120" sortable>
            </el-table-column>

            <el-table-column prop="wechat" label="微信" width="100" sortable>
            </el-table-column>
            <el-table-column prop="qq" label="QQ" width="100" sortable>
            </el-table-column>
            <el-table-column prop="weibo" label="微博" width="100" sortable>
            </el-table-column>
            <el-table-column prop="mobilePhone" label="电话" width="100" sortable>
            </el-table-column>

            
            

            <el-table-column prop="birthday" label="生日" width="100" sortable>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="100" sortable>
            </el-table-column>
            <el-table-column prop="constellation" label="星座" width="100" sortable>
            </el-table-column>
             <!-- <el-table-column prop="height" label="身高" width="100" sortable>
            </el-table-column>
            <el-table-column prop="weight" label="体重" width="100" sortable> 
            </el-table-column> -->
            <el-table-column prop="hometown" label="故乡" width="100" sortable>
            </el-table-column>

            <el-table-column prop="signature" label="签名" min-width="120" sortable>
            </el-table-column>
            <!-- <el-table-column prop="character" label="性格" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="hobby" label="爱好" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="love_history" label="恋爱史" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="love_selecting" label="择偶观" min-width="120" sortable>
            </el-table-column> -->

            <el-table-column fixed="right" label="操作" width="100">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <!--<el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
    
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">

                <el-form-item label="昵称">
                    <el-input v-model="editForm.nickname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="信任级别">
                    <el-radio-group v-model="editForm.trust">
                        <el-radio class="radio" :label="0">不信任</el-radio>
                        <el-radio class="radio" :label="1">正常</el-radio>
                        <el-radio class="radio" :label="2">很信任</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="可用">
                    <el-radio-group v-model="editForm.available">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="禁用原因" v-if="editForm.available == 0" >
                    <el-input v-model="editForm.disabled_reason"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    
    </section>
</template>

<script>
import util from '../../common/js/util'
//import NProgress from 'nprogress'
// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
import { getUsersList, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

export default {
    data() {
        return {
            login_user: {},
            
            filters: {
                search: ''
            },
            users: [],
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
        //是否显示转换
        // formatRole: function (row, column) {
        //     return row.role == 1 ? '用户' : row.role == 0 ? '墙君' : '未知';
        // },
        formatTrust: function (row, column) {
            if (row.trust == 0) {
                return '不信任'
            } else if (row.trust == 1) {
                return '正常'
            } else {
                return '很信任'
            }
            // return row.role == 1 ? '墙君' : row.role == 0 ? '用户' : '未知';
        },
        formatAvailable: function (row, column) {
            return row.available == 1 ? '是' : row.available == 0 ? '否' : '未知';
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getUsers();
        },
        //获取帖子列表
        getUsers() {
            let para = {
                page: this.page,
                search: this.filters.search,
                manage_level_id: this.login_user.manage_level_id,
                manage_college_id: this.login_user.manage_college_id,
            };
            this.listLoading = true;
            getUsersList(para).then((res) => {
                console.log('getUsersList res', res);
                this.total = res.data.dataLength;
                this.users = res.data.data;
                this.listLoading = false;
            });

        },
        //删除
        // handleDel: function (row) {
        //     this.$confirm('确认删除该记录吗?', '提示', {
        //         type: 'warning'
        //     }).then(() => {
        //         this.listLoading = true;
        //         //NProgress.start();
        //         let para = { id: row.id };
        //         removeUser(para).then((res) => {
        //             this.listLoading = false;
        //             //NProgress.done();
        //             this.$message({
        //                 message: '删除成功',
        //                 type: 'success'
        //             });
        //             this.getUsers();
        //         });
        //     }).catch(() => {

        //     });
        // },
        //显示编辑界面
        handleEdit: function (row) {
            this.editFormVisible = true;
            console.log('row', row);
            this.editForm = Object.assign({}, row);
        },
        //显示新增界面
        // handleAdd: function () {
        //     this.addFormVisible = true;
        //     this.addForm = {
        //         content: '',
        //         video_url: '',
        //         anonymous: 0
        //     };
        // },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.editForm);
                        editUser(para).then((res) => {
                            this.editLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getUsers();
                        });
                    });
                }
            });
        },
        //新增
        // addSubmit: function () {
        //     this.$refs.addForm.validate((valid) => {
        //         if (valid) {
        //             this.$confirm('确认提交吗？', '提示', {}).then(() => {
        //                 this.addLoading = true;
        //                 //NProgress.start();
        //                 let para = Object.assign({}, this.addForm);
        //                 addUser(para).then((res) => {
        //                     this.addLoading = false;
        //                     //NProgress.done();
        //                     this.$message({
        //                         message: '提交成功',
        //                         type: 'success'
        //                     });
        //                     this.$refs['addForm'].resetFields();
        //                     this.addFormVisible = false;
        //                     this.getUsers();
        //                 });
        //             });
        //         }
        //     });
        // },
        // selsChange: function (sels) {
        //     this.sels = sels;
        // },
        //批量删除
        // batchRemove: function () {
        //     // var ids = this.sels.map(item => item.id).toString();
        //     var ids = this.sels.map(item => item.id);
        //     this.$confirm('确认删除选中记录吗？', '提示', {
        //         type: 'warning'
        //     }).then(() => {
        //         this.listLoading = true;
        //         //NProgress.start();
        //         let para = { ids: ids };
        //         batchRemoveUser(para).then((res) => {
        //             this.listLoading = false;
        //             //NProgress.done();
        //             this.$message({
        //                 message: '删除成功',
        //                 type: 'success'
        //             });
        //             this.getUsers();
        //         });
        //     }).catch(() => {

        //     });
        // }
    },
    mounted() {
        var login_user = sessionStorage.getItem('user');
		if (login_user) {
			this.login_user = JSON.parse(login_user);
        }

        this.getUsers();   
    }
}

</script>

<style scoped>

</style>