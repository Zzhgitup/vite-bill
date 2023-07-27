import React, { memo } from "react";
import { FC, ReactNode } from "react";
interface Props {
  children?: ReactNode;
}
const About: FC<Props> = () => {
  return <div>About</div>;
};
export default memo(About);
