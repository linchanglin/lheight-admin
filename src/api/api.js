import axios from 'axios';

// let base = '/admin-loves/apis';

let base = '';

// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// // export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// // export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };





// // export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`/admin-loves/apis/users/1`).then(function (res) {
//     console.log('resdddd', res);
// }); };






export const getNewLovesList = params => { return axios.get(`${base}/loves`, {params: params}); };
export const addLove = params => { return axios.post(`${base}/loves`, {params: params}); };
export const editLove = params => { return axios.post(`${base}/loves`, {params: params}); };
