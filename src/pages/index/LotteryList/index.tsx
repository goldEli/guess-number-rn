import React from "react";
import { View } from "@tarojs/components";
import { IListItem } from "..";
import Lottery from "../Lottery";
import { useOfficialDoubleColorList, useOfficialLotteryList } from "@src/api";
import "../index.scss";

interface ILotteryListProps {
  data: IListItem[];
}

const LotteryList: React.FC<ILotteryListProps> = props => {
  const { data } = props;
  const officialLotteryList = useOfficialLotteryList();
  const officialDoubleColorList = useOfficialDoubleColorList();
  const obj = new Map<string, IListItem[][]>();
  for (let item of data) {
    if (obj[item.num]) {
      obj[item.num].push(item);
    } else {
      obj[item.num] = [item];
    }
  }
  return (
    <View>
      {Object.entries(obj)
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
            <View key={key}>
              <View>
                <View className="index-ball-box-title">
                  <View>{key}</View>
                  <View>{current?.lotteryDrawTime}</View>
                  <View>{current?.lotteryDrawResult}</View>
                </View>
                <Lottery
                  data={item}
                  lotteryDrawResult={current?.lotteryDrawResult}
                />
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default LotteryList;
