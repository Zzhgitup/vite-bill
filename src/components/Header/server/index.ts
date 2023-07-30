import { Hyrequire } from "@/server";
export function billdetial(id: number) {
  return Hyrequire.get({
    url: "/api/bill/getdetile",
    params: {
      id,
    },
  });
}
export function deletebill(id: number) {
  return Hyrequire.delete({
    url: "/api/bill/delete/",
    params: {
      id,
    },
  });
}
