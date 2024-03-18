import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const EditAdmin = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        email: "",
        password: "",
      });
      useEffect(()=>{
        axios.get("http://localhost:3000/auth/admin/" + id)
        .then(result => {
            setAdmin({
                ...admin,
                email: result.data.Result[0].email,
                password:result.data.Result[0].password,
            })
        }).catch(err => console.log(err))
      },[])

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3000/auth/edit-admin/" + id, admin)
        .then(result => {
            if(result.data.Status) {
                navigate("/dashboard")
            }else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
      }
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <div className="text-warning"></div>
      <h2>Edit Admin</h2>
      <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control rounded-0"
            id="inputEmail4"
            placeholder="Enter Email"
            value={admin.email}
            autoComplete="off"
            onChange={(e) => setAdmin({...admin, email: e.target.value})}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control rounded-0"
            id="inputPassword4"
            placeholder="Enter Password"
            value={admin.password}
            autoComplete="off"
            onChange={(e) => setAdmin({...admin, password: e.target.value})}
          />
        </div>
        <div className="col-12 mt-4">
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Edit Admin
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditAdmin