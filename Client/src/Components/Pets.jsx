import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { MdPets } from "react-icons/md";

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddPet = () => {
    navigate('/dashboard/add-pet');
};
  const handleAddPetOwner = () => {
    navigate('/dashboard/add-pet-owner');
  };

  return (
    <div className="px-5 my-4 mx-2">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Pets List</h3>
        <>
          <Button variant="success" onClick={handleShow}>
            Add Pet
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Pet</Modal.Title>
            </Modal.Header>
            <Modal.Footer className="display-flex align-items-center justify-content-between">
              <Button variant="success" onClick={handleAddPet}>
                Registered owner
              </Button>
              <Button variant="primary" onClick={handleAddPetOwner}>
                New Owner
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
      <div className="mt-3">
        {pet.length === 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><MdPets /> No Pets Found</td>
                <td></td>
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
        )}
      </div>
    </div>
  );
};

export default Pets;
