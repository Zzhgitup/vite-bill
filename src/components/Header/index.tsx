import React, { memo } from "react";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "react-vant";
interface Props {
  children?: ReactNode;
  title?: string;
}
const Header: FC<Props> = (props) => {
  const { title = "账单详情" } = props;
  const navigate = useNavigate();

  return (
    <div>
      <NavBar title={title} leftText="返回" onClickLeft={() => navigate(-1)} />
    </div>
  );
};
export default memo(Header);
