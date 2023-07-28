import React, {
  memo,
  forwardRef,
  useState,
  useImperativeHandle,
  ElementRef,
  useRef,
  useCallback,
} from "react";
import "./style.less";
import { Notify, NumberKeyboard, Popup, Toast, hooks } from "react-vant";
import { FC, ReactNode } from "react";
import PopupTime from "../PopupTime";
import dayjs from "dayjs";
interface Props {
  children?: ReactNode;
}
interface PopupAddtype {
  showPop: () => void;
  closePop: () => void;
}
const PopuoAddBill = forwardRef<PopupAddtype, Props>((pros, ref) => {
  const [show, setShow] = useState(false);
  const [currentTime, setcurrentTime] = useState(new Date());
  const [monery, setmonery] = useState("");
  const seleteTime = useRef<ElementRef<typeof PopupTime>>(null);
  const [typeselete, setTtpe] = useState("支出");
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
  const typechange = (type: string) => {
    setTtpe(type);
  };
  const getTime = useCallback((val: Date) => {
    setcurrentTime(val);
    seleteTime.current?.closePop();
  }, []);
  //输入限制
  const onInput = (v: string) => {
    let str = monery + v;
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
  };
  const onDelete = () => setmonery(monery.slice(0, monery.length - 1));
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
          <NumberKeyboard
            theme="custom"
            extraKey="."
            closeButtonText="完成"
            visible={true}
            onInput={onInput}
            onDelete={onDelete}
          />
        </div>
      </Popup>
      <PopupTime ref={seleteTime} getTime={getTime} Timetype={"date"} />
    </div>
  );
});
export default memo(PopuoAddBill);
