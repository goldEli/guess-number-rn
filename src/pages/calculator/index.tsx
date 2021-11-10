/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2020-12-09 13:42:01
 * @Last Modified by: qiuz
 */

import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Text, Input, Video } from "@tarojs/components";
import "./index.scss";
import { SafeAreaView } from "@components";

import Index from "../index";

export default class HouseLoanCompute extends Component<any, any> {
  render() {
    return (
      <SafeAreaView className="calculator">
        <Index />
      </SafeAreaView>
    );
  }
}
