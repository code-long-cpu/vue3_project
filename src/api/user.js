import request from '@/utils/request';

// ①注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}
// export const userRegisterService = ({ username, password, repassword }) =>
//   request.post('/api/reg', { username, password, repassword })

// ②登录接口
export const userLoginService = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
// export const userLoginService = ({ username, password }) =>
//   request.post('api/login', { username, password })

// ③获取用户基本信息
export const userGetInfoService = () => {
  return request({
    url: '/my/userinfo',
    method: 'GET',
    // token参数直接在config中配置了
  })
}

// 更新用户的基本信息
export const userSetInforService = ({
  id,
  nickname,
  email
}) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      nickname,
      email
    }
  })
}

// 更新用户头像
export const setUserAvatarService = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

// 修改密码
export const userSetPwdService = ({
  old_pwd,
  new_pwd,
  re_pwd
}) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}