import React, { useContext } from "react";
import { View } from "@tarojs/components";
import { IListItem, IndexContext } from "..";
import { checkWinNum, classnames } from "../utils";
import { checkDoubleColorWinNum } from "@src/utils";
import "../index.scss";
import Taro from "@tarojs/taro";

interface IListProps {
  data: IListItem[];
  lotteryDrawResult?: string;
}

const Lottery: React.FC<IListProps> = props => {
  const { data, lotteryDrawResult } = props;
  const { remove } = useContext(IndexContext);
  const onClick = (item: IListItem) => {
    Taro.showModal({
      title: "提示",
      content: `是否要删除，第${item.num}, ${item.list.join(",")}`,
      confirmText: "DELETE",
      cancelText: "COPY",
      success: function(res) {
        if (res.confirm) {
          !!remove && remove(item.id);
        } else if (res.cancel) {
          Taro.navigateTo({
            url: `"/pages/select-number/index"?type=${
              item.type
            }&lotteryNums=${item.list.join(",")}`
          });
        }
      }
    });
  };
  return (
    <View>
      {data?.map(item => {
        return (
          <View key={item.id}>
            <View className="index-ball-box" onClick={() => onClick(item)}>
              {item?.list?.map((i, idx) => {
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
                return (
                  <View key={idx} className={classes}>
                    {i}
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Lottery;
