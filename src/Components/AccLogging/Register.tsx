import React, { useRef, useState } from "react";

function Register() {
  //TODO isSuccess
  const [isSuccess, setSuccess] = useState(false);
  //? Register state
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const createData = {
    id: 0,
    email: emailRef.current?.value || "",
    userName: usernameRef.current?.value || "",
    password: passwordRef.current?.value || "",
  };
  const handleCreateUser = ({ data }: { data: typeof createData }) => {
    fetch("https://localhost:44379/api/User/Register", {
      headers: {
        accept: "*/*",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    })
      .then((response) => {
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
      });
  };

  if (isSuccess) {
    return (
      <div className="text-3xl p-10 text-emerald-600">
        Successfully registered {createData.userName}
      </div>
    );
  }
  return (
    <form action="" method="POST" className="form" id="form-1">
      {/* <!-- Các thẻ input --> */}
      <div className="form-group">
        <label htmlFor="fullname" className="form-label">
          Tên người dùng
        </label>
        <input
          ref={usernameRef}
          id="fullname"
          name="fullname"
          type="text"
          placeholder="VD: MrAn"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="text"
          placeholder="VD: email@domain.com"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Mật khẩu
        </label>
        <input
          ref={passwordRef}
          id="password"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group">
        <label htmlFor="password_confirmation" className="form-label">
          Nhập lại mật khẩu
        </label>
        <input
          id="password_confirmation"
          name="password_confirmation"
          placeholder="Nhập lại mật khẩu"
          type="password"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleCreateUser({
            data: createData,
          });
        }}
        className="form-submit"
      >
        Đăng ký
      </button>
    </form>
  );
}

export default Register;
