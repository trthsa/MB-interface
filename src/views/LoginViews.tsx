import { useState } from "react";

import Login from "../components/AccLogging/Login";
import Register from "../components/AccLogging/Register";
import { HungStyle } from "../style/style_login_Hung";
enum AccLoggingType {
  LOGIN,
  REGISTER,
}

function LoginViews() {
  const [state, setState] = useState<AccLoggingType>(AccLoggingType.LOGIN);
  return (
    <div className="main">
      <style>{HungStyle}</style>
      <div className="form_dn_dk scale-[90%]">
        <HeaderData state={state} setter={setState} />
        {state === AccLoggingType.REGISTER ? <Register /> : <Login />}
      </div>
    </div>
  );
}

const HeaderData = ({
  setter,
  state,
}: {
  setter: (value: any) => void;
  state: AccLoggingType;
}) => {
  return (
    <div className="">
      <div className="form_logo">
        <div
          className="logo_plane"
          style={{ backgroundImage: `url('assets/img/maybay.svg')` }}
        >
          <div
            className="logo_plane--wings"
            style={{ backgroundImage: `url('assets/img/canh.svg')` }}
          ></div>
        </div>
      </div>
      {/* <!-- Description --> */}
      <p className={`desc ${state === AccLoggingType.LOGIN && "active"}`}>
        <span>Tạo tài khoản</span>
        <br />
        <p className="text-sm">
          Bằng cách nhấp vào nút "Đăng ký" bên dưới, điều đó chứng tỏ rằng Khách
          hàng đã đọc và đồng ý với "Điều khoản và Điều kiện của chúng tôi.❤️
        </p>
      </p>
      <p className={`desc ${state === AccLoggingType.REGISTER && "active"}`}>
        <span>Chào Mừng</span>
        <br />
        <p className="text-sm">
          Đăng nhập vào tài khoản của quý khách. Dùng tài khoản để làm mọi việc
          liên quan đến hệ thống của chúng tôi ❤️
        </p>
      </p>
      {/* <!--  --> */}
      <div className="form_heading">
        <div
          onClick={() => {
            setter(AccLoggingType.LOGIN);
          }}
          className={`form_heading--choose ${
            state === AccLoggingType.LOGIN && "color"
          }`}
        >
          Đăng Nhập
        </div>

        <div
          onClick={() => {
            setter(AccLoggingType.REGISTER);
          }}
          className={`form_heading--choose ${
            state === AccLoggingType.REGISTER && "color"
          }`}
        >
          Đăng ký
        </div>
      </div>
    </div>
  );
};
export default LoginViews;
