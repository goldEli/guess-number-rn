import { useQuery } from "react-query";
import { IDoubleColor, ILottery, IResponse } from "../pages/index/type";
import Taro from "@tarojs/taro";

const APIS = {
  lotteryList:
    "https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=30&isVerify=1&pageNo=1",
  doubleColorList:
    "http://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice?name=ssq&issueCount=30&issueStart=&issueEnd=&dayStart=&dayEnd="
};

const getLotteryList = async () => {
  return new Promise<ILottery[]>((resolve, reject) => {
    Taro.request({
      url: APIS.lotteryList,
      success: function(res) {
        // console.log(res.data);
        const data = res.data as IResponse<{
          list: ILottery[];
        }>;
        if (data.success) {
          resolve(
            data.value.list.map(item => {
              return {
                ...item,
                type: "lottery"
              };
            })
          );
        }
      }
    });
  });
};

const getDoubleColorList = () => {
  console.log("getDoubleColorList");
  return new Promise<ILottery[]>((resolve, reject) => {
    console.log("getDoubleColorList");
    Taro.request({
      url: APIS.doubleColorList,
      success: function(res) {
        console.log(123, res.data);
        const data = res.data as IResponse<{
          result: IDoubleColor[];
        }>;
        console.log(111, data)
        if (data.success) {
          const d = data?.value?.result?.map(item => {
            return {
              lotteryDrawNum: item.code,
              lotteryDrawResult: [...item.red.split(","), item.blue].join(" "),
              lotteryDrawTime: item.date,
              type: "doubleColor"
            };
          }) as ILottery[];
          
          resolve(d);
        }
      }
    });
  });
};

export const useOfficialLotteryList = () => {
  const res = useQuery([APIS.lotteryList], getLotteryList);
  const latestLotteryDrawNum = res.data?.[0]?.lotteryDrawNum || "";
  const nextLotteryDrawNum = parseInt(latestLotteryDrawNum) + 1 + "";
  return {
    ...res,
    latestLotteryDrawNum,
    nextLotteryDrawNum
  };
};

export const useOfficialDoubleColorList = () => {
  const res = useQuery([APIS.doubleColorList], getDoubleColorList);
  const latestLotteryDrawNum = res.data?.[0]?.lotteryDrawNum || "";
  const nextLotteryDrawNum = parseInt(latestLotteryDrawNum) + 1 + "";
  console.log("useOfficialDoubleColorList", res)
  return {
    ...res,
    latestLotteryDrawNum,
    nextLotteryDrawNum
  };
};
