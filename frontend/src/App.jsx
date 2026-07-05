import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './componenets/Login';
import Register from './componenets/Register';
import MainLayout from "./componenets/Layout/Layout";
import Dashboard from './componenets/Dashboard/Dashboard';
import EmpDashboard from './componenets/Dashboard/EmpDashboard';
import AdminDashboard from './Componenets/Admin/AdminDashboard';
import MyTasks from './Componenets/Employee/MyTasks';
import Notifications from './Componenets/Employee/Notification';
import Employee from './Componenets/Admin/Employee';
import Tasks from './Componenets/Admin/Tasks';
import Reports from './Componenets/Admin/AdminReports';
import AdminProfile from "./Componenets/Admin/AdminProfile";
import EmployeeProfile from "./Componenets/Employee/EmployeeProfile";
import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          {/* Admin */}
          <Route path="/admin" element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<Employee />} />
            <Route path="/admin/tasks" element={<Tasks />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>

          <Route path="/employee" element={<MainLayout />}>
            <Route path="dashboard" element={<EmpDashboard />} />

            <Route path="/employee/mytasks" element={<MyTasks />} />
            <Route path="/employee/notifications" element={<Notifications />} />
            <Route path="/employee/profile" element={<EmployeeProfile />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
