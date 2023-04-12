import { useRef, useState } from "react";

function Login() {
  //TODO state
  const [isLoggedin, setIsLoggedin] = useState(false);
  const countRef = useRef<HTMLParagraphElement>(null);
  //? Login state
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const createData = {
    userName: usernameRef.current?.value || "",
    password: passwordRef.current?.value || "",
  };
  const handleLoginUser = ({ data }: { data: typeof createData }) => {
    fetch("https://localhost:44379/api/User/Login", {
      headers: {
        accept: "*/*",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    })
      .then((response) => {
        setIsLoggedin(true);
      })
      .catch((err) => {
        setIsLoggedin(false);
      });
  };

  if (isLoggedin) {
    const interval = setInterval(() => {
      if (countRef.current) {
        if (Number(countRef.current.innerText) <= 0) {
          window.open("/");
          return;
        }
        countRef.current.innerText = String(
          Number(countRef.current?.innerText) - 1
        );
      }
    }, 1500);
    return (
      <div className="text-3xl p-10 text-emerald-600">
        Successfully login {createData.userName} <br />
        Chuyển trang trong <p ref={countRef}>3</p>
      </div>
    );
  }
  return (
    <form action="" method="POST" className="form" id="form-2">
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          ref={usernameRef}
          id="email_dn"
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
          id="password_dn"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleLoginUser({
            data: createData,
          });
        }}
        className="form-submit"
      >
        Đăng Nhập
      </button>
    </form>
  );
}

export default Login;
