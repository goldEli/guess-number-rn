import React, { useState } from "react";
import { Button, Picker, View } from "@tarojs/components";
import {
  AtButton,
  AtInput,
  AtList,
  AtListItem,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader
} from "taro-ui";
import useOpen from "../../../hooks/useOpen";
import { useStorage } from "taro-hooks";
import { useOfficialDoubleColorList, useOfficialLotteryList } from "../../../api";
import useRandomNumbers from "../useRandomNumbers";
import { getRandomId } from "../utils";
import { TTicketType } from "../type";

interface ISelectNumberProps {}
const PREFIX = "key";
const range = ['lottery', 'doubleColor'];

const SelectNumber: React.FC<ISelectNumberProps> = props => {
  const { isOpened, onOpen, onClose } = useOpen();
  const [storageInfo, { set, get, remove }] = useStorage();
  const officialLotteryList = useOfficialLotteryList();
	const officialDoubleColorList = useOfficialDoubleColorList();

	
  
  const [ticketType, setTicketType] = useState<TTicketType>("lottery");
	const { randomNumbers, setRandomNumbers } = useRandomNumbers(ticketType);

	const nextLotteryDrawNum = ticketType === "doubleColor" ? officialDoubleColorList.latestLotteryDrawNum : officialLotteryList.latestLotteryDrawNum;
  return (
    <>
      <AtButton onClick={onOpen} type="primary">
        Select
      </AtButton>

      <AtModal isOpened={isOpened} closeOnClickOverlay={false}>
        <AtModalHeader>{nextLotteryDrawNum}</AtModalHeader>
        <AtModalContent>
          <Picker
            mode="selector"
            range={range}
            onChange={(e) => {
							const index = e.detail.value;
							setTicketType(range[index]);
						}}
          >
            <AtList>
              <AtListItem
                title="type"
                extraText={ticketType}
              />
            </AtList>
          </Picker>
          <View>
            <AtInput
              name="123"
              onChange={value => {
                setRandomNumbers((value + "")?.split(" "));
              }}
              value={randomNumbers.join(" ")}
            />
          </View>
        </AtModalContent>
        <AtModalAction>
          {" "}
          <Button onClick={onClose}>取消</Button>{" "}
          <Button
            onClick={() => {
              const key = `${PREFIX}-${getRandomId()}`;
              set(key, {
                list: randomNumbers,
                num: nextLotteryDrawNum,
								type: ticketType
              });
              // get(key)
              //   .then(res => {
              //     set(key, [...res, ...data]);
              //   })
              //   .catch(() => {
              //     set(key, [...data]);
              //   });
              onClose();
            }}
          >
            确定
          </Button>{" "}
        </AtModalAction>
      </AtModal>
    </>
  );
};

export default SelectNumber;
