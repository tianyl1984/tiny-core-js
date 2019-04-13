const { exec } = require('child_process');

const impl = {
    pull: async (gitDir) => {
        return new Promise((resolve, reject) => {
            exec('git pull', { cwd: gitDir }, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                if (stderr) {
                    console.log(stderr);
                }
                console.log(stdout);
                resolve();
            });
        });
    },
    addAndPush: async (gitDir) => {
        return new Promise((resolve, reject) => {
            exec('git add . && git commit -m "add file" && git pull && git push', { cwd: gitDir }, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                if (stderr) {
                    console.log(stderr);
                }
                console.log(stdout);
                resolve();
            });
        });
    }
};

module.exports = impl;
