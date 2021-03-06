/*
 * Author：传智教育-黑马程序员长沙校区-前端学科组
 * 轮播图组件
 */
import React from "react";

import { Swiper, SwiperItem, Navigator, Image } from "@tarojs/components";

import "./index.scss";
/**
 * 自定义的组件，属性如下
 * @param {*} id 用于提高性能的，取值对象中id的属性
 * @param {*} items 轮播图数组集合
 * @param {*} url 跳转地址对应的属性名
 * @param {*} img 图片的属性名
 * @param {*} opentype
 * @param {*} height 高度
 */
function HMSwiper(props) {
  const { items, url, img, height, opentype, id } = props;
  if (!items || !items instanceof Array) throw Error("items不合法，必须为数组");
  function renderSwiper() {
    return items.map((item, index) => {
      return (
        <SwiperItem key={id ? item[id] : index}>
          <Navigator url={item[url]} open-type={item[opentype]}>
            <Image src={item[img]} />
          </Navigator>
        </SwiperItem>
      );
    });
  }
  return (
    <Swiper
      circular
      indicatorDots
      autoplay
      indicatorColor="#999"
      indicatorActiveColor="#fff"
      className="swiper"
      style={{ height: height ? height : "330rpx" }}
    >
      {/* 渲染轮播图 */}
      {renderSwiper()}
    </Swiper>
  );
}

export default HMSwiper;
