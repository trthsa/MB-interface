import React from 'react'

function Register() {
  return (
    <form action="" method="POST" className="form active" id="form-1">
          {/* <!-- Các thẻ input --> */}
          <div className="form-group">
            <label htmlFor="fullname" className="form-label">
              Tên đầy đủ
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="VD: Nguyễn Văn A"
              className="form-control"
            />
            <span className="form-message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
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
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Địa chỉ
            </label>
            <input
              id="address"
              name="address"
              placeholder="Nhập địa chỉ"
              type="text"
              className="form-control"
            />
            <span className="form-message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Giới tính{" "}
            </label>
            <div className="form-group-list">
              <div className="form-group-item">
                <input
                  name="gender"
                  type="radio"
                  value="male"
                  className="form-control"
                />
                <p>Nam</p>
              </div>
              <div className="form-group-item">
                <input
                  name="gender"
                  type="radio"
                  value="femal"
                  className="form-control"
                />
                <p>Nữ</p>
              </div>
              <div className="form-group-item">
                <input
                  name="gender"
                  type="radio"
                  value="orther"
                  className="form-control"
                />
                <p>Khác</p>
              </div>
            </div>
            <span className="form-message"></span>
          </div>
          <button className="form-submit">Đăng ký</button>
        </form>
  )
}

export default Register