import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Pets = () => {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }

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
              <th>Pet Owner</th>
              <th>Nickname</th>
              <th>Chip number</th>
              <th>Type</th>
              <th>Breed</th>
              <th>Sex</th>
              <th>Date of Birth</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Vaccinated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pet.map((pets) => (
              <tr key={pets}>
                <td>{pets.pet_owner_id}</td>
                <td>{pets.pet_nickname}</td>
                <td>{pets.pet_nb_chip}</td>
                <td>{pets.pet_type}</td>
                <td>{pets.pet_breed}</td>
                <td>{pets.pet_gender}</td>
                <td>{formatDate(pets.pet_birth_date)}</td>
                <td>{pets.pet_height} cm</td>
                <td>{pets.pet_weight} kg</td>
                <td>{pets.pet_vaccinated ? 'Yes' : 'No'}</td>
                <td>
                  <Link
                    to={`/dashboard/edit-pet/` + pets.id}
                    className="btn btn-success btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(pets.id)}
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

export default Pets