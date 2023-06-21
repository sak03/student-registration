import React from 'react'
import { CNavItem } from '@coreui/react'
import {
  FaTachometerAlt,
  FaUserFriends,
  FaRegAddressCard,
  FaUser,
  FaSuitcase,
} from "react-icons/fa";

const _nav = {
  admin_nav: [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <FaTachometerAlt className="nav-icon" title="Dashboard" />,
    },
    // {
    //   component: CNavItem,
    //   name: 'Staff',
    //   to: '/staff',
    //   icon: <FaRegAddressCard className="nav-icon" title="Staff" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Students',
    //   to: '/students',
    //   icon: <FaUserFriends className="nav-icon" title="Students" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Careers',
    //   to: '/careers',
    //   icon: <FaSuitcase className="nav-icon" title="Careers" />,
    // },
  ],
  // teacher_nav: [
  //   {
  //     component: CNavItem,
  //     name: 'Dashboard',
  //     to: '/dashboard',
  //     icon: <FaTachometerAlt className="nav-icon" title="Dashboard" />,
  //   },
  //   {
  //     component: CNavItem,
  //     name: 'Students',
  //     to: '/students',
  //     icon: <FaUserFriends className="nav-icon" title="Students" />,
  //   },
  //   {
  //     component: CNavItem,
  //     name: 'Profile',
  //     to: '/teacher-profile',
  //     icon: <FaUser className="nav-icon" title="Profile" />,
  //   },
  // ],
  // student_nav:[
  //   {
  //     component: CNavItem,
  //     name: 'Dashboard',
  //     to: '/dashboard',
  //     icon: <FaTachometerAlt className="nav-icon" title="Dashboard" />,
  //   },
  //   {
  //     component: CNavItem,
  //     name: 'Profile',
  //     to: '/students-profile',
  //     icon: <FaUser className="nav-icon" title="Profile" />,
  //   },
  // ]
}

export default _nav
