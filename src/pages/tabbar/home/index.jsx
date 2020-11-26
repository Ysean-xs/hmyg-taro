import React, { Component } from "react";

import Taro from "@tarojs/taro";

import { Swiper, SwiperItem, Navigator, Image } from "@tarojs/components";

import { SWIPER_URL, NAV_URL, FLOOR_URL } from "../../../utils/http";

import "./index.scss";

export default class Home extends Component {
  state = {
    swiperList: [],
    navs: [],
    floorData: [],
  };
  onLoad() {
    // 获取轮播图
    this.getSwiperList();
    // 获取 nav导航栏的数据
    this.getNaviData();
    // 获取楼层去数据
    this.getFloorData();
  }
  /**
   * 获取楼层区数据
   */
  async getFloorData() {
    const result = await Taro.request({
      url: FLOOR_URL,
    });
    if (!result) return;
    this.setState({
      floorData: [...result],
    });
  }
  /**
   * 获取nav数据
   */
  async getNaviData() {
    const result = await Taro.request({
      url: NAV_URL,
    });
    if (!result) return;
    this.setState({
      navs: [...result],
    });
  }
  /**
   * 获取轮播图数据
   */
  async getSwiperList() {
    const result = await Taro.request({
      url: SWIPER_URL,
    });
    // 如果请求错误，那么result值为null
    if (!result) return;
    this.setState({
      swiperList: [...result],
    });
  }
  renderSwiper() {
    return this.state.swiperList.map((item) => {
      return (
        <SwiperItem>
          <Navigator url={item.navigator_url} open-type={item.open_type}>
            <Image src={item.image_src} />
          </Navigator>
        </SwiperItem>
      );
    });
  }
  /**
   * 渲染 navs
   */
  renderNavs() {
    return this.state.navs.map((item) => {
      return (
        <view className="item">
          {item.navigator_url
            ? this.renderNavsUrl(item)
            : this.renderNavsPlain(item)}
        </view>
      );
    });
  }
  /**
   * 渲染携带url的
   */
  renderNavsUrl(item) {
    return (
      <Navigator
        className="item-navs"
        url={item.navigator_url}
        open-type={item.open_type}
      >
        <Image src={item.image_src} />
      </Navigator>
    );
  }
  /**
   * 不携带url的
   * @param {*} item
   */
  renderNavsPlain(item) {
    return (
      <view className="item-navs">
        <Image className="item-navs" src={item.image_src} />
      </view>
    );
  }
  /**
   * 渲染楼层区
   */
  renderFloorList() {
    return this.state.floorData.map((item) => {
      return (
        <>
          <Image
            className="floor-title"
            src={item.floor_title.image_src}
          ></Image>
          <view className="content">
            <Navigator
              url={item.product_list[0].navigator_url}
              open-type={item.product_list[0].open_type}
            >
              <Image
                src={item.product_list[0].image_src}
                mode="widthFix"
                style={{ width: `${item.product_list[0].image_width}rpx` }}
              ></Image>
            </Navigator>

            <view className="right-img-box">
              {this.renderFloorRightContainer(item)}
            </view>
          </view>
        </>
      );
    });
  }
  /**
   * 渲染楼层去内容区域
   * @param {*} item
   */
  renderFloorRightContainer(item) {
    return item.product_list.map((item, index) => {
      if (index === 0) return "";
      return (
        <Navigator
          url={item.navigator_url}
          open-type={item.open_type}
        >
          <Image
            src={item.image_src}
            mode="widthFix"
            style={{ width: `${item.image_width}rpx` }}
          ></Image>
        </Navigator>
      );
    });
  }
  render() {
    return (
      <view>
        <Swiper
          circular
          indicatorDots
          autoplay
          indicatorColor="#999"
          indicatorActiveColor="#fff"
        >
          {/* 渲染轮播图 */}
          {this.renderSwiper()}
        </Swiper>

        {/* 渲染navs */}
        <view class="navs">{this.renderNavs()}</view>

        {/* 渲染楼层区 */}
        <view className="floor_list">{this.renderFloorList()}</view>
      </view>
    );
  }
}