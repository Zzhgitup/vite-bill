import { Hyrequire } from "@/server";
export function addBill(obj: any) {
  return Hyrequire.post({
    url: "/api/bill/add",
    data: {
      ...obj,
    },
  });
}
export function billedit(obj: any) {
  return Hyrequire.post({
    url: "/api/bill/edit",
    data: {
      ...obj,
    },
  });
}
