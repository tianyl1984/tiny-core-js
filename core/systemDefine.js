module.exports = {
    errorCode: {
        success: -1,
        serverError: 500, // 服务器错误
        loginError: 401, // 无法获取openId，登录失败
        loginInvalid: 402, // 登录失效，需要重新登录
        resourceNotFound: 404 // 请求地址不存在
    }
};
