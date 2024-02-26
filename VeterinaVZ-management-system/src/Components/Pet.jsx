import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { formatDate } from "./Formaters/FormatDate";

const Pet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [vaccination, setVaccination] = useState([]);
  const [petOwner, setPetOWner] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/pet/${id}`)
      .then((result) => {
        console.log(result.data.Result); // Log the result here
        if (result.data.Status) {
          setPet(result.data.Result[0]); // Access the first element of the array
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/pet-owners`)
      .then((result) => {
        console.log(result.data.Result);
        if (result.data.Status) {
          setPetOWner(result.data.Result); // Update the state with the array of vaccination types
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/vaccination-types`)
      .then((result) => {
        console.log(result.data.Result);
        if (result.data.Status) {
          setVaccination(result.data.Result); // Update the state with the array of vaccination types
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

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

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        Pet Details - {pet.pet_type} {pet.pet_nickname}
      </h2>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5 mb-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4 justify-content-center align-content-center">
                <div className="d-col text-black justify-content-center align-content-center">
                  <div className="justify-content-center align-content-center m-2">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                      <label htmlFor="category" className="form-label">
                        <strong>Pet Owner</strong>
                      </label>
                      <select
                        name="petOwner"
                        id="petowner"
                        className="form-select"
                        value={pet.pet_owner}
                        disabled
                      >
                        {petOwner.map((petO) => {
                          return (
                            <option
                              key={petO.pet_owner_id}
                              value={petO.pet_owner_id}
                            >
                              {petO.pet_owner_name} {petO.pet_owner_surname}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <MDBCardImage
                      style={{
                        width: "480px",
                        borderRadius: "10px",
                        textAlign: "center",
                      }}
                      src={`http://localhost:3000/images/` + pet.image}
                      alt={pet.pet_nickname}
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <MDBCardTitle>{pet.pet_nickname}</MDBCardTitle>
                      <MDBCardText>{pet.pet_type}</MDBCardText>
                    </div>
                    <MDBCardText>
                      <strong>ChipNB:</strong> {pet.pet_nb_chip}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>Breed:</strong> {pet.pet_breed}
                    </MDBCardText>

                    <div
                      className="d-flex justify-content-around rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="small text-muted mb-1">Height</p>
                        <p className="mb-0">{pet.pet_height} cm</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Weight</p>
                        <p className="mb-0">{pet.pet_weight} kg</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Gender</p>
                        <p className="mb-0">{pet.pet_gender}</p>
                      </div>
                    </div>
                    <MDBCardText>
                      <strong>Date of Birth:</strong>{" "}
                      {formatDate(pet.pet_birth_date)}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>Vaccinated:</strong> {pet.pet_vaccinated}
                    </MDBCardText>
                    <div className="col-12">
                      <label htmlFor="category" className="form-label">
                        <strong>Type of vaccine</strong>
                      </label>
                      <select
                        name="VacType"
                        id="vactype"
                        className="form-select"
                        value={pet.pet_vaccination_id}
                        disabled
                      >
                        {vaccination.map((vac) => {
                          return (
                            <option
                              key={vac.vaccination_type_id}
                              value={vac.vaccination_type_id}
                            >
                              {vac.vaccination_type_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <MDBCardText>
                      <strong>Vaccination Date:</strong>{" "}
                      {formatDate(pet.pet_vaccination_date)}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>Vaccine Expiration:</strong>{" "}
                      {formatDate(pet.pet_vaccination_validity)}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>Main Veterinarian:</strong> {pet.pet_vet_id}
                    </MDBCardText>
                    <div className="d-flex justify-content-center pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/edit-pet/${pet.id}`);
                        }}
                        className="btn btn-success btn-sm me-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(pet.id);
                          navigate(`/dashboard/pets`);
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Pet;
