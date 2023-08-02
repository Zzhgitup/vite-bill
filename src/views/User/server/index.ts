import { Hyrequire } from "@/server";
export function getuserinfo() {
  return Hyrequire.get({
    url: "/api/getuserinfo",
  });
}
export function updated(files: any) {
  return Hyrequire.post({
    url: "/api/user/upload",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: files,
  });
}
//修改用户信息
export function editoruser(signature: string, avater: string) {
  return Hyrequire.put({
    url: "/api/user/edituser",
    data: {
      signature,
      avater,
    },
  });
}
//修改密码
export function editorpassword(oldpassword: string, newoldword: string) {
  return Hyrequire.post({
    url: "/api/user/passwordreset",
    data: {
      oldpassword,
      newoldword,
    },
  });
}
