import React from 'react'
import {
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Avatar } from 'primereact/avatar';
import { useSelector, useDispatch } from "react-redux";
import { userLoginInfo } from '../../redux//loginInfoAction'
import { useNavigate } from "react-router-dom";


const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userLoginInfo);

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {userInfo?.image !== undefined ?
          <Avatar
            image={userInfo?.image}
            size="small"
            shape="circle"
          /> :
          <Avatar
            label={userInfo?.name?.charAt(0)?.toUpperCase()}
            className="p-2 my-1"
            size="small"
            shape="circle"
          />}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{userInfo?.role}</CDropdownHeader>
        <CDropdownItem>
          <CIcon icon={cilUser} className="me-2" />
          {userInfo?.name}
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem >
          <CIcon icon={cilLockLocked} className="me-2" />
          <a
            href="#"
            rel="noopener noreferrer"
            className='text-dark'
            style={{ textDecoration: "none" }}
          >
            <span
            onClick={()=>{
              dispatch(userLoginInfo(null));
            }}
            >
              Log out
            </span>
          </a>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
