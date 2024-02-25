import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Veterinarians from './Components/Veterinarians';
import PetOwners from "./Components/PetOwners";
import Profile from './Components/Profile';
import Category from './Components/Category';
import AddCategory from './Components/AddCategory';
import AddVeterinarian from './Components/AddVeterinarian';
import EditVeterinarian from './Components/EditVeterinarian';
import Pets from './Components/Pets';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path='' element={<Home/>}></Route>
          <Route path='/dashboard/veterinarians' element={<Veterinarians/>}></Route>
          <Route path='/dashboard/pet-owners' element={<PetOwners/>}></Route>
          <Route path='/dashboard/pets' element={<Pets/>}></Route>
          <Route path='/dashboard/categories' element={<Category/>}></Route>
          <Route path='/dashboard/profile' element={<Profile/>}></Route>
          <Route path='/dashboard/add-category' element={<AddCategory/>}></Route>
          <Route path='/dashboard/add-veterinarian' element={<AddVeterinarian/>}></Route>
          <Route path='/dashboard/edit-veterinarian/:id' element={<EditVeterinarian/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
