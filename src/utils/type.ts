/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BillRoot {
  bills: Bill[];
  date: string;
}
export interface resRoot {
  totalExpense: string;
  totalIncome: string;
  totalPage: number;
  list: any[];
}
export interface Bill {
  amount: string; //总价
  date: string; //日期
  id: number; //ID
  pay_type: number; //支付类型
  remark?: string; //备注
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type_id: any; //类型ID
  type_name: string; //类型昵称
}
