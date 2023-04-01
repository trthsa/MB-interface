import React from 'react'
import {AiOutlineRight} from 'react-icons/ai'
const Planandbook = () => {
  return (
    <div className='container'>
      <div className='row try_center'>
        <div className="col-12 col-sm-6 item_PB">
          <a href=''>
            <img src='/Images/image5.png'/>
            <div className='title_item'><p>Vé máy bay & dịch vụ bổ trợ</p><AiOutlineRight/></div>
          </a>
        </div>  
        <div className="col-12 col-sm-6 item_PB">
          <a href=''>
          <img src='/Images/image17.png'/>
          <div className='title_item'><p>Sản phẩm liên kết</p><AiOutlineRight/></div>
          </a>
        </div>
        <div className="col-12 col-sm-6 item_PB">
          <a href=''>
          <img src='/Images/image14.png'/>
          <div className='title_item'><p>Trải nghiệm cùng Airlines</p><AiOutlineRight/></div>
          </a>
        </div>
        <div className="col-12 col-sm-6 item_PB">
          <a href=''>
          <img src='/Images/image10.png'/>
          <div className='title_item'><p>Lịch bay và mạng đường bay</p><AiOutlineRight/></div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Planandbook