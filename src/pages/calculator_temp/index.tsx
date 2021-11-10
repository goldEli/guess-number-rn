/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2020-12-09 13:42:01
 * @Last Modified by: qiuz
 */

import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";
import { SafeAreaView } from "@components";

// import Index from "../index";

export default class HouseLoanCompute extends Component<any, any> {
  render() {
    return (
      <SafeAreaView className="calculator">
        <Button
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/calculator/select-number/index"
            });
          }}
          type="primary"
        >
          calculator
        </Button>

        {/* <Index /> */}
        {/* <View>123</View> */}
      </SafeAreaView>
    );
  }
}
