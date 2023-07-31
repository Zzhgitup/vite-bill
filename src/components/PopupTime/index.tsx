import dayjs from "dayjs";
import React, {
  memo,
  FC,
  ReactNode,
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import "./style.less";
import { DatetimePicker, Popup } from "react-vant";
interface Props {
  children?: ReactNode;
  getTime: (item: Date) => void;
  Timetype?:
    | "date"
    | "time"
    | "datetime"
    | "datehour"
    | "month-day"
    | "year-month";
}
export interface Poptime {
  showPop: () => Promise<void>;
  closePop: () => Promise<void>;
  currenttime: Date;
}
const PopupTime = forwardRef<Poptime, Props>((props, ref) => {
  console.log("Poptime被渲染");
  const { getTime, Timetype = "year-month" } = props;
  const [show, setShow] = useState(false);
  const [seleteTime, setTime] = useState(new Date()); //初始化时间
  useEffect(() => {
    getTime(seleteTime);
  }, [seleteTime]);
  useImperativeHandle(ref, () => {
    return {
      async showPop() {
        setShow(true);
      },
      async closePop() {
        setShow(false);
      },
      currenttime: seleteTime,
    };
  });
  const CommitDate = (e: Date) => {
    setTime(e);
  };
  return (
    <div>
      <Popup
        visible={show}
        style={{ height: "40%" }}
        closeable
        className="PopTime"
        position="bottom"
        onClose={() => setShow(false)}
        title="请选择类型"
      >
        <div className="Poptimeselsete">
          <DatetimePicker
            type={Timetype}
            minDate={new Date(2020, 0, 1)}
            maxDate={new Date()}
            defaultValue={new Date()}
            value={dayjs(seleteTime).toDate()}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onConfirm={CommitDate}
            formatter={(type: string, val: string) => {
              if (type === "year") {
                return `${val}年`;
              }
              if (type === "month") {
                return `${val}月`;
              }
              return val;
            }}
          />
        </div>
      </Popup>
    </div>
  );
});
export default memo(PopupTime);
