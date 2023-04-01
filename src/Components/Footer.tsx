import React from 'react'
import {FaFacebookSquare,FaInstagramSquare,FaTwitterSquare} from 'react-icons/fa'
import{TfiYoutube} from 'react-icons/tfi'

const Footer = () => {
  return (
    <footer className='footer'>
    <h2><a href='Home'>LOGO</a></h2>
    <div className="container-fluid ">
        <div className="row footer_contact">
            <div className="col-12 col-md-4">
                <ul className='content'>
                    <li><a href=''>Liên hệ</a></li>
                    <li><a href=''>Cam kết với khách hàng</a></li>
                    <li><a href=''>Các điều khoản và doanh nghiệp</a></li>
                    <li><a href=''>Đăng ký khách hàng doanh nghiệp</a></li>
                </ul>
            </div>
            <div className="col-12 col-md-4">
            <ul className='content diem_n'>
                    <li><a href=''>Về chúng tôi</a></li>
                    <li><a href=''>Chính sách bảo mật</a></li>
                    <li><a href=''>Các chuyến quốc tế</a></li>
                </ul>
            </div>
            <div className="col-12 col-md-4">
            <ul className='content'>
                    <li><a href=''>Bản đồ sân bay</a></li>
                    <li><a href=''>Điều lệ sử dụng</a></li>
                    <li><a href=''>Trợ giúp đặc biệt</a></li>
                </ul>
            </div>
        </div>
        <div className="row ">
            <div className="col-12">
                <ul className='div_follow'>
                    <li><h4>Follow us</h4></li>
                    <li><a href=''><FaFacebookSquare/></a></li>
                    <li><a href=''><FaInstagramSquare/></a></li>
                    <li><a href=''><FaTwitterSquare/></a></li>
                    <li><a href=''><TfiYoutube/></a></li>
                </ul>
            </div>
            <div className="row sp">
                <div className="col-12 sp_content">
                    <p><a href=''>@Sản phẩm của sinh viên Huflit</a></p>
                </div>
            </div>
        </div>
    </div>
    </footer>
  )
}

export default Footer