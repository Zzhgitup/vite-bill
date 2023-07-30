/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ElementRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.less";
import { ArrowDown } from "@react-vant/icons";
import { Button, Empty, List, Notify, PullRefresh } from "react-vant";
import { getbilllist } from "./server";
import { resRoot } from "@/utils/type";
import BillItem from "@/components/BillItem";
import dayjs from "dayjs";
import Popuptype from "@/components/Popuptype";
import PopupTime from "@/components/PopupTime";
import PopupAddBill from "@/components/PopupAddBill";
interface Props {
  children?: React.ReactNode;
}

const Index: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const typeref = useRef<ElementRef<typeof Popuptype>>(null);
  const Timeref = useRef<ElementRef<typeof PopupTime>>(null);
  const Addbill = useRef<ElementRef<typeof PopupAddBill>>(null);
  const Pulllist = useRef<ElementRef<typeof List>>(null);
  const [totalpage, settotalpage] = useState(0);
  const [list, setList] = useState<Array<any>>([]);
  const [income, setincome] = useState("0");
  const [expense, setexpense] = useState("0");
  const [finished, setFinished] = useState<boolean>(false);
  const [currentTime, setTime] = useState(new Date());
  const [type_id, settype] = useState({ type: "全部类型", id: "all" });
  useEffect(() => {
    getbillinfo();
  }, [page, currentTime, type_id]);
  //数据的获取与设置
  const getbillinfo = async () => {
    const { data }: { data: resRoot } = await getbilllist(
      dayjs(currentTime).format("YYYY-MM"),
      page,
      2,
      type_id.id
    );
    //下拉刷新
    if (page == 1) {
      setList(data.list); //若当前page为1  则替换内容
    } else {
      //使用回调函数，保证数据的最新
      setList((prevList) => prevList.concat(data.list)); //若不是1 则增加新内容
    }
    setincome(data.totalIncome);
    setexpense(data.totalExpense);
    settotalpage(data.totalPage);
    if (page >= data.totalPage) {
      setFinished(true);
      Notify.show({ type: "success", message: "加载完成！臭宝" });
    }
  };
  //上拉加载
  const onLoad = async () => {
    if (page < totalpage) {
      setPage(page + 1);
    }
  };

  //下拉刷新
  const onRefresh = async () => {
    if (page != 1) {
      setPage(1);
      setFinished(false);
    } else {
      getbillinfo();
    }
  };
  //绑定获取标签的函数
  const getTypeInfo = useCallback((typeinfo: { type: string; id: string }) => {
    setFinished(false);
    settype({ type: typeinfo.type, id: typeinfo.id });
    setPage(1);
  }, []);
  const getTime = useCallback((Timeinfo: Date) => {
    setFinished(false);
    setPage(1);
    setTime(Timeinfo);
  }, []);
  const addbillrefresh = useCallback(() => {
    if (page == 1) {
      getbillinfo();
    } else {
      setPage(1);
    }
  }, [page]);
  return (
    <div className="index">
      <div className="header">
        <div className="topCard">
          <div className="Card">
            <span>总收入</span>
            <span className="monery">￥{Number(income).toFixed(2)}</span>
          </div>
          <div className="Card">
            <span>总支出</span>
            <span className="monery">￥{Number(expense).toFixed(2)}</span>
          </div>
        </div>
        <div className="selectformat">
          <button onClick={typeref.current?.showPop}>
            {type_id.type}
            <ArrowDown />
          </button>
          <button onClick={Timeref.current?.showPop}>
            {dayjs(Timeref.current?.currenttime).format("YYYY-MM")}
            <ArrowDown />
          </button>
        </div>
      </div>
      <div className="list">
        <PullRefresh onRefresh={onRefresh} successText="刷新成功">
          {list.length != 0 ? (
            <List
              ref={Pulllist}
              offset={20}
              finished={finished}
              onLoad={onLoad}
            >
              {list.map((_, i) => (
                <BillItem key={i} bill={_} />
              ))}
            </List>
          ) : (
            <Empty description="账单为空" />
          )}
        </PullRefresh>
      </div>
      <Popuptype getitem={getTypeInfo} ref={typeref} />
      <PopupTime getTime={getTime} ref={Timeref} />
      <PopupAddBill ref={Addbill} billrefrsh={addbillrefresh} />
      <button className="recodeBill" onClick={Addbill.current?.showPop}>
        <i className="iconfont icon-icon-test"></i>
      </button>
    </div>
  );
};

export default memo(Index);
