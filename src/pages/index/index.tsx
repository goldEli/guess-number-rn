import React, { useCallback, useEffect, useState } from "react";
import { View, Button, ScrollView, Input } from "@tarojs/components";
import { useStorage } from "taro-hooks";
import {
  AtButton,
  AtCard,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInputNumber,
  AtInput
} from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.scss";
import { ILottery } from "./type";
import useOpen from "../../hooks/useOpen";
import { checkWinNum, classnames, getRandomNumbers } from "./utils";
import useRandomNumbers from "./useRandomNumbers";
import SelectNumber from "./SelectNumber/SelectNumber";

const PREFIX = "lottery";

const Index = () => {
  const [list, setList] = useState<ILottery[]>();
  const { isOpened, onOpen, onClose } = useOpen();
  const latestLotteryDrawNum = list?.[0]?.lotteryDrawNum || "";
  const nextLotteryDrawNum = parseInt(latestLotteryDrawNum) + 1 + "";
  const [storageInfo, { set, get, remove }] = useStorage();

  const myNumberList = Object.entries(
    storageInfo.storage
  ).filter(([key, value]) => key.startsWith(PREFIX));

  console.log(myNumberList);

  return (
    <View className="wrapper">
      <View className="btn-box">
        <SelectNumber />
      </View>

      <ScrollView>
        {myNumberList?.map(item => {
          const lotteryDrawNum = item[0]?.split("-")[1];
          const cur = list?.find(
            item => item.lotteryDrawNum === lotteryDrawNum
          );

          const lotteryDrawTime = cur?.lotteryDrawTime;
          const lotteryDrawResult = cur?.lotteryDrawResult;
          const lotteryDrawResultArr = lotteryDrawResult
            ?.split(" ")
            .filter(item => !!item)
            ?.map(item => parseInt(item));
          return (
            <AtCard
              extra={lotteryDrawTime}
              title={lotteryDrawNum}
              note={lotteryDrawResult}
            >
              {item[1]?.map(str => {
                const nums = str.split("-")?.map(item => parseInt(item));
                return (
                  <View className="ball-box">
                    {nums?.map((num, index) => {
                      const classes = classnames("ball", {
                        "ball--active": checkWinNum(
                          lotteryDrawResultArr,
                          nums,
                          index
                        )
                      });
                      return <View className={classes}>{num}</View>;
                    })}
                  </View>
                );
              })}
            </AtCard>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Index;
