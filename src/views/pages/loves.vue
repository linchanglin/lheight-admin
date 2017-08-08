<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.search" placeholder="内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getNewLoves">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="loves" border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
             <el-table-column type="index" width="60">
            </el-table-column> 
            <el-table-column prop="postingType_name" label="主题" width="100" sortable>
            </el-table-column>
            <el-table-column prop="content" label="内容" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="images" label="图片" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="video_url" label="视频" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="location.name" label="位置" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="anonymous" label="匿名" width="100" :formatter="formatAnonymous" sortable>
            </el-table-column>
            <el-table-column prop="comment_nums" label="评论数" width="100">
                <template scope="scope">
                    <router-link :to="{ name: '评论管理', params: { id: scope.row.id }}">{{scope.row.comment_nums}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="praise_nums" label="喜欢数" width="100" sortable>
            </el-table-column>
            <!--<el-table-column prop="read_nums" label="阅读数" width="100" sortable>
            </el-table-column>-->
            <el-table-column prop="available" label="可见" width="100" :formatter="formatAvailable" sortable>
            </el-table-column>
            <el-table-column label="创建人" width="100">
                <template scope="scope">
                    <!--<el-button  type="text">{{scope.row.userInfo.nickname}}</el-button>-->
                    <router-link :to="{ path: 'user', params: { userId: scope.row.userInfo.id }}">{{scope.row.userInfo.nickname}}</router-link>
                    
                </template>
                <!--<router-link :to="{ name: 'user', params: { userId: userInfo.id }}">{{userInfo.nickname}}</router-link>-->
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
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                
                <el-form-item
                    label="用户ID"
                    prop="user_id"
                    :rules="[
                    { required: true, message: '用户id不能为空'},
                    { type: 'number', message: '用户id必须为数字值'}
                    ]"
                >
                    <el-input v-model.number="editForm.user_id" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主题" prop="postingType_id">
                    <el-select v-model="editForm.postingType_id" placeholder="">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" autosize v-model="editForm.content"></el-input>
                </el-form-item>
                

                <el-form-item label="图片">
                    <el-upload
                        action="https://upload-z2.qbox.me"
                        list-type="picture-card"
                        :file-list="fileList2"
                        :on-success="handleSuccess"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :before-upload="beforeUpload"
                        :data="upload_form"
                        >
                        
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <!-- <el-dialog v-model="dialogVisible" size="small">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog> -->
                    <!-- <el-input type="textarea" autosize v-model="editForm.images"></el-input> -->
                </el-form-item>
                <el-form-item label="视频地址" prop="video_url">
                    <el-input type="textarea" autosize v-model="editForm.video_url"></el-input>
                </el-form-item>
                <!--<el-form-item label="位置">
                    <el-input v-model="editForm.location" auto-complete="off"></el-input>
                </el-form-item>-->
                <el-form-item label="匿名">
                    <el-radio-group v-model="editForm.anonymous">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="评论数">
                    <el-input v-model="editForm.comment_nums" auto-complete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="喜欢数">
                    <el-input v-model="editForm.praise_nums" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="阅读数">
                    <el-input v-model="editForm.read_nums" auto-complete="off"></el-input>
                </el-form-item> -->
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

        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    
        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" ref="addForm" label-width="80px" :rules="addFormRules">
                <el-form-item
                    label="用户ID"
                    prop="user_id"
                    :rules="[
                    { required: true, message: '用户id不能为空'},
                    { type: 'number', message: '用户id必须为数字值'}
                    ]"
                >
                    <el-input v-model.number="addForm.user_id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主题" prop="postingType_id">
                    <el-select v-model="addForm.postingType_id" placeholder="">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" autosize v-model="addForm.content"></el-input>
                </el-form-item>
                 <el-form-item label="图片" prop="images">
                    <el-input type="textarea" autosize v-model="addForm.images"></el-input>
                </el-form-item> 
                <el-form-item label="视频地址" prop="video_url">
                    <el-input type="textarea" autosize v-model="addForm.video_url"></el-input>
                </el-form-item>
                <el-form-item label="匿名">
                    <el-radio-group v-model="addForm.anonymous">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click.native="addFormVisible = false">取消</el-button> -->
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
                <el-button @click="resetForm('addForm')">重置</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import util from '../../common/js/util'
