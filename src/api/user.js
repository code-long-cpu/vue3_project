import request from '@/utils/request';

// 注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}

// 登录接口
export const userLoginService = ({ username, password }) => {
  request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}