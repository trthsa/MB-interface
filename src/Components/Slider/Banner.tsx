import { Dropdown } from 'bootstrap'
import React from 'react'
import {GiCommercialAirplane} from 'react-icons/gi'
import {RiArrowDropDownLine} from 'react-icons/ri'
import {BsPersonFill,BsPlusCircleFill,BsCalendar2Event,BsArrowRightShort} from 'react-icons/bs'
import {CiCircleRemove,CiLocationOn} from 'react-icons/ci'
import {TbMathLower} from 'react-icons/tb'
import {BiSearchAlt} from 'react-icons/bi'


const Banner = () => {
  return (
    <React.Fragment>
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
      <div className='cover'></div>
      <div className="container_searchbar">
        <div className='searchbar'>
            <input className='find-text' placeholder='Search...' type="text"/>
            <button><BiSearchAlt/></button>
        </div>
      </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img src="https://www.jetstar.com/_/media/images/south-east-asia/2023-banners/mps_hp_sin_2023.jpg?w=1590&rc=1&cw=1590&ch=500&cx=197&cy=0&hash=E48F732F71CEEE5C39C83EF987F60F16D8BEF38F" alt="..."/>
            <div className="carousel-caption">
            <a href=''>
              <h3>SINGAPORE</h3>
              <h5>Giá vé ưu đãi trọn gói</h5>
              <div>
              <h5>Từ</h5>
              <h3>1.500.000 VNĐ</h3>
              </div>
              <p>Ví dụ từ TP. Hồ Chí Minh qua Jakatar</p>
              <button>Xem tất cả các khuyến mãi</button>
            </a>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="https://www.jetstar.com/_/media/images/south-east-asia/2023-banners/mps_hp_cgk_2023.jpg?w=1590&rc=1&cw=1590&ch=500&cx=197&cy=0&hash=D965B58521695C4024D7C9CA1964603612267246"  alt="..."/>
            <div className="carousel-caption">
            <a href=''>
              <h3>Hàn Quốc</h3>
              <h5>Giá vé ưu đãi trọn gói</h5>
              <h5>Từ</h5>
              <h3>1.500.000 VNĐ</h3>
              <p>Ví dụ từ TP. Hồ Chí Minh qua Jakatar</p>
              <button>Xem tất cả các khuyến mãi</button>
            </a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://www.jetstar.com/_/media/images/home-page-landing-page/2020_flywell/new/jetx_flywell_hp_final.png?w=1590&rc=1&cw=1590&ch=500&cx=197&cy=0&hash=7C8439F8D0AA2790D627B7123235941BD70A6001"  alt="..."/>
            <div className="carousel-caption">
            <a href=''>
              <h3>Nhật Bản</h3>
              <h5>Giá vé ưu đãi trọn gói</h5>
              <h5>Từ</h5>
              <h3>1.500.000 VNĐ</h3>
              <p>Ví dụ từ TP. Hồ Chí Minh qua Jakatar</p>
              <button>Xem tất cả các khuyến mãi</button>
            </a>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="form_find-fly">
        <h5><GiCommercialAirplane/>Chuyến bay</h5>
        <form action="">
          <div className='container'>
            <div className='dropdown_round_trip'>
              <button className='select_type'>Chọn loại vé <RiArrowDropDownLine/></button>
              <button className='select_type'> Khách hàng <BsPersonFill/></button>
            </div>
            <div className="row input_form_fly">
              <div className="col-12 col-md-5 col-lg-5 div1 text-center"><span>Từ</span> <input /><CiLocationOn /></div>
              <div className="col-12 col-md-5 col-lg-5 div2 text-center"><span>Đến</span> <input /><CiLocationOn /></div>
              <div className="col-12 col-md-5 col-lg-5 div3 text-center"><span>Ngày</span> <input /><BsCalendar2Event /></div>
              <div className="col-12 col-md-5 col-lg-5 div4"><button className='confirm_find'>Tìm chuyến bay <BsArrowRightShort/></button></div>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}
export default Banner