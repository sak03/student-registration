import { element } from 'prop-types'
import React from 'react'

// ========= admin ============
const Dashboard = React.lazy(() => import('./views/admin/dashboard/Dasshboard'))
// const Staff = React.lazy(()=>import('./views/admin/staff/Staff'))
// const Careers = React.lazy(()=>import('./views/admin/careers/Careers'))
// const Students = React.lazy(() => import('./views/admin/students/Students'))
// const TeacherProfile =  React.lazy(() => import('./views/admin/teacher-profile/TeacherProfile'))
// const Profile = React.lazy(() => import('./views/admin/students-profile/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard},

  // ============ admin ==============
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path : '/staff', name: 'Staff', element:Staff},
  // { path : '/careers', name: 'Careers', element:Careers},
  // { path: '/students', name: "Students", element: Students },
  // { path: "/teacher-profile", name: "Profile", element: TeacherProfile },
  // { path: "/students-profile", name: "Profile", element: Profile },
]

export default routes
