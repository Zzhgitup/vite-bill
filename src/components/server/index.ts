import { Hyrequire } from "@/server";
export function gettypelist() {
  return Hyrequire.get({
    url: "/api/gettype/list",
  });
}
