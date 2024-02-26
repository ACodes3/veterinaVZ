import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Pets = () => {
  const navigate = useNavigate();
  const [pet, setPet] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/pets")
      .then((result) => {
        if (result.data.Status) {
          setPet(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete-pet/" + id)
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
        <h3>Pets List</h3>
        <Link to="/dashboard/add-pet" className="btn btn-success">
          Add Pet
        </Link>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Nickname</th>
              <th>Chip number</th>
              <th>Type</th>
              <th>Breed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pet.map((pets) => (
              <tr
                key={pets.id}
                onClick={() => navigate(`/dashboard/pet/${pets.id}`)}
              >
                <td>{pets.pet_nickname}</td>
                <td>{pets.pet_nb_chip}</td>
                <td>{pets.pet_type}</td>
                <td>{pets.pet_breed}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/edit-pet/${pets.id}`);
                    }}
                    className="btn btn-success btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(pets.id);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pets;
