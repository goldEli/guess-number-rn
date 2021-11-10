export interface IResponse<T> {
  success: boolean;
  value: T;
}

export type TTicketType = "lottery" | "doubleColor";

export interface ILottery {
  /** 中奖号码 "01 02 09 16 30 09 10"*/
  lotteryDrawResult: string;
  /** 期号 */
  lotteryDrawNum: string;
  /** 开奖日期 */
  lotteryDrawTime: string;
  type?: TTicketType;
}

export interface IDoubleColor {
  /**
   * "2021128"
   */
  code: string;
  /**
   * "内蒙古1注,湖南2注,共3注。"
   */
  content: string;
  /**
   * "2021-11-09(二)"
   */
  date: string;
  /**
   * "05,17,20,21,23,33"
   */
  red: string;
  blue: string;
}
