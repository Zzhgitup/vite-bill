import { Hyrequire } from "@/server";
/**
 *
 * @param date 日期
 * @param page 页数
 * @param page_size 每页大小
 * @param type_id 支出或者收入
 * @returns 账单数据
 */
export function getbilllist(
  date: string,
  page: number,
  page_size: number,
  type_id: string
) {
  return Hyrequire.get({
    url: "/api/bill/list",
    params: {
      date,
      page,
      page_size,
      type_id,
    },
  });
}
