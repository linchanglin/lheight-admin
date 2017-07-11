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
export const removeLove = params => { return axios.post(`${base}/delete/love`, {params: params}); };
export const batchRemoveLove = params => { return axios.post(`${base}/delete/loves`, {params: params}); };


export const getLove = params => { return axios.get(`${base}/loves/${params.id}`); };
export const getCommentsList = params => { return axios.get(`${base}/comments`, {params: params}); };
export const addComment = params => { return axios.post(`${base}/comments`, {params: params}); };
export const editComment = params => { return axios.post(`${base}/comments`, {params: params}); };
export const removeComment = params => { return axios.post(`${base}/delete/comment`, {params: params}); };
export const batchRemoveComment = params => { return axios.post(`${base}/delete/comments`, {params: params}); };

export const getComment = params => { return axios.get(`${base}/comments/${params.id}`); };
export const getRepliesList = params => { return axios.get(`${base}/replies`, {params: params}); };
export const addReply = params => { return axios.post(`${base}/replies`, {params: params}); };
export const editReply = params => { return axios.post(`${base}/replies`, {params: params}); };
export const removeReply = params => { return axios.post(`${base}/delete/reply`, {params: params}); };
export const batchRemoveReply = params => { return axios.post(`${base}/delete/replies`, {params: params}); };

export const getSystemNoticesList = params => { return axios.get(`${base}/systemNotices`, {params: params}); };
export const addSystemNotice = params => { return axios.post(`${base}/systemNotices`, {params: params}); };
export const editSystemNotice = params => { return axios.post(`${base}/systemNotices`, {params: params}); };
export const removeSystemNotice = params => { return axios.post(`${base}/delete/systemNotice`, {params: params}); };
export const batchRemoveSystemNotice = params => { return axios.post(`${base}/delete/systemNotices`, {params: params}); };







