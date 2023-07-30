import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { FC, ReactNode, ElementRef } from "react";
import Header from "@/components/Header";
import "./style.less";
import qs from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { billdetial, deletebill } from "@/components/Header/server";
import { Button, Dialog, Notify } from "react-vant";
import { DeleteO, Records } from "@react-vant/icons";
import { typebill } from "@/utils/billtype";
import dayjs from "dayjs";

import PopupAddBill from "@/components/PopupAddBill";
interface Props {
  children?: ReactNode;
}
export interface Ibill {
  id: number;
  pay_type: number;
  amount: string;
  date: string;
  type_id: number;
  type_name: string;
  user_id: number;
  remark: string;
}
const About: FC<Props> = () => {
  const [state, setstate] = useState(1);
  const location = useLocation();
  const nagiter = useNavigate();
  const updatebill = useRef<ElementRef<typeof PopupAddBill>>(null);
  const [billinfo, setbillifo] = useState({
    id: 1,
    pay_type: 1,
    amount: "",
    date: "",
    type_id: 1,
    type_name: "",
    user_id: 1,
    remark: "",
  });
  useEffect(() => {
    async function fetchdate() {
      const { id } = qs.parse(location.search);
      const { data } = await billdetial(Number(id));
      setbillifo(data);
    }
    fetchdate();
  }, [state]);
  const update = () => {
    setstate(state + 1);
  };
  const deletebill2 = async (id: number) => {
    try {
      const res = await deletebill(id);
      res.code == 200 ? nagiter("/") : Error("删除失败");
      Notify.show({ type: "success", message: "删除成功" });
    } catch (error) {
      Notify.show({ type: "danger", message: "删除失败" });
    }
  };
  //删除
  const Popconfirm = useCallback(() => {
    Dialog.confirm({
      title: `删除${billinfo.type_name}账单`,
      message: "确定删除吗",
    })
      .then(() => {
        deletebill2(billinfo.id);
      })
      .catch(() => {
        console.log("取消删除");
      });
  }, [billinfo]);
  return (
    <div className="billdetial">
      <Header title="账单详情" />
      <div className="detialinfo">
        <header>
          <p>
            <i className={`iconfont ${typebill[billinfo.type_id]}`}></i>{" "}
            {billinfo.type_name}
          </p>
          <p>
            <h2
              style={
                billinfo.pay_type == 1 ? {} : { color: "rgb(199,154,102)" }
              }
            >
              {billinfo.pay_type == 1
                ? `-${billinfo.amount}`
                : `+${billinfo.amount}`}
            </h2>
          </p>
        </header>
        <div className="detialinfoline">
          <div className="detiallabel">
            <div className="detialtime">记录时间</div>
            <span id="recoretime">
              {dayjs(Number(billinfo.date)).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
          <div className="detiallabel">
            <div className="detialtime">备注</div>
            <span id="recoretime">{billinfo.remark}</span>
          </div>
        </div>
        <div>
          <div className="idter">
            <Button
              icon={<DeleteO />}
              iconPosition="left"
              type="danger"
              size="small"
              onClick={Popconfirm}
            >
              删除
            </Button>
            <Button
              icon={<Records />}
              iconPosition="left"
              type="primary"
              size="small"
              onClick={updatebill.current?.showPop}
            >
              编辑
            </Button>
          </div>
        </div>
      </div>
      <PopupAddBill ref={updatebill} billrefrsh={update} detial={billinfo} />
    </div>
  );
};
export default memo(About);
