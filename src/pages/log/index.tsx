import React from "react";
import { View } from "@tarojs/components";
import { logger } from "@src/utils/log";
import "./index.scss";

interface ILogProps {}

const Log: React.FC<ILogProps> = props => {
  const data = logger.get();
  return (
    <View className="log-list">
      {data?.map(([key, value], idx) => {
        return (
          <View key={idx} className="log-list-item">
            <View className="log-list-label">{`${key}: `}</View>
            <View className="log-list-value">{value}</View>
          </View>
        );
      })}
    </View>
  );
};

export default Log;
