import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import SupplierList from './Components/Supplier/SupplierList';
import SupplierManagement from './Components/Supplier/SupplierProfile';
import SupplierQuality from './Components/Supplier/SupplierQuality';
import Orders from './Components/Supplier/Orders';
import Quotation from './Components/Supplier/Quotation';
import InventoryRequests from './Components/Supplier/InventoryRequests';

import EmployeeList from './Components/Employee/EmployeeList';
import AttendancePage from './Components/Employee/Attendance';
import LeaveReq from './Components/Employee/LeaveReq';
import ProjectRequests from './Components/Employee/ProjectRequests';

import AdminDashboard from './Components/Admin/AdminDashboard';
import SupplierDashboard from './Components/Admin/SupplierDashboard';
import EmployeeDashboard from './Components/Admin/EmployeeDashboard';
import UserDetails from './Components/Admin/Users/UserDetails';
import AddUser from './Components/Admin/Users/AddUser';
import UpdateUser from './Components/Admin/Users/UpdateUser';

import SupplierDetails from './Components/Admin/Suppliers/SupplierDetails';
import AddSupplier from './Components/Admin/Suppliers/AddSupplier';
import UpdateSupplier from './Components/Admin/Suppliers/UpdateSupplier';
import Supplier from './Components/Admin/Suppliers/Supplier';

import EmployeeDetails from './Components/Admin/Employees/EmployeeDetails';
import AddEmployee from './Components/Admin/Employees/AddEmployee';
import UpdateEmployee from './Components/Admin/Employees/UpdateEmployee';
import Employee from './Components/Admin/Employees/Employee';
import EmployeeProfile from './Components/Employee/EmployeeProfile';

import { AuthProvider } from './Components/Auth/AuthContext';  // Import AuthProvider


function App() {
  return (
    <AuthProvider>  {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Routes>
          {/* Home Page as the default route */}
          <Route path="/" element={<Login />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          <Route path='/SupplierDashboard' element={<SupplierDashboard />} />
          <Route path='/EmployeeDashboard' element={<EmployeeDashboard />} />


          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/suppliers' element={<SupplierList />} />
          <Route path='/supplier-quality' element={<SupplierQuality />} />
          <Route path='/suppliers/:id' element={<SupplierManagement />} />
          <Route path='/inventory-requests' element={<InventoryRequests />} />
          <Route path='/quotation' element={<Quotation />} />
          <Route path='/orders' element={<Orders />} />

          <Route path='/EmployeeList' element={<EmployeeList />} />
          <Route path='/attendance' element={<AttendancePage />} />
          <Route path='/leave-requests' element={<LeaveReq />} />
          <Route path='/employee/:id' element={<EmployeeProfile />} />
          <Route path='/project-requests' element={<ProjectRequests />} />




          <Route path="/admindashboard" element={<AdminDashboard />}>
            <Route path="user-management" element={<UserDetails />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="update-user/:id" element={<UpdateUser />} />

            <Route path="supplier-management" element={<SupplierDetails />} />
            <Route path="supplier/:id" element={<Supplier />} />
            <Route path="add-supplier" element={<AddSupplier />} />
            <Route path="update-supplier/:id" element={<UpdateSupplier />} />

            <Route path="employee-management" element={<EmployeeDetails />} />
            <Route path="employee/:id" element={<Employee />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="update-employee/:id" element={<UpdateEmployee />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
