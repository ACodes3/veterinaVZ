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
import AddPet from './Components/AddPet';
import Pet from './Components/Pet';
import EditPet from './Components/EditPet';
import Appointments from "./Components/Appointments/Appointments";
import VaccinationAppointments from './Components/Appointments/VaccinationAppointments';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path='' element={<Home/>}></Route>
          <Route path='/dashboard/preview-appointment' element={<Appointments/>}></Route>
          <Route path='/dashboard/preview-vaccination-appointments' element={<VaccinationAppointments/>}></Route>
          <Route path='/dashboard/veterinarians' element={<Veterinarians/>}></Route>
          <Route path='/dashboard/pet-owners' element={<PetOwners/>}></Route>
          <Route path='/dashboard/pets' element={<Pets/>}></Route>
          <Route path='/dashboard/pet/:id' element={<Pet/>}></Route>
          <Route path='/dashboard/edit-pet/:id' element={<EditPet/>}></Route>
          <Route path='/dashboard/add-pet' element={<AddPet/>}></Route>
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
