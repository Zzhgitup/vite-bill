/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  memo,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ReactNode } from "react";
import "./index.less";
import { gettypelist } from "../server";
import { Popup } from "react-vant";
interface Props {
  children?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getitem: (item: any) => void;
}
export interface MyCompoentPopref {
  showPop: () => void;
  closePop: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Popuptype = forwardRef<MyCompoentPopref, Props>((props, ref) => {
  const { getitem } = props;
  const [show, setShow] = useState<boolean>(false); //是否展示
  const [active, setActive] = useState("all"); //激活的type
  const [expense, setexpense] = useState<any>([]); //支出
  const [income, serincome] = useState([]); //收入
  useEffect(() => {
    async function fetchData() {
      const { data } = await gettypelist();
      setexpense(data.filter((i: { type: number }) => i.type == 1));
      serincome(data.filter((i: { type: number }) => i.type == 2));
    }
    fetchData();
  }, []);
  //向外暴露方法
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
  return (
    <div>
      <Popup
        visible={show}
        style={{ height: "auto" }}
        closeable
        className="Poptype"
        position="bottom"
        onClose={() => setShow(false)}
        title="请选择类型"
      >
        <div className="PopTypebox">
          <button
            className={`${"all" == active ? "active" : ""}`}
            onClick={() => {
              getitem({ type: "全部", id: "all" });
              setActive("all");
            }}
          >
            全部类型
          </button>
          <h2>支出</h2>
          <div className="expense">
            {expense.map((item: any) => {
              return (
                <button
                  key={item.id}
                  className={`${item.name == active ? "active" : ""}`}
                  onClick={() => {
                    getitem({ type: item.name, id: item.id });
                    setActive(item.name);
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <h2>收入</h2>
          <div className="expense">
            {income.map((item: any) => {
              return (
                <button
                  key={item.id}
                  className={`${item.name == active}`}
                  onClick={() => {
                    getitem({ type: item.name, id: item.id });
                    setActive(item.name);
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </Popup>
    </div>
  );
});
export default memo(Popuptype);
