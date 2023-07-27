import React, { memo } from "react";
import { FC, ReactNode } from "react";
import "./style.less";
interface Props {
  children?: ReactNode;
}
const Date: FC<Props> = () => {
  return <div className="Date">统计</div>;
};
export default memo(Date);
