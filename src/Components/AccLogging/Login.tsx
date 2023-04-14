import AutoModeIcon from "@mui/icons-material/AutoMode";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorHandle = ({ error }: { error: string }) => {
  return (
    <span className="bg-red-100 w-full text-red-800 text-lg  font-medium inline-flex items-center px-2.5 py-2 rounded dark:bg-red-700 dark:text-red-400 border border-red-400">
      {error || "There's an Error occured"}
    </span>
  );
};

function Login() {
  //TODO navigate
  const navigate = useNavigate();

  //TODO state
  const [isLogging, setIsLogging] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isError, setIsError] = useState(false);
  const countRef = useRef<HTMLParagraphElement>(null);
  //? Login state
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const createData = () => {
    return {
      userName: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
  };
  const handleLoginUser = ({
    data,
  }: {
    data: ReturnType<typeof createData>;
  }) => {
    setIsLogging(true);
    fetch("https://localhost:44379/api/User/Login", {
      headers: {
        accept: "*/*",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    })
      .then((response) => {
        //get status code
        if (response.status === 200) {
          setIsLoggedin(true);
        } else {
          setIsError(true);
        }
      })
      .catch((err) => {
        setIsLoggedin(false);
      })
      .finally(() => {
        setIsLogging(false);
      });
  };

  if (isLoggedin) {
    setTimeout(() => {
      navigate("/");
    }, 3000);
    return (
      <div className="text-3xl p-10 text-emerald-600">
        Successfully login {createData().userName} <br />
        Chuyển trang trong <p ref={countRef}>3 giây</p>
      </div>
    );
  }

  return (
    <form action="" method="POST" className="form" id="form-2">
      <div className="form-group">
        <span className="py-5 text-xl">
          {isError && <ErrorHandle error="Tài khoản đăng nhập không đúng!" />}
        </span>
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
          // console.log(createData());

          handleLoginUser({
            data: createData(),
          });
        }}
        className="form-submit text-lg font-light"
      >
        {isLogging ? (
          <AutoModeIcon fontSize="inherit" className="animate-spin" />
        ) : (
          "Đăng Nhập"
        )}
      </button>
    </form>
  );
}
export default Login;
