import { Hyrequire } from "@/server";
import dayjs from "dayjs";
export function getbilldate(date: Date) {
  return Hyrequire.get({
    url: "/api/bill/date",
    params: {
      date: dayjs(date).format("YYYY-MM"),
    },
  });
}
