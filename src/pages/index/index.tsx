import React, { createContext } from "react";
import { View, Button, ScrollView } from "@tarojs/components";
import { useStorage } from "taro-hooks";

import Taro from "@tarojs/taro";
import "./index.scss";

import { SafeAreaView } from "@components";
import { TTicketType } from "@src/type";
import LotteryList from "./LotteryList";
import { removeAction } from "taro-hooks/dist/useStorage";

const PREFIX = "key";
export interface IListItem {
  id: string;
  list: number[];
  num: string;
  type: TTicketType;
}
export const IndexContext = createContext<{
  remove?: removeAction;
  refreshStorage?: () => void
}>({});
const Index = () => {
  const [storageInfo, { remove }] = useStorage();

  const myNumberList = Object.entries(storageInfo.storage)
    .filter(([key, value]) => key.startsWith(PREFIX))
    .map(([_, data]) => {
      return data;
    }) as IListItem[];

  const lotteryList = myNumberList.filter(item => item.type === "lottery");
  const doubleColorList = myNumberList.filter(
    item => item.type === "doubleColor"
  );

  const refreshStorage = () => {
    remove("123123");
  };

  const BtnBox = (
    <View className="index-btn-box">
      <Button className="index-btn-box-item" onClick={refreshStorage}>
        refresh
      </Button>
      <Button
        className="index-btn-box-item"
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/select-number/index"
          });
        }}
        type="primary"
      >
        select
      </Button>
      <Button
        className="index-btn-box-item"
        type="warn"
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/log/index"
          });
        }}
      >
        log
      </Button>
    </View>
  );

  return (
    <SafeAreaView className="index">
      <IndexContext.Provider value={{ remove, refreshStorage }}>
        <ScrollView scrollY enableBackToTop className="index-scroll-content">
          {BtnBox}
          <View className="index-list-box">
            <View className="index-list-box-title">Lottery</View>
            <LotteryList data={lotteryList} />
            <View className="index-list-box-title">Double Color</View>
            <LotteryList data={doubleColorList} />
          </View>
        </ScrollView>
      </IndexContext.Provider>
    </SafeAreaView>
  );
};

export default Index;
