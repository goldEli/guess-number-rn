import React, { useState } from "react";
import { Button, Input, View, Picker } from "@tarojs/components";

import { useStorage } from "taro-hooks";

import { SafeAreaView, StatusBar } from "@components";
import { useOfficialDoubleColorList, useOfficialLotteryList } from "@src/api";
import useRandomNumbers from "../index/useRandomNumbers";
import { TTicketType } from "@src/type";
import { getRandomId } from "@src/utils";
import Taro from "@tarojs/taro";
import "./index.scss"

interface ISelectNumberProps {}
const PREFIX = "key";
const range = ["lottery", "doubleColor"];

const SelectNumber: React.FC<ISelectNumberProps> = props => {
  const [_, { set }] = useStorage();
  const officialLotteryList = useOfficialLotteryList();
  const officialDoubleColorList = useOfficialDoubleColorList();

  const [ticketType, setTicketType] = useState<TTicketType>("lottery");
  const { randomNumbers, setRandomNumbers } = useRandomNumbers(ticketType);

  const nextLotteryDrawNum =
    ticketType === "doubleColor"
      ? officialDoubleColorList.nextLotteryDrawNum
      : officialLotteryList.nextLotteryDrawNum;
  return (
    <SafeAreaView className="select-number">
      <View className="select-number-header">
        <View className="select-number-header-label">{nextLotteryDrawNum}</View>
        <Picker
          mode="selector"
          range={range}
          onChange={e => {
            const index = e.detail.value;
            setTicketType(range[index]);
          }}
        >
          <View style={{ fontSize: 20 }}>{ticketType}</View>
        </Picker>
      </View>

      <View className="select-number-input-box">
        <Input
          name="123"
          style={{ fontSize: 36 }}
          onInput={e => {
            // console.log(e);
            const value = (e.detail.value + "")?.split(" ");
            setRandomNumbers(value);
          }}
          value={randomNumbers.join(" ")}
        />
      </View>
      <View className="select-number-button-box">
        <Button
          style={{width: 300}}
          onClick={() => {
            const key = `${PREFIX}-${getRandomId()}`;
            set(key, {
              list: randomNumbers,
              num: nextLotteryDrawNum,
              type: ticketType,
              id: key
            });
            Taro.showModal({
              title: "提示",
              content: `添加成功`,
              success: () => {
                Taro.navigateBack();
              }
            });
          }}
        >
          确定
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SelectNumber;
