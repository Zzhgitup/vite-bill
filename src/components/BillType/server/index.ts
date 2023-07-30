import { Hyrequire } from "@/server";
export function getBilltype() {
  return Hyrequire.get({
    url: "/api/gettype/list",
  });
}
