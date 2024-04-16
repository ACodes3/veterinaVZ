import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCircle } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const Veterinarians = () => {
  const [veterinarian, setVeterinarian] = useState([]);
  const [role, setRole] = useState(""); // State to store user role
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/veterinarians")
      .then((result) => {
        if (result.data.Status) {
          setVeterinarian(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Fetch user role from token
    const token = getCookie("token");
    if (token) {
      const decodedToken = decodeJWT(token);
      setRole(decodedToken.role);
    }
  }, []);

  // Function to get cookie value by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // Function to decode JWT token manually
  const decodeJWT = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete-veterinarian/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className="px-5 my-4 mx-2">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Veterinarian List</h3>
        {role === "admin" && (
          <Link to="/dashboard/add-veterinarian" className="btn btn-success">
            Add Veterinarian
          </Link>
        )}
      </div>
      <div className="mt-3">
        {veterinarian.length === 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FaUserDoctor /> No Veterinarian Found
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {role === "admin" && <th>Action</th>}
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {veterinarian.map((vets) => (
                <tr key={vets.veterinarian_id}>
                  <td>{vets.veterinarian_name}</td>
                  <td>{vets.veterinarian_email}</td>
                  {role === "admin" && (
                    <td>
                      <Link
                        to={
                          `/dashboard/edit-veterinarian/` + vets.veterinarian_id
                        }
                        className="btn btn-success btn-sm me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(vets.veterinarian_id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                  <td>
                    <FaCircle color="green" /> Available
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Veterinarians;
