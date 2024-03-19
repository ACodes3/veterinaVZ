import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVeterinarian = () => {
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState([]);
  const [category, setCategory] = useState([]);
  const [role, setRole] = useState([]);
  const [veterinarian, setVeterinarian] = useState({
    veterinarian_name: "",
    veterinarian_email: "",
    veterinarian_password: "",
    veterinarian_address: "",
    specialization_id: "",
    category_id: "",
    role_id: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/vet-types")
      .then((result) => {
        if (result.data.Status) {
          setSpecialization(result.data.Result);
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


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/add-veterinarian", veterinarian)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/veterinarians");
        } else {
          alert(result.data.Error);
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <div className="text-warning"></div>
        <h2>Add Veterinarian</h2>
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
              onChange={(e) =>
                setVeterinarian({ ...veterinarian, veterinarian_name: e.target.value })
              }
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
              autoComplete="off"
              onChange={(e) =>
                setVeterinarian({ ...veterinarian, veterinarian_email: e.target.value })
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
                setVeterinarian({ ...veterinarian, veterinarian_password: e.target.value })
              }
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
              autoComplete="off"
              onChange={(e) =>
                setVeterinarian({ ...veterinarian, veterinarian_address: e.target.value })
              }
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
              onChange={(e) =>
                setVeterinarian({
                  ...veterinarian,
                  specialization_id: e.target.value,
                })
              }
            >
              {specialization.map((vet) => {
                return (
                  <option key={vet.specialization_id} value={vet.specialization_id}>
                    {vet.specialization_name}
                  </option>
                );
              })}
            </select>
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
                setVeterinarian({
                  ...veterinarian,
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
            <label htmlFor="role" className="form-label">
              Select Role
            </label>
            <select
              name="Role"
              id="role"
              className="form-select"
              onChange={(e) =>
                setVeterinarian({
                  ...veterinarian,
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
            <button className="btn btn-success w-100 rounded-0 mb-2 mt-3">
              Add Veterinarian
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVeterinarian;
