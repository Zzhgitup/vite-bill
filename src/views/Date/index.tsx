import React, {
  ElementRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as echarts from "echarts";
import { FC, ReactNode } from "react";
import "./style.less";
import PopupTime from "@/components/PopupTime";
import { getbilldate } from "./server";
import dayjs from "dayjs";
import { Datetype } from "@/utils/type";
import { Empty, Progress } from "react-vant";
import { typebill } from "@/utils/billtype";
interface Props {
  children?: ReactNode;
}
const Datecharts: FC<Props> = () => {
  const Datetime = useRef<ElementRef<typeof PopupTime>>(null);
  const [seletetype, setseletetype] = useState(1); //类型选择
  const [totalincome, settotalincome] = useState(0); //总收入
  const [totalexpnese, settotalexpense] = useState(0); //总支出
  const [currentTime, setTime] = useState(new Date()); //时间
  const [bintustate, setbinstate] = useState(1); //饼图数据类型
  const [income, setincome] = useState([
    {
      type_id: 4,
      type_name: "日用",
      pay_type: 1,
      number: 23,
    },
  ]);
  const [expense, setexpense] = useState([
    {
      type_id: 4,
      type_name: "日用",
      pay_type: 1,
      number: 23,
    },
  ]);
  const getTime = useCallback((val: Date) => {
    setTime(val);
    Datetime.current?.closePop(); //关闭弹窗
  }, []);
  useEffect(() => {
    fetchdate();
  }, [currentTime]);
  useEffect(() => {
    const myChart = echarts.init(document.getElementById("penimg"));
    myChart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      // 图例
      legend: {
        data:
          bintustate == 1
            ? expense.map((item) => item.type_name)
            : income.map((item) => item.type_name),
      },
      series: [
        {
          name: "支出",
          type: "pie",
          radius: "55%",
          data:
            bintustate == 1
              ? expense.map((item) => {
                  return {
                    value: item.number,
                    name: item.type_name,
                  };
                })
              : income.map((item) => {
                  return {
                    value: item.number,
                    name: item.type_name,
                  };
                }),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
    return () => {
      myChart.dispose();
    };
  }, [bintustate, currentTime, income, expense]);
  async function fetchdate() {
    const { data }: { data: Datetype } = await getbilldate(currentTime);
    settotalincome(Number(data.total_income));
    settotalexpense(Number(data.total_expense));
    setexpense(() => {
      return data.total_data.filter((item) => {
        return item.pay_type == 1;
      });
    });
    setincome(() => {
      return data.total_data.filter((item) => {
        return item.pay_type == 2;
      });
    });
  }
  const percentage = (monery: number) => {
    if (seletetype == 1) {
      console.log(totalexpnese);
      return ((monery / totalexpnese) * 100).toFixed(2);
    } else {
      return ((monery / totalincome) * 100).toFixed(2);
    }
  };
  const changeselete = (flag: boolean) => {
    setseletetype(() => {
      return flag ? 2 : 1;
    });
  };
  const changebintu = (flag: boolean) => {
    setbinstate(() => {
      return flag ? 2 : 1;
    });
  };
  return (
    <div className="Date">
      <div className="Header">
        <div className="time" onClick={Datetime.current?.showPop}>
          <span className="date">
            {dayjs(currentTime).format("YYYY-MM")} |{" "}
          </span>
          <span className="iconfont icon-calendar"></span>
        </div>
        <div className="totalmonery">
          <p>共支出</p>
          <p>￥{totalexpnese}</p>
          <p>共收入￥{totalincome}</p>
        </div>
      </div>
      <div className="Datedisplay">
        <div className="displaybutton">
          <span style={{ fontSize: "18px" }}>收支构成</span>
          <div className="changestate">
            <span
              className={seletetype == 1 ? "active" : ""}
              onClick={() => changeselete(false)}
            >
              支出
            </span>
            <span
              className={seletetype == 2 ? "active" : ""}
              onClick={() => changeselete(true)}
            >
              收入
            </span>
          </div>
        </div>
        {(seletetype === 1 ? expense : income).length === 0 ? (
          <Empty description="本月暂无数据" />
        ) : (
          (seletetype === 1 ? expense : income).map((item) => (
            <div key={item.type_id} className="datecontarin">
              <div className="datexijie">
                <div className="datexijie1">
                  <i className={`iconfont ${typebill[item.type_id]}`}></i>
                </div>
                <div className="datexijie2">{item.type_name}</div>
                <div className="datexijie3">
                  ￥{Number(item.number).toFixed(2)}
                </div>
                <div className="datexijie4">
                  <Progress
                    color="rgb(0, 127, 255)"
                    pivotText={false}
                    strokeWidth={14}
                    percentage={percentage(item.number)}
                  />
                </div>
                <div className="datexijie5">{percentage(item.number)}%</div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="datecharts">
        <div className="displaybutton">
          <span style={{ fontSize: "18px" }}>收支构成</span>
          <div className="changestate">
            <span
              className={bintustate == 1 ? "active" : ""}
              onClick={() => changebintu(false)}
            >
              支出
            </span>
            <span
              className={bintustate == 2 ? "active" : ""}
              onClick={() => changebintu(true)}
            >
              收入
            </span>
          </div>
        </div>
        <div id="penimg"></div>
      </div>
      <PopupTime getTime={getTime} ref={Datetime} />
    </div>
  );
};
export default memo(Datecharts);
