/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditVeterinarian = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [specialization, setSpecialization] = useState([]);
    const [veterinarian, setVeterinarian] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        specialization_id: "",
      });

      useEffect(()=>{
        axios.get("http://localhost:3000/auth/vet-types")
        .then(result => {
          if(result.data.Status) {
            setSpecialization(result.data.Result);
        } else {
            alert(result.data.Error)
        }
        }).catch(err => console.log(err))
        
        axios.get("http://localhost:3000/auth/veterinarian/" + id)
        .then(result => {
            setVeterinarian({
                ...veterinarian,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                salary: result.data.Result[0].salary,
                address: result.data.Result[0].address,
                specialization_id: result.data.Result[0].specialization_id,
            })
        }).catch(err => console.log(err))
      },[])

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3000/auth/edit-veterinarian/" + id, veterinarian)
        .then(result => {
            if(result.data.Status) {
                navigate("/dashboard/veterinarians")
            }else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
      }

  return (
        <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <div className="text-warning"></div>
        <h2>Edit Veterinarian</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={veterinarian.name}
              onChange={(e) => setVeterinarian({...veterinarian, name: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              value={veterinarian.email}
              autoComplete="off"
              onChange={(e) => setVeterinarian({...veterinarian, email: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              value={veterinarian.salary}
              autoComplete="off"
              onChange={(e) => setVeterinarian({...veterinarian, salary: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              value={veterinarian.address}
              autoComplete="off"
              onChange={(e) => setVeterinarian({...veterinarian, address: e.target.value})}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Type of specialization
            </label>
            <select
              name="VetType"
              id="vettype"
              className="form-select"
              value={veterinarian.specialization_id}
              onChange={(e) => setVeterinarian({...veterinarian, specialization_id: e.target.value})}
            >
                {specialization.map(c => {
                    return <option key={c.id} value={c.id}>{c.name}</option>;
                })}
            </select>
          </div>
          <div className="col-12 mt-4">
            <button className="btn btn-success w-100 rounded-0 mb-2">
              Edit Veterinarian
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditVeterinarian