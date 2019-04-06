const systemDefine = require('../core/systemDefine');
const request = require('request');

module.exports = {
    getErrorResp: (errCode, msg) => {
        return {
            errCode: errCode,
            msg: msg
        };
    },
    getServerErrorResp: () => {
        return {
            errCode: systemDefine.errorCode.serverError,
            msg: '服务器错误'
        };
    },
    getSuccessResp: data => {
        return {
            errCode: systemDefine.errorCode.success,
            data
        };
    },
    request: async (opt) => {
        return new Promise((resolve, reject) => {
            request(opt, (err, resp, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    },
    requestAll: async (opt) => {
        return new Promise((resolve, reject) => {
            request(opt, (err, resp) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                resolve(resp);
            });
        });
    },
};
