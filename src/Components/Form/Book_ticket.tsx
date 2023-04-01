import React from 'react'

const Book_ticket = () => {
  return (
    <div className="form-container">
        <p>Đặt chuyến bay</p>
        <div className='container_options'>
            <select>
                <option>Một chiều</option>
                <option>Khứ hồi</option>
                <option>Nhiều chặng</option>
            </select>
        </div>
       
        <select>
            <option>1 Hành khách</option>
            <select>Khoang dịch vụ
                <option>Phổ thông</option>
                <option>Phổ thông đặc biệt</option>
                <option>Thương gia</option>
            </select>
        </select>
    </div>
  )
}

export default Book_ticket