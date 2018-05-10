"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
// import { BASE_URL } from '../config'
// TO DO CONFIG BASE URL
// TO DO ADD TYPES
const instance = axios_1.default.create({
    baseURL: 'https://localhost:8000/api/v1/',
    timeout: 10000,
});
exports.auth = {
    loginTwitch() {
        return instance.post('auth/twitch');
    },
    loginStreamlabs() {
        return instance.post('auth/streamlabs');
    },
};
exports.user = {
    updateUser(data) {
        return instance.post('user/updateUser', data);
    },
    deleteUser() {
        return instance.post('user/deleteUser');
    },
};
//# sourceMappingURL=ApiUtils.js.map