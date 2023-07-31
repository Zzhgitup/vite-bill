import React, {
  memo,
  forwardRef,
  useState,
  useImperativeHandle,
  ElementRef,
  useRef,
  useCallback,
  useEffect,
} from "react";
import "./style.less";
import {
  Input,
  NumberKeyboard,
  Popup,
  Overlay,
  Notify,
  Loading,
} from "react-vant";
import { ReactNode } from "react";
import { addBill, billedit } from "./server";
import PopupTime from "../PopupTime";
import dayjs from "dayjs";
import BillType from "../BillType";
import { Ibill } from "@/views/About";
interface Props {
  children?: ReactNode;
  billrefrsh: () => void;
  detial?: Ibill;
}
interface PopupAddtype {
  showPop: () => void;
  closePop: () => void;
}
const PopuoAddBill = forwardRef<PopupAddtype, Props>((props, ref) => {
  const { billrefrsh, detial } = props;
  const id = detial && detial.id;
  const [show, setShow] = useState(false); //是否展示
  const BillTab = useRef<ElementRef<typeof BillType>>(null); //标签选择
  const [currentTime, setcurrentTime] = useState(new Date()); //时间选择
  const [zhezhao, setzhezhao] = useState(false); //遮罩层
  const [remark, settext] = useState("添加备注"); //备注
  const [monery, setmonery] = useState(""); //钱
  const [remarkshow, setremork] = useState(false); //备注是否展示
  const seleteTime = useRef<ElementRef<typeof PopupTime>>(null); //选择时间弹窗
  const [typeselete, setTtpe] = useState("支出"); //收入支出类型
  useEffect(() => {
    if (id) {
      setmonery(detial.amount); //金额
      setcurrentTime(dayjs(Number(detial.date)).toDate()); //修改时间
      settext(detial.remark); //修改备注
      setTtpe(() => {
        return detial.pay_type == 1 ? "支出" : "收入";
      });
    } else {
      console.log("不是修改");
    }
  }, [detial]);
  useImperativeHandle(ref, () => {
    return {
      showPop() {
        setShow(true);
      },
      closePop() {
        setShow(false);
      },
    };
  });
  const typechange = useCallback((type: string) => {
    setTtpe(type);
  }, []);
  const getTime = useCallback((val: Date) => {
    setcurrentTime(val);
    seleteTime.current?.closePop();
  }, []);
  //输入限制
  const onInput = useCallback(
    (key: string) => {
      console.log(key, "按下的按键");
      let str = monery + key;
      let reg = /^\d+(\.\d{1,2})?$/; //数字开头保留两位小数的数
      let toppoint = /^\./; //匹配由点开头的字符
      if (toppoint.test(str)) {
        //以点开头的字符
        /^\.\d{0,2}$/.test(str) ? setmonery("0" + str) : "";
      } else {
        //正常数字开头
        reg.test(str) || /^\d+(\.\d{0,2})?$/.test(str)
          ? setmonery(str)
          : console.log("不符合规则");
      }
    },
    [monery]
  );
  const onDelete = useCallback(
    () => setmonery(monery.slice(0, monery.length - 1)),
    [monery]
  );
  //收集到 五大力量宝石  开始发送请求
  const commitBill = useCallback(async () => {
    setzhezhao(true);
    try {
      if (!id) {
        const res = await addBill({
          amount: Number(monery).toFixed(2),
          type_id: BillTab.current?.getbilltype().billtype,
          type_name: BillTab.current?.getbilltype().type_name,
          date: dayjs(currentTime).unix() * 1000,
          pay_type: typeselete == "支出" ? 1 : 2,
          remark: remark || "",
        });
        billrefrsh();
        setzhezhao(false);
        setShow(false);

        Notify.show({ type: "success", message: "添加账单成功!" });
      } else {
        const res = await billedit({
          id: id,
          amount: Number(monery).toFixed(2),
          type_id: BillTab.current?.getbilltype().billtype,
          type_name: BillTab.current?.getbilltype().type_name,
          date: dayjs(currentTime).unix() * 1000,
          pay_type: typeselete == "支出" ? 1 : 2,
          remark: remark || "",
        });
        billrefrsh();
        console.log(res);
        setzhezhao(false);
        setShow(false);
        Notify.show({ type: "success", message: "更新账单成功!" });
      }
    } catch (error) {
      Notify.show({ type: "danger", message: "系统错误！" });
    }
  }, [monery, BillTab, currentTime, typeselete, remark]);
  return (
    <div>
      <Popup
        visible={show}
        style={{ height: "auto" }}
        closeable
        className="PopTime"
        position="bottom"
        onClose={() => setShow(false)}
        title="添加账单"
      >
        <div className="Addbill">
          <header className="Addbillheader">
            <button
              onClick={() => typechange("支出")}
              className={typeselete == "支出" ? "active" : ""}
            >
              支出
            </button>
            <button
              onClick={() => typechange("收入")}
              className={typeselete == "收入" ? "active2" : ""}
            >
              收入
            </button>
            <button
              className="timeselete"
              onClick={seleteTime.current?.showPop}
            >
              {dayjs(currentTime).format("YYYY-MM-DD")}
            </button>
          </header>
          <div className="Addbillcontarin">
            <h1>￥{monery}</h1>
          </div>
          <BillType
            Billselete={typeselete}
            ref={BillTab}
            type_id={{
              type_id: detial?.type_id as number,
              type_name: detial?.type_name as string,
            }}
          />
          <div className="Inputtext">
            {remarkshow ? (
              <Input.TextArea
                placeholder="请输入备注信息"
                className="Remarktext"
                style={{ fontSize: "14px" }}
                maxLength={20}
                onBlur={() => setremork(false)}
                onChange={(e) => settext(e)}
                value={remark}
                showWordLimit={({ currentCount }) => (
                  <span>已经输入{currentCount}个字啦 ✍️</span>
                )}
              />
            ) : (
              <span onClick={() => setremork(true)}>{remark}</span>
            )}
          </div>
          <div>
            <NumberKeyboard
              theme="custom"
              extraKey="."
              closeButtonText="完成"
              visible={true}
              onClose={commitBill}
              onInput={onInput}
              onDelete={onDelete}
            />
          </div>
        </div>
      </Popup>
      <PopupTime ref={seleteTime} getTime={getTime} Timetype={"date"} />
      <Overlay
        zIndex={99999999}
        visible={zhezhao}
        onClick={() => setzhezhao(false)}
        children={<Loading />}
      />
    </div>
  );
});
export default memo(PopuoAddBill);
