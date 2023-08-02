import React, { memo } from "react";
import { FC, ReactNode } from "react";
interface Props {
  children?: ReactNode;
}
const Aboutme: FC<Props> = () => {
  return <div>telpmate</div>;
};
export default memo(Aboutme);
