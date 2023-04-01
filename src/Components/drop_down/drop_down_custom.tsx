import React from 'react'
import {GiCommercialAirplane} from 'react-icons/gi'
import {RiArrowDropDownLine} from 'react-icons/ri'
import {BsPersonFill,BsPlusCircleFill} from 'react-icons/bs'
import {CiCircleRemove} from 'react-icons/ci'
import {TbMathLower} from 'react-icons/tb'
import {BiSearchAlt} from 'react-icons/bi'

const drop_down_custom = () => {
  return (
    <div>
        <button class="dropdown-content">
            <li><span>Người lớn</span>  <CiCircleRemove/><input/><BsPlusCircleFill/></li>
            <li><span>Trẻ em</span><p>2-11 tuổi</p></li>
            <li><span>Trẻ sơ sinh</span><p><TbMathLower/> 2 tuổi</p> </li>
        </button>
    </div>
  )
}

export default drop_down_custom