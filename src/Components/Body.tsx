import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import SliderProduct from "./Slider/Slider_product";
const Body = () => {
  return (
    <div className="body">
      <div className="container_body_menu">
        <div className="">
          <a href="Shopping">
            <p>Mua sắm</p>
            <i className="fa-solid fa-bag-shopping"></i>
          </a>
        </div>
        <div className="">
          <a href="Shopping">
            <p>Hành lý trả trước</p>
            <i className="fa-solid fa-briefcase"></i>
          </a>
        </div>
        <div className="">
          <a href="Shopping">
            <p>Dịch vụ khác</p>
            <i className="fa-solid fa-bookmark"></i>
          </a>
        </div>
      </div>
      <div className="container_body_menu">
        <div className="">
          <a href="Shopping">
            <p>Quản lý đặt chỗ</p>
            <i className="fa-solid fa-check-to-slot"></i>
          </a>
        </div>
        <div className="">
          <a href="Shopping">
            <p>Làm thủ tục</p>
            <i className="fa-solid fa-clipboard-list"></i>
          </a>
        </div>
        <div className="">
          <a href="Shopping">
            <p>Tra cứu chuyến bay</p>
            <i className="fa-solid fa-plane-up"></i>
          </a>
        </div>
      </div>
      <div className="div_popular_flight">
        <h5>CÁC CHUYẾN BAY PHỔ BIẾN</h5>
      </div>
      <div className="filter_popularflight">
        <div className="">
          <button>
            Chọn tuyến đường <RiArrowDropDownLine />
          </button>
        </div>
        <div className="">
          <button>
            Ngân sách <RiArrowDropDownLine />
          </button>
        </div>
        <div className="">
          <button>Xóa</button>
        </div>
      </div>
      <SliderProduct />
      <div className="div_popular_flight">
        <h5>Khám phá các chuyến bay</h5>
      </div>
    </div>
  );
};
export default Body;
