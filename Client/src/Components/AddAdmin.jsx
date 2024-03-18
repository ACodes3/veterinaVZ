import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [role, setRole] = useState([]);
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    category_id: "",
    role_id: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/role-types")
      .then((result) => {
        if (result.data.Status) {
          setRole(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/categories")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post("http://localhost:3000/auth/add-admin", admin)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard");
        } else {
          alert(result.data.Error);
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="p-3 rounded w-50 border">
        <div className="text-warning"></div>
        <h2>Add Admin</h2>
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
              autoComplete="off"
              onChange={(e) =>
                setAdmin({ ...admin, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setAdmin({ ...admin, password: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Select Category
            </label>
            <select
              name="Category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  category_id: e.target.value,
                })
              }
            >
              {category.map((cat) => {
                return (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Select Role
            </label>
            <select
              name="role"
              id="role"
              className="form-select"
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  role_id: e.target.value,
                })
              }
            >
              {role.map((rol) => {
                return (
                  <option key={rol.role_id} value={rol.role_id}>
                    {rol.role_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <button className="btn btn-success w-100 rounded-0 mb-2">
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
