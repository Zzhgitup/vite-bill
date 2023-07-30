import React, { memo, useEffect, useState } from "react";
import { FC, ReactNode } from "react";
import { BillRoot, Bill } from "@/utils/type";
import dayjs from "dayjs";
import "./style.less";
import { useNavigate } from "react-router-dom";
import { typebill } from "@/utils/billtype";
interface Props {
  children?: ReactNode;
  bill: BillRoot;
}
const Billitem: FC<Props> = (props) => {
  const { bill } = props;
  const [income, setIncome] = useState(0); // 收入
  const [expense, setExpense] = useState(0); // 支出
  const navigateTo = useNavigate(); // 路由实例
  useEffect(() => {
    // 初始化将传入的 bill 内的 bills 数组内数据项，过滤出支出和收入。
    // pay_type：1 为支出；2 为收入
    // 通过 reduce 累加
    const _income = bill.bills
      .filter((i) => i.pay_type == 2)
      .reduce((curr, item) => {
        curr += Number(item.amount);
        return curr;
      }, 0);
    setIncome(_income);
    const _expense = bill.bills
      .filter((i) => i.pay_type == 1)
      .reduce((curr, item) => {
        curr += Number(item.amount);
        return curr;
      }, 0);
    setExpense(_expense);
  }, [bill.bills]);
  function lookbill(bill: Bill) {
    navigateTo("/detile?id=" + bill.id);
    console.log(bill);
  }
  return (
    <div className="Billitem">
      <div className="Header">
        <span className="time">{bill.date}</span>
        <span className="income">
          <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
          <span>¥{income.toFixed(2)}</span>
        </span>
        <span className="expense">
          <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
          <span>¥{expense.toFixed(2)}</span>
        </span>
      </div>
      <div className="Bill">
        {bill.bills.map((item) => {
          return (
            <div key={item.id} className="item" onClick={() => lookbill(item)}>
              <div className="itembillHeader">
                <div className="itembillHeaderLeft">
                  <span
                    className={`iconfont ${
                      item.type_id ? typebill[item.type_id] : "qita"
                    }`}
                  ></span>
                  <span>{item.type_name}</span>
                </div>
                {item.pay_type == 2 ? (
                  <div className="monery" style={{ color: "green" }}>
                    +{Number(item.amount).toFixed(2)}
                  </div>
                ) : (
                  <div className="monery" style={{ color: "red" }}>
                    -{Number(item.amount).toFixed(2)}
                  </div>
                )}
              </div>
              <div className="timeandremark">
                {dayjs(Number(item.date)).format("HH:mm")}{" "}
                {item.remark ? `| ${item.remark}` : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(Billitem);
