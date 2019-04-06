const _ = require('lodash');
const webUtil = require('./webUtil');

module.exports = {
    keyToCamel: obj => {
        for (const key of Object.keys(obj)) {
            const newKey = toCamelCase(key);
            if (newKey !== key) {
                obj[newKey] = obj[key];
                delete obj[key];
            }
        }
        return obj;
    },
    convertToSnakeCase: str => {
        return str.replace(/[A-Z]/g, char => {
            return `_${char.toLowerCase()}`;
        });
    },
    wrapService: impl => {
        const container = {};
        _.each(impl, (attrs, name) => {
            container[name] = async (...args) => {
                try {
                    const ret  = await attrs(...args);
                    // 支持返回对象，如果对象中有ErrCode不再包装，没有ErrCode包装为成功
                    if (ret) {
                        if (Object.keys(ret).includes('errCode')) {
                            return ret;
                        } else {
                            return webUtil.getSuccessResp(ret);
                        }
                    } else {
                        return webUtil.getSuccessResp(ret);
                    }
                } catch (err) {
                    console.error(new Date(), err);
                    return webUtil.getServerErrorResp();
                }

            };
        });
        return container;
    }
};

function toCamelCase (str) {
    return str.split('_').map(function (word, index) {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
}
