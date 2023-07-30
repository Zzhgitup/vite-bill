import React, {
  memo,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FC, ReactNode } from "react";
import "./style.less";
import { getBilltype } from "./server";
import { typebill } from "@/utils/billtype";
interface Props {
  children?: ReactNode;
  Billselete?: string;
  type_id?: { type_id: number; type_name: string };
}
interface BillTab {
  getbilltype: () => { billtype: number; type_name: string };
}
const Billtype = forwardRef<BillTab, Props>((props, ref) => {
  const { Billselete = "支出", type_id = -1 } = props;
  const [billtype, setBilltype] = useState(2); //账单类型
  const [type_name, settpe_name] = useState("餐饮");
  const [income, setincome] = useState([]);
  const [expense, setexpense] = useState([]);
  useImperativeHandle(ref, () => {
    return {
      getbilltype(): any {
        return { billtype, type_name };
      },
    };
  });
  useEffect(() => {
    if (type_id != -1) {
      setBilltype(type_id.type_id);
      settpe_name(type_id.type_name);
    }
    const fetchdate = async () => {
      return await getBilltype();
    };
    fetchdate().then((res) => {
      setincome(
        res.data.filter((item: any) => {
          return item.type == 2;
        })
      );
      setexpense(
        res.data.filter((item: any) => {
          return item.type == 1;
        })
      );
    });
    console.log(income);
  }, []);
  const changebilltype = (type: number, type_name: string) => {
    setBilltype(type);
    settpe_name(type_name);
  };
  return (
    <div className="Billtype">
      <div className="billselete">
        {Billselete == "支出"
          ? expense.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="Bilstyleitem"
                  onClick={() => {
                    changebilltype(item.id, item.name);
                  }}
                >
                  <span
                    className={`billicon ${
                      billtype == item.id ? "active1" : ""
                    }`}
                  >
                    <i className={`iconfont ${typebill[item.id]} `}></i>
                  </span>
                  <span className="Billname">{item.name}</span>
                </div>
              );
            })
          : income.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="Bilstyleitem"
                  onClick={() => {
                    changebilltype(item.id, item.name);
                  }}
                >
                  <span
                    className={`billicon ${
                      billtype == item.id ? "active1" : ""
                    }`}
                  >
                    <i className={`iconfont ${typebill[item.id]}`}></i>
                  </span>
                  <span className="Billname">{item.name}</span>
                </div>
              );
            })}
      </div>
    </div>
  );
});
export default memo(Billtype);
