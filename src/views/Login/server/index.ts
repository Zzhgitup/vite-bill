import { Hyrequire } from "@/server";
export function login(username: string, password: string) {
  return Hyrequire.post({
    url: "/api/user/login",
    data: {
      username,
      password,
    },
  });
}
export function register(username: string, password: string) {
  return Hyrequire.post({
    url: "/api/user/register",
    data: {
      username,
      password,
    },
  });
}
