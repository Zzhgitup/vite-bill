import React, { memo } from "react";
import { FC, ReactNode } from "react";
interface Props {
  children?: ReactNode;
}
const User: FC<Props> = () => {
  return <div>用户信息</div>;
};
export default memo(User);
