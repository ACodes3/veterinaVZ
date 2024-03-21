import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPersonCircleXmark } from "react-icons/fa6";
import SearchBar from "./SearchBar/SearchBar";

const PetOwners = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/pet-owners")
      .then((result) => {
        if (result.data.Status) {
          setOwner(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteOwner = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete-pet-owner/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 my-4 mx-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Pet - Owners List</h3>
        <SearchBar />
        <Link to="/dashboard/add-pet-owners" className="btn btn-success">
          Add Pet Owner
        </Link>
      </div>
      <div className="mt-3">
        {owner.length === 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FaPersonCircleXmark /> No Owner Found
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>EMSO</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {owner.map((own) => (
                <tr
                  key={own.owner_id}
                  onClick={() =>
                    navigate(`/dashboard/pet-owner/${own.owner_id}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <td>{own.owner_name}</td>
                  <td>{own.owner_email}</td>
                  <td>{own.owner_emso}</td>
                  <td>{own.owner_phone}</td>
                  <td>
                    <Link
                      to={`/dashboard/edit-pet-owner/` + own.owner_id}
                      className="btn btn-success btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteOwner(own.owner_id)}
                    >
                      Delete
                    </button>
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

export default PetOwners;
