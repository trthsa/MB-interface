import React, { useState } from 'react'
import {FaAlignJustify} from 'react-icons/fa';
import {RiCustomerService2Line} from 'react-icons/ri'
import {BsPersonCircle} from 'react-icons/bs'
const Navbar = () => {
    const [state,setState]=React.useState(true);
  return (
    <div className="container-fluid">
    <div className="row">
    <div className="col-12 container">
            <div className="row">
                <div className="col-4 navbar_left">
                        {/* <img src='./Images/image1.jpg'alt=''/> */}
                        <h2><a href='Home'>LOGO</a></h2>
                </div>
                { 

                    state?(
                        <div className="col-8 ">
                        <ul className='navbar_right'>
                            <li><a href='Home'>Trang chủ</a></li>
                            <li><a href='Deals'>Ưu đãi</a></li>
                            <li><a href='Plan&book'>Lên kế hoạch</a></li>
                            <li><a href='Infomation'>Thông tin hành trình</a></li>
                            <li><a href='Helpdesk'>Trợ giúp  <RiCustomerService2Line/></a></li>
                            <li><a href='Login'>Đăng nhập  <BsPersonCircle/></a></li>
                        </ul>
                        </div>
                    ):(
                        ""
                    )
                }
            </div>
        </div>
        <div className="col-12 toggle" onClick={()=>setState(!state)}>
            <FaAlignJustify/>
        </div>
    </div>
    </div>
  )
}

export default Navbar