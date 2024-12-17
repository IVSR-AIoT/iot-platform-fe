import { Link, /*  useLocation, */ useNavigate } from 'react-router-dom'
import { getUser, isAuthentication } from '~/hook/useAuth'
import {
  QuestionCircleFilled,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
/* import { navigation } from '~/configs/headerConfig' */
import { useContext } from 'react'
import { modalSupportContext, sidebarContext } from '~/hook/useContext'
import { Dropdown } from 'antd'

const Header = () => {
  const navigate = useNavigate()
  /* const location = useLocation() */
  const userName = getUser()?.name
  const context = useContext(modalSupportContext)
  const openIssueSupport = () => {
    context.showModal()
  }

  const sidebar = useContext(sidebarContext)
  const toggleSidebar = () => {
    const status = sidebar.isSidebarOpen
    sidebar.setIsSidebarOpen(!status)
  }
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }
  const items = [
    {
      key: '1',
      label: (
        <span>
          <UserOutlined /> {userName}
        </span>
      )
    },
    {
      key: '2',
      label: (
        <span onClick={() => openIssueSupport()}>
          <QuestionCircleFilled /> Support
        </span>
      )
    },
    {
      key: '3',
      label: (
        <span onClick={handleLogout}>
          <LogoutOutlined /> Logout
        </span>
      ),
      danger: true
    }
  ]

  /*  const enhancedNavigation = navigation.map((item) => ({
    ...item,
    selected: item.route === location.pathname
  })) */

  return (
    <div className="h-[50px] w-full bg-[#F0F2F5] flex justify-between items-center px-[30px] fixed top-0 z-50 shadow-sm">
      <div className="h-full w-full flex">
        <MenuFoldOutlined onClick={toggleSidebar} className="text-[24px]" />
        {/* {enhancedNavigation.map((item, index) => (
          <Link
            to={item.route}
            key={index}
            className={`w-[100px] text-center transition-colors duration-200 leading-[46px] rounded-xl ${
              item.selected ? 'text-[#0866FF] hover:bg-none' : 'text-[#606266] hover:bg-[#F2F2F2]'
            }`}
          >
            {item.title}
            {item.selected && <div className="w-full h-[4px] bg-[#0866FF]"></div>}
          </Link>
        ))} */}
      </div>
      <div className="relative">
        {isAuthentication() ? (
          <Dropdown menu={{ items }} overlayStyle={{ width: 120 }}>
            <div className="flex justify-center items-center cursor-pointer w-8 h-8 rounded-full bg-[#E4E6EB]">
              <UserOutlined />
            </div>
          </Dropdown>
        ) : (
          <div className="flex justify-between w-[160px] cursor-pointer items-center h-[50px]">
            <Link
              to="/login"
              className="text-[#606266] hover:bg-[#F2F2F2] transition-colors duration-200 h-full leading-[50px] w-[80px] rounded-lg text-center"
            >
              Login
            </Link>
            <div className="h-5 w-[1px] bg-black"></div>
            <Link
              to="/register"
              className="text-[#606266] hover:bg-[#F2F2F2] transition-colors duration-200 h-full leading-[50px] w-[80px] rounded-lg text-center"
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
