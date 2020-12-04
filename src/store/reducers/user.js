import Taro from "@tarojs/taro";

import { USER_SAVE, USER_GET } from "../constants/user";

const INITIAL_STATE = {
  user: null,
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_SAVE:
      // 保存用户信息在redux里面，同时保存在本地
      const { user } = action.preload;
      Taro.setStorageSync("user_info", user);
      return {
        ...state,
        user: {
          ...user,
        },
      };
    case USER_GET:
      // 第一次进来的时候，发送action，获取用户信息，保存在redux里面
      const userInfo = Taro.getStorageSync("user_info");
      return {
        ...state,
        user: {
          ...userInfo,
        },
      };
    default:
      return state;
  }
}
