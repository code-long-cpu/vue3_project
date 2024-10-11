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