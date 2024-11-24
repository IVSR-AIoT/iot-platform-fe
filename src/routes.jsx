import { RoutesConfig } from '~/configs/routesConfig'
import Alert from './pages/alert'
import Device from '~/pages/device'
import Home from '~/pages/home'
import Login from '~/pages/login'
import Project from '~/pages/project'
import Register from '~/pages/register'
import ForgotPassword from '~/pages/forgotPassword'
import ResetPassword from '~/pages/resetPassword'
import ManageSupport from './pages/manageSupport'
import ManageProject from './pages/manageProject'
import canvas from './components/selectArea.jsx'

const publicRoutes = [
  { path: RoutesConfig.login, component: Login },
  { path: RoutesConfig.register, component: Register },
  { path: RoutesConfig.home, component: Home },
  { path: RoutesConfig.forgotPassword, component: ForgotPassword },
  { path: RoutesConfig.resetPassword, component: ResetPassword },
  { path: RoutesConfig.test, component: canvas }
]

const privateRoutes = [
  { path: RoutesConfig.project, component: Project },
  { path: RoutesConfig.device, component: Device },
  { path: RoutesConfig.alert, component: Alert },
  { path: RoutesConfig.manageSupport, component: ManageSupport },
  { path: RoutesConfig.manageProject, component: ManageProject }
]

export { publicRoutes, privateRoutes }
