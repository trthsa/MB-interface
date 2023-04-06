function LoginViews() {
  return (
    <div className="main">
      <style>{`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        html {
          color: #333;
          font-size: 62.5%;
          font-family: "Open Sans", sans-serif;
        }
        .main {
          background: #f1f1f1;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          background-image: url("https://www.jetstar.com/_/media/Global/Sign-in-and-create-account/createaccount_background.jpeg");
          background-size: cover;
          overflow-y: auto;
        }
        .form_dn_dk {
          width: 460px;
          min-height: 100px;
          text-align: center;
          border-radius: 2px;
          background-color: #fff;
          /* margin: 24px; */
          align-self: center;
          border-radius: 8px;
        }
        .form_logo {
          width: 460px;
          height: 90px;
          margin-top: 24px;
          text-align: center;
        }
        .logo_plane {
          width: 120px;
          height: 130px;
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          top: -20px;
          right: -180px;
        }
        .logo_plane--wings {
          width: 50px;
          height: 60px;
          position: absolute;
          top: 8.5%;
          left: 49.1%;
          background-size: cover;
          background-repeat: no-repeat;
          animation: turnAroundWings 0.5s linear 0s infinite;
        }
        @keyframes turnAroundWings {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -o-transform: rotate(360deg);
          }
        }
        .form {
          width: 460px;
          min-height: 100px;
          padding: 32px 24px;
          text-align: center;
          border-radius: 2px;
          /* margin: 24px; */
          align-self: center;
          border-radius: 8px;
        }
        .form.active {
          display: none;
        }
        .form_heading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
        }
        .form__group-choose.active {
          display: none;
        }
        .form_heading--choose {
          font-size: 2rem;
          cursor: pointer;
          margin: 24px 24px 0px;
        }
        .form_heading--choose.color {
          color: orange;
          border-bottom: 2px solid orange;
        }
        .desc {
          text-align: center;
          color: #636d77;
          font-size: 1.6rem;
          font-weight: lighter;
          line-height: 2.4rem;
          margin: 62px 24px 0 24px;
          font-weight: 300;
        }
        .desc > span {
          font-size: 20px;
          color: #000;
          font-weight: 600;
        }
        .desc.active {
          display: none;
        }

        .form-group {
          display: flex;
          margin-bottom: 16px;
          flex-direction: column;
        }

        .form-label,
        .form-message {
          text-align: left;
        }

        .form-label {
          font-weight: 700;
          padding-bottom: 6px;
          line-height: 1.8rem;
          font-size: 1.4rem;
        }

        .form-control {
          height: 40px;
          padding: 8px 12px;
          border: 1px solid #b3b3b3;
          border-radius: 3px;
          outline: none;
          font-size: 1.4rem;
        }

        .form-control:hover {
          border-color: #1dbfaf;
        }

        .form-group.invalid .form-control {
          border-color: #f33a58;
        }

        .form-group.invalid .form-message {
          color: #f33a58;
        }

        .form-message {
          font-size: 1.2rem;
          line-height: 1.6rem;
          padding: 4px 0 0;
        }

        .form-submit {
          outline: none;
          background-color: #1dbfaf;
          margin-top: 12px;
          padding: 12px 16px;
          font-weight: 600;
          color: #fff;
          border: none;
          width: 100%;
          font-size: 14px;
          border-radius: 8px;
          cursor: pointer;
        }
        .form-submit.active {
          display: none;
        }

        .form-submit:hover {
          background-color: #1ac7b6;
        }

        .spacer {
          margin-top: 36px;
        }
        .form-group-list {
          display: flex;
        }
        .form-group-item {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 10px;
          font-size: 14px;
        }
        .form-group-item input {
          margin-right: 4px;
        }
      `}</style>
      <div className="form_dn_dk">
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
        <p className="desc active">
          <span>Tạo tài khoản</span>
          <br />
          Bằng cách nhấp vào nút "Đăng ký" bên dưới, điều đó chứng tỏ rằng Khách
          hàng đã đọc và đồng ý với "Điều khoản và Điều kiện của chúng tôi.❤️
        </p>
        <p className="desc">
          <span>Chào Mừng</span>
          <br />
          Đăng nhập vào tài khoản của quý khách. Dùng tài khoản để làm mọi việc
          liên quan đến hệ thống của chúng tôi ❤️.
        </p>
        {/* <!--  --> */}
        <div className="form_heading">
          <div className="form_heading--choose color">Đăng Nhập</div>
          <div className="form_heading--choose">Đăng ký</div>
        </div>
        {/* <!-- Đăng ký --> */}
      <Register/>
        {/* <!-- Đăng nhập --> */}
        <form action="" method="POST" className="form" id="form-2">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
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
              id="password_dn"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="form-control"
            />
            <span className="form-message"></span>
          </div>
          <button className="form-submit">Đăng Nhập</button>
        </form>
      </div>
    </div>
  );
}

export default LoginViews;
