import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
let _Users = Users;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let { username, password } = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let { name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });


    //获取表白列表
    mock.onGet('/loves').reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: [
            {
              id: 10,
              content: "三月，醉一场青春的流年。慢步在三月的春光里，走走停停，看花开嫣然",
              belongsToMe: 0,
              video_url: null,
              images: [],
              userInfo: {
                id: 1,
                nickname: "福大君",
                avatarUrl: "http://cdn.collhome.com/love356.png",
                college: "福州大学"
              },
              created_at: "07-01 00:01",
              praise_nums: "409",
              comment_nums: "1",
              if_my_comment: 0,
              if_my_praise: 0,
              location: {
                address: "福建省福州市闽侯县大学城学园路2号",
                latitude:"26.059804672786",
                longitude:"119.19780624505",
                name:"福州大学",
              },
              anonymous: 1,
              available: 1,
            },
            {
              id: 9,
              content: "福州高校表白墙 图片",
              belongsToMe: 0,
              video_url: null,
              images: [],
              userInfo: {
                id: 1,
                nickname: "师大君",
                avatarUrl: "http://cdn.collhome.com/love356.png",
                college: "福州大学"
              },
              created_at: "07-01 00:01",
              praise_nums: "409",
              comment_nums: "1",
              if_my_comment: 0,
              if_my_praise: 0,
              location: "",
              anonymous: 0,
              available: 0,
            }
          ]
        }]);
      });
    });

    //获取某条表白
    mock.onGet('/loves/9').reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: {
            id: 10,
            content: "三月，醉一场青春的流年。慢步在三月的春光里，走走停停，看花开嫣然",
            belongsToMe: 0,
            video_url: null,
            images: [],
            userInfo: {
              id: 1,
              nickname: "福大君",
              avatarUrl: "http://cdn.collhome.com/love356.png",
              college: "福州大学"
            },
            created_at: "07-01 00:01",
            praise_nums: "409",
            comment_nums: "1",
            if_my_comment: 0,
            if_my_praise: 0,
            location: "",
            anonymous: 1,
            available: 1,
          }
        }]);
      });
    });


    //用户某条表白的评论
    mock.onGet('/comments').reply(config => {
      let { id } = config.params;
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: [
            {
              id: 10,
              content: "这里是评论1.     三月，醉一场青春的流年。慢步在三月的春光里，走走停停，看花开嫣然",
              userInfo: {
                id: 1,
                nickname: "刘亦菲",
                avatarUrl: "http://cdn.collhome.com/love356.png",
              },
              created_at: "07-01 00:01",
              praise_nums: "409",
              reply_nums: "1",
              available: 1,
            },
            {
              id: 9,
              content: "这里是评论2.     福州高校表白墙 图片",
              userInfo: {
                id: 1,
                nickname: "赵丽颖",
                avatarUrl: "http://cdn.collhome.com/love356.png",
              },
              created_at: "07-01 00:01",
              praise_nums: "409",
              reply_nums: "1",
              available: 0,
            }
          ]
        }]);
      });
    });

    //获取用户列表
    mock.onGet('/comments/9').reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: {
            id: 10,
            content: "这里是评论2.     福州高校表白墙 图片",
            belongsToMe: 0,
            video_url: null,
            images: [],
            userInfo: {
              id: 1,
              nickname: "福大君",
              avatarUrl: "http://cdn.collhome.com/love356.png",
              college: "福州大学"
            },
            created_at: "07-01 00:01",
            praise_nums: "409",
            comment_nums: "1",
            if_my_comment: 0,
            if_my_praise: 0,
            location: "",
            anonymous: 1,
            available: 1,
          }
        }]);
      });
    });



    //用户某条评论的回复
    mock.onGet('/replies').reply(config => {
      let { id } = config.params;
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: [
            {
              id: 10,
              content: "这里是回复1.     三月，醉一场青春的流年。慢步在三月的春光里，走走停停，看花开嫣然",
              userInfo: {
                id: 1,
                nickname: "刘亦菲",
                avatarUrl: "http://cdn.collhome.com/love356.png",
              },
              objectUserInfo: {
                id: 1,
                nickname: "杨幂",
                avatarUrl: "http://cdn.collhome.com/love356.png",
              },
              created_at: "07-01 00:01",
              praise_nums: "409",
              available: 1,
            },
            {
              id: 9,
              content: "这里是回复2.     福州高校表白墙 图片",
              userInfo: {
                id: 1,
                nickname: "赵丽颖",
                avatarUrl: "http://cdn.collhome.com/love356.png",
              },
              objectUserInfo: {
                id: 1,
                nickname: "唐嫣",
                avatarUrl: "http://cdn.collhome.com/love356.png",
              },
              created_at: "07-01 00:01",
              praise_nums: "409",
              available: 0,
            }
          ]
        }]);
      });
    });

    //获取系统通知列表
    mock.onGet('/systemNotices').reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: [
            {
              id: 10,
              type: 1,
              title: '标题',
              content: "三月，醉一场青春的流年。慢步在三月的春光里，走走停停，看花开嫣然",
              image: 'image',
              video_url: 'video_url',
              userInfo: {
                id: 1,
                nickname: "师大君",
                avatarUrl: "http://cdn.collhome.com/love356.png",
                college: "福州大学"
              },
              created_at: "07-01 00:01",
            },
            {
              id: 9,
              type: 1,
              title: '标题',
              content: "三月，醉一场青春的流年。慢步在三月的春光里，走走停停，看花开嫣然",
              image: 'image',
              video_url: 'video_url',
              userInfo: {
                id: 1,
                nickname: "师大君",
                avatarUrl: "http://cdn.collhome.com/love356.png",
                college: "福州大学"
              },
              created_at: "07-01 00:01",
            }
          ]
        }]);
      });
    });

    //获取相关小程序列表
    mock.onGet('/relatedApplets').reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: [
            {
              id: 1,
              appId: 'wx7f02895dae7c918a',
              name: '福州高校表白墙',
              avatarUrl: "http://cdn.collhome.com/love356.png",
              summary: '简介1',
            },
            {
              id: 2,
              appId: 'wx7f02895dae7c918a',
              name: '上海大学生表白墙',
              avatarUrl: "http://cdn.collhome.com/love356.png",
              summary: '简介1',
            }
          ]
        }]);
      });
    });

    //获取关于表白墙列表
    mock.onGet('/aboutLoveWalls').reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: [
            {
              id: 1,
              image: 'http://cdn.collhome.com/love356.png',
              video_url: 'http://cdn.collhome.com/love356.png',
              content: "上海大学生表白墙",
            },
            {
              id: 2,
              image: 'http://cdn.collhome.com/love356.png',
              video_url: 'http://cdn.collhome.com/love356.png',
              content: "北京大学生表白墙",
            }
          ]
        }]);
      });
    });


    //获取用户列表
    mock.onGet('/users').reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: [
            {
              id: 1,
              praise_nums: 0,
              nickname: "福大君",
              avatarUrl: "http://cdn.collhome.com/love.png",
              gender: "",
              gender_name: "",
              pictures: [],
              province: "",
              city: "",
              country: "中国",
              realname: "福大君",
              college: 1,
              college_name: "福州大学",
              major: "",
              grade: "",
              grade_name: "",
              wechat: "",
              qq: "",
              weibo: "",
              mobilePhone: "",
              role: 0,
              trust: 1,
              available: 1,
              birthday: "",
              height: "",
              weight: "",
              hometown: "",
              signature: "哈哈，我是表白君。您匿名发表表白的时候将以我的名义发表哒！",
              character: "",
              hobby: "",
              love_history: "",
              love_selecting: "",
              age: "",
              constellation: "",
              if_my_praise: 0,
              inMyBlackList: 0
            },
            {
              id: 2,
              praise_nums: 0,
              nickname: "师大君",
              avatarUrl: "http://cdn.collhome.com/love.png",
              gender: "",
              gender_name: "",
              pictures: [],
              province: "",
              city: "",
              country: "中国",
              realname: "福大君",
              college: 1,
              college_name: "福州大学",
              major: "",
              grade: "",
              grade_name: "",
              wechat: "",
              qq: "",
              weibo: "",
              mobilePhone: "",
              role: 0,
              trust: 1,
              available: 1,
              birthday: "",
              height: "",
              weight: "",
              hometown: "",
              signature: "哈哈，我是表白君。您匿名发表表白的时候将以我的名义发表哒！",
              character: "",
              hobby: "",
              love_history: "",
              love_selecting: "",
              age: "",
              constellation: "",
              if_my_praise: 0,
              inMyBlackList: 0
            },
            {
              id: 3,
              praise_nums: 0,
              nickname: "小宝宝",
              avatarUrl: "http://cdn.collhome.com/love.png",
              gender: "",
              gender_name: "",
              pictures: [],
              province: "",
              city: "",
              country: "中国",
              realname: "福大君",
              college: 1,
              college_name: "福州大学",
              major: "",
              grade: "",
              grade_name: "",
              wechat: "",
              qq: "",
              weibo: "",
              mobilePhone: "",
              role: 1,
              trust: 1,
              available: 1,
              birthday: "",
              height: "",
              weight: "",
              hometown: "",
              signature: "哈哈，我是表白君。您匿名发表表白的时候将以我的名义发表哒！",
              character: "",
              hobby: "",
              love_history: "",
              love_selecting: "",
              age: "",
              constellation: "",
              if_my_praise: 0,
              inMyBlackList: 0
            },
          ]
        }]);
      });
    });

    //获取用户列表
    mock.onGet('/collegeUsers').reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, {
          data: [
            {
              id: 1,
              praise_nums: 0,
              nickname: "福大君",
              avatarUrl: "http://cdn.collhome.com/love.png",
              gender: "",
              gender_name: "",
              pictures: [],
              province: "",
              city: "",
              country: "中国",
              realname: "福大君",
              college: 1,
              college_name: "福州大学",
              major: "",
              grade: "",
              grade_name: "",
              wechat: "",
              qq: "",
              weibo: "",
              mobilePhone: "",
              role: 0,
              trust: 1,
              available: 1,
              birthday: "",
              height: "",
              weight: "",
              hometown: "",
              signature: "哈哈，我是表白君。您匿名发表表白的时候将以我的名义发表哒！",
              character: "",
              hobby: "",
              love_history: "",
              love_selecting: "",
              age: "",
              constellation: "",
              if_my_praise: 0,
              inMyBlackList: 0
            },
            {
              id: 2,
              praise_nums: 0,
              nickname: "师大君",
              avatarUrl: "http://cdn.collhome.com/love.png",
              gender: "",
              gender_name: "",
              pictures: [],
              province: "",
              city: "",
              country: "中国",
              realname: "福大君",
              college: 1,
              college_name: "福州大学",
              major: "",
              grade: "",
              grade_name: "",
              wechat: "",
              qq: "",
              weibo: "",
              mobilePhone: "",
              role: 0,
              trust: 1,
              available: 1,
              birthday: "",
              height: "",
              weight: "",
              hometown: "",
              signature: "哈哈，我是表白君。您匿名发表表白的时候将以我的名义发表哒！",
              character: "",
              hobby: "",
              love_history: "",
              love_selecting: "",
              age: "",
              constellation: "",
              if_my_praise: 0,
              inMyBlackList: 0
            },
            {
              id: 3,
              praise_nums: 0,
              nickname: "小宝宝",
              avatarUrl: "http://cdn.collhome.com/love.png",
              gender: "",
              gender_name: "",
              pictures: [],
              province: "",
              city: "",
              country: "中国",
              realname: "福大君",
              college: 1,
              college_name: "福州大学",
              major: "",
              grade: "",
              grade_name: "",
              wechat: "",
              qq: "",
              weibo: "",
              mobilePhone: "",
              role: 1,
              trust: 1,
              available: 1,
              birthday: "",
              height: "",
              weight: "",
              hometown: "",
              signature: "哈哈，我是表白君。您匿名发表表白的时候将以我的名义发表哒！",
              character: "",
              hobby: "",
              love_history: "",
              love_selecting: "",
              age: "",
              constellation: "",
              if_my_praise: 0,
              inMyBlackList: 0
            },
          ]
        }]);
      });
    });



    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let { page, name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

  }
};