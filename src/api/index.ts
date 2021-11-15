import { useQuery } from "react-query";
import { IDoubleColor, ILottery, IResponse } from "../pages/index/type";
import Taro from "@tarojs/taro";
import { logger } from "@src/utils/log";

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
        const data = res.data as {
          dataFrom: string;
          emptyFlag: boolean;
          errorCode: string;
          errorMessage: string;
          success: true;
          value: {
            list: ILottery[];
          };
        };
        logger.add("lottery list errMsg", res?.errMsg);
        logger.add("lottery list errorMessage", data?.errorMessage);
        logger.add("lottery list success", data?.success + "");
        logger.add("lottery list data length", data?.value?.list.length + "");
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
  return new Promise<ILottery[]>((resolve, reject) => {
    Taro.request({
      url: APIS.doubleColorList,
      success: function(res) {
        const data = res.data as {
          Tflag: number;
          countNum: number;
          message: string;
          pageCount: number;
          result: IDoubleColor[];
        };
        logger.add("DoubleColor errMsg", res?.errMsg);
        logger.add("DoubleColor message", data?.message);
        logger.add("DoubleColor list length", data?.result?.length + "");

        const d = data?.result?.map(item => {
          return {
            lotteryDrawNum: item.code,
            lotteryDrawResult: [...item.red.split(","), item.blue].join(" "),
            lotteryDrawTime: item.date,
            type: "doubleColor"
          };
        }) as ILottery[];

        resolve(d);
      }
    });
  });
};

export const useOfficialLotteryList = () => {
  const res = useQuery("getLotteryList", getLotteryList);
  const latestLotteryDrawNum = res.data?.[0]?.lotteryDrawNum || "";
  const nextLotteryDrawNum = parseInt(latestLotteryDrawNum) + 1 + "";

  return {
    ...res,
    latestLotteryDrawNum,
    nextLotteryDrawNum
  };
};

export const useOfficialDoubleColorList = () => {
  const res = useQuery("getDoubleColorList", getDoubleColorList);
  const latestLotteryDrawNum = res.data?.[0]?.lotteryDrawNum || "";
  const nextLotteryDrawNum = parseInt(latestLotteryDrawNum) + 1 + "";

  return {
    ...res,
    latestLotteryDrawNum,
    nextLotteryDrawNum
  };
};
