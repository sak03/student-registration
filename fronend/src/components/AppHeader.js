import React from 'react'
import { useSelector } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import { AppHeaderDropdown } from './header/index'
import './appHeader.css'

const AppHeader = () => {
  const userInfo = useSelector((state) => state.userLoginInfo);

  return (
    <>
      <CHeader position="sticky" className="mb-2">
        <CContainer fluid>
          <div className='d-flex justify-content-start'>
            <strong>Student's Dashboard</strong>
          </div>
          <div className='d-flex justify-content-end'>
            <CHeaderNav>
              <CNavItem>
                <CNavLink >
                  {userInfo?.name}
                </CNavLink>
              </CNavItem>
            </CHeaderNav>
            <CHeaderNav className="ms-3">
              <AppHeaderDropdown />
            </CHeaderNav>
          </div>
        </CContainer>
      </CHeader>
    </>
  )
}

export default AppHeader
