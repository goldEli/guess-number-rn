import React, { useCallback, useEffect, useState } from "react";
import { View, Button, ScrollView, Input } from "@tarojs/components";
import { useStorage } from "taro-hooks";

import Taro from "@tarojs/taro";
import "./index.scss";

import { checkWinNum, classnames, checkDoubleColorWinNum } from "@src/utils";
import { SafeAreaView } from "@components";
import { TTicketType } from "@src/type";
import { useOfficialDoubleColorList, useOfficialLotteryList } from "@src/api";

const PREFIX = "key";
interface IListItem {
  id: string;
  list: number[];
  num: string;
  type: TTicketType;
}

const Index = () => {
  const [storageInfo, { remove }] = useStorage();
  const officialLotteryList = useOfficialLotteryList();
  const officialDoubleColorList = useOfficialDoubleColorList();

  const myNumberList = Object.entries(storageInfo.storage)
    .filter(([key, value]) => key.startsWith(PREFIX))
    .map(([_, data]) => {
      return data;
    }) as IListItem[];

  const lotteryList = myNumberList.filter(item => item.type === "lottery");
  const doubleColorList = myNumberList.filter(
    item => item.type === "doubleColor"
  );

  const getBoxEle = function(data: IListItem[]) {
    const obj = new Map<string, IListItem[][]>();
    for (let item of data) {
      if (obj[item.num]) {
        obj[item.num].push(item);
      } else {
        obj[item.num] = [item];
      }
    }
    return Object.entries(obj)
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
      .map(([key, item]: [string, IListItem[]]) => {
        const num = item[0]?.num;
        const type = item[0]?.type;
        const data =
          type === "lottery"
            ? officialLotteryList.data
            : officialDoubleColorList.data;
        const current = data?.find(i => i.lotteryDrawNum === num);

        return (
          <View>
            <View id={key}>
              <View className="index-ball-box-title">
                <View>{key}</View>
                <View>{current?.lotteryDrawTime}</View>
                <View>{current?.lotteryDrawResult}</View>
              </View>
              {getListEle(item, current?.lotteryDrawResult)}
            </View>
          </View>
        );
      });
  };

  const getListEle = function(data: IListItem[], lotteryDrawResult?: string) {
    return data?.map(item => {
      return (
        <View key={item.id}>
          <View
            className="index-ball-box"
            onClick={() => {
              Taro.showModal({
                title: "提示",
                content: `是否要删除，第${item.num}, ${item.list.join(" ")}`,
                success: function(res) {
                  if (res.confirm) {
                    remove(item.id);
                  } else if (res.cancel) {
                  }
                }
              });
            }}
          >
            {/* <View>{item.list.join(" ")}</View> */}
            {item.list.map((i, idx) => {
              const type = item.type;
              const lotteryDrawResultArr = lotteryDrawResult
                ?.split(" ")
                .filter(item => !!item)
                ?.map(item => parseInt(item));
              const check =
                type === "lottery" ? checkWinNum : checkDoubleColorWinNum;
              const classes = classnames("index-ball", {
                "index-ball--active": check(
                  lotteryDrawResultArr || [],
                  item.list,
                  idx
                )
              });
              return <View className={classes}>{i}</View>;
            })}
          </View>
        </View>
      );
    });
  };
  return (
    <ScrollView>
      <SafeAreaView className="index">
        <View className="index-btn-box">
          <Button
            onClick={() => {
              remove("123123");
            }}
          >
            refresh
          </Button>
          <Button
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/select-number/index"
              });
            }}
            type="primary"
          >
            select
          </Button>
        </View>

        {/* <ScrollView> */}
        <View className="index-list-box">
          <View className="index-list-box-title">Lottery</View>
          <View>{getBoxEle(lotteryList)}</View>
          <View className="index-list-box-title">Double Color</View>
          <View>{getBoxEle(doubleColorList)}</View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Index;