import moment from '../../js-sdk/moment'
//import NProgress from 'nprogress'
// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
import { getUptoken, getNewLovesList, removeLove, batchRemoveLove, editLove, addLove, addImageToLove, removeImageFromLove } from '../../api/api';


export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            upload_form: {},

            options: [{
                value: '1',
                label: '表白'
            }, {
                value: '2',
                label: '活动'
            }, {
                value: '3',
                label: '求助'
            }, {
                value: '4',
                label: '物品'
            }, {
                value: '5',
                label: '吐槽'
            }, {
                value: '6',
                label: '工作'
            }],
            // value: '',
            // fileList2: [],



            filters: {
                search: ''
            },
            loves: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [],//列表选中列

            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            editFormRules: {
                postingType_id: [
                    { required: true, message: '主题不能为空', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ],
            },
            //编辑界面数据
            editForm: {},

            addFormVisible: false,//新增界面是否显示
            addLoading: false,
            addFormRules: {
                postingType_id: [
                    { required: true, message: '主题不能为空', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ],
            },
            //新增界面数据
            addForm: {}
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
            let key_url = file.url;
            let key;
            if (key_url.substr(0, 5) == 'http:') {
                key = key_url;
            } else {
                let visit_url = 'http://lifecdn.collhome.com';
                key = `${visit_url}/${key_url}`;
            }
            
            let para = {
                love_id: this.editForm.id,
                key: key
            }
            removeImageFromLove(para).then((res) => {
                this.getNewLoves();
                console.log('removeImageFromLove');
            })
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeUpload (file) {
            let curr = moment().format('YYYYMMDD').toString();
            let prefix = moment(file.lastModified).format('HHmmss').toString();
            let suffix = file.name;
            let user_id = this.editForm.user_id;
            let key = encodeURI(`${user_id}/${curr}.${prefix}_${suffix}`)
            return getUptoken().then((res) => {
                this.upload_form = {
                    key: key,
                    token: res.data.uptoken
                }
            })
        },
        handleSuccess (response, file, fileList) {
            let key = response.key;
            let visit_url = 'http://lifecdn.collhome.com';
            let para = {
                love_id: this.editForm.id,
                key: `${visit_url}/${key}`
            }
            addImageToLove(para).then((res) => {
                this.getNewLoves();
                console.log('addImageToLove');
            })
        },





        //是否显示转换
        formatAnonymous: function (row, column) {
            return row.anonymous == 1 ? '是' : row.anonymous == 0 ? '否' : '未知';
        },
        formatAvailable: function (row, column) {
            return row.available == 1 ? '是' : row.available == 0 ? '否' : '未知';
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getNewLoves();
        },
        //获取帖子列表
        getNewLoves() {
            let para = {
                type: 'newLoves',
                page: this.page,
                search: this.filters.search
            };
            this.listLoading = true;
            getNewLovesList(para).then((res) => {
                console.log('getNewLovesList res', res);
                this.total = res.data.dataLength;
                this.loves = res.data.data;

                

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
                removeLove(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getNewLoves();
                });
            }).catch(() => {

            });
        },
        //显示编辑界面
        handleEdit: function (row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);

            let loves = this.loves;
            for (let love of loves) {
                if (love.id == row.id) {
                    let images = love.images_array;
                    let fileList2 = [];
                    for (let image of images) {
                        let fileList = {
                            url: image
                        };
                        fileList2.push(fileList);
                    }
                    this.fileList2 = fileList2;
                }
            }     
        },
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
            this.addForm = {
                user_id: '',
                postingType_id: '',
                content: '',
                images: '',
                video_url: '',
                anonymous: 0,
                available: 1,
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
                        editLove(para).then((res) => {
                            this.editLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getNewLoves();
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
                        addLove(para).then((res) => {
                            this.addLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.getNewLoves();
                        });
                    });
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
                batchRemoveLove(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getNewLoves();
                });
            }).catch(() => {

            });
        }
    },
    mounted() {
        this.getNewLoves();
    }
}

</script>

<style scoped>

</style>