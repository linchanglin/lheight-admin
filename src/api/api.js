import axios from 'axios';

let base;
if (location.href.indexOf("life.collhome.com") > -1) {
    base = '/life/apis';
} else {
    base = 'https://collhome.com/life/apis'
}


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



//完成
export const requestLogin = params => { return axios.post(`${base}/admin/login`, params).then(res => res.data); };

export const getUptoken = () => { return axios.get(`${base}/uptoken`); };

export const addImageToLove = params => { return axios.post(`${base}/addImage/love`, {params: params}); };
export const removeImageFromLove = params => { return axios.post(`${base}/removeImage/love`, {params: params}); };


export const getNewLovesList = params => { return axios.get(`${base}/loves_backsystem`, {params: params}); };
export const addLove = params => { return axios.post(`${base}/loves_backsystem`, {params: params}); };
export const editLove = params => { return axios.post(`${base}/loves_backsystem`, {params: params}); };
export const removeLove = params => { return axios.post(`${base}/delete/love_backsystem`, {params: params}); };
export const batchRemoveLove = params => { return axios.post(`${base}/delete/loves`, {params: params}); };

export const getLove = params => { return axios.get(`${base}/loves_backsystem/${params.id}`); };
export const getCommentsList = params => { return axios.get(`${base}/loves/${params.id}/comments_backsystem`); };
export const addComment = params => { return axios.post(`${base}/comments_backsystem`, {params: params}); };
export const editComment = params => { return axios.post(`${base}/comments_backsystem`, {params: params}); };
export const removeComment = params => { return axios.post(`${base}/delete/comment_backsystem`, {params: params}); };
export const batchRemoveComment = params => { return axios.post(`${base}/delete/comments`, {params: params}); };

export const getComment = params => { return axios.get(`${base}/comments_backsystem/${params.id}`); };
export const getRepliesList = params => { return axios.get(`${base}/comments/${params.id}/replies_backsystem`); };
export const addReply = params => { return axios.post(`${base}/replies_backsystem`, {params: params}); };
export const editReply = params => { return axios.post(`${base}/replies_backsystem`, {params: params}); };
export const removeReply = params => { return axios.post(`${base}/delete/reply_backsystem`, {params: params}); };
export const batchRemoveReply = params => { return axios.post(`${base}/delete/replies`, {params: params}); };



//完成
export const getRadiosList = params => { return axios.get(`${base}/get_radio/list`, {params: params}); };
export const addRadio = params => { return axios.post(`${base}/radios`, {params: params}); };
export const editRadio = params => { return axios.post(`${base}/radios`, {params: params}); };
export const removeRadio = params => { return axios.post(`${base}/delete/radio`, {params: params}); };
export const batchRemoveRadio = params => { return axios.post(`${base}/delete/radios`, {params: params}); };


export const getSystemNoticesList = params => { return axios.get(`${base}/systemNotices_backsystem`, {params: params}); };
export const addSystemNotice = params => { return axios.post(`${base}/systemNotices`, {params: params}); };
export const editSystemNotice = params => { return axios.post(`${base}/systemNotices`, {params: params}); };
export const removeSystemNotice = params => { return axios.post(`${base}/delete/systemNotice`, {params: params}); };
export const batchRemoveSystemNotice = params => { return axios.post(`${base}/delete/systemNotices`, {params: params}); };

export const getRelatedAppletsList = params => { return axios.get(`${base}/relatedApplets`, {params: params}); };
export const addRelatedApplet = params => { return axios.post(`${base}/relatedApplets`, {params: params}); };
export const editRelatedApplet = params => { return axios.post(`${base}/relatedApplets`, {params: params}); };
export const removeRelatedApplet = params => { return axios.post(`${base}/delete/relatedApplet`, {params: params}); };
export const batchRemoveRelatedApplet = params => { return axios.post(`${base}/delete/relatedApplets`, {params: params}); };

export const getAboutLoveWallsList = params => { return axios.get(`${base}/aboutLoveWalls`, {params: params}); };
export const addAboutLoveWall = params => { return axios.post(`${base}/aboutLoveWalls`, {params: params}); };
export const editAboutLoveWall = params => { return axios.post(`${base}/aboutLoveWalls`, {params: params}); };
export const removeAboutLoveWall = params => { return axios.post(`${base}/delete/aboutLoveWall`, {params: params}); };
export const batchRemoveAboutLoveWall = params => { return axios.post(`${base}/delete/aboutLoveWalls`, {params: params}); };

export const getUsersList = params => { return axios.get(`${base}/users`, {params: params}); };
export const addUser = params => { return axios.post(`${base}/back/users`, {params: params}); };
export const editUser = params => { return axios.post(`${base}/back/users`, {params: params}); };
export const removeUser = params => { return axios.post(`${base}/delete/user`, {params: params}); };
export const batchRemoveUser = params => { return axios.post(`${base}/delete/users`, {params: params}); };

// export const getVirtualUsersList = params => { return axios.get(`${base}/virtualUsers`, {params: params}); };
// export const addVirtualUser = params => { return axios.post(`${base}/virtualUsers`, {params: params}); };
// export const editVirtualUser = params => { return axios.post(`${base}/virtualUsers`, {params: params}); };
// export const removeVirtualUser = params => { return axios.post(`${base}/delete/virtualUser`, {params: params}); };
// export const batchRemoveVirtualUser = params => { return axios.post(`${base}/delete/virtualUsers`, {params: params}); };

export const getCollegeUsersList = params => { return axios.get(`${base}/collegeUsers`, {params: params}); };
export const addCollegeUser = params => { return axios.post(`${base}/collegeUsers`, {params: params}); };
export const editCollegeUser = params => { return axios.post(`${base}/collegeUsers`, {params: params}); };
export const removeCollegeUser = params => { return axios.post(`${base}/delete/collegeUser`, {params: params}); };
export const batchRemoveCollegeUser = params => { return axios.post(`${base}/delete/collegeUsers`, {params: params}); };







