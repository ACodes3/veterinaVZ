import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOWner] = useState([]);
  const [veterinarian, setVeterinarian] = useState([]);
  const [vaccination, setVaccination] = useState([]);
  const [pet, setPet] = useState({
    pet_name: "",
    pet_chip_number: "",
    pet_type: "",
    pet_breed: "",
    pet_gender: "",
    pet_birthdate: "",
    pet_height: "",
    pet_weight: "",
    owner_id: "",
    vaccination_id: "",
    pet_vaccination_date: "",
    veterinarian_id: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/pet-owners")
      .then((result) => {
        if (result.data.Status) {
          setOWner(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/pet/" + id)
      .then((result) => {
        setPet({
          ...pet,
          pet_name: result.data.Result[0].pet_name,
          pet_chip_number: result.data.Result[0].pet_chip_number,
          pet_type: result.data.Result[0].pet_type,
          pet_breed: result.data.Result[0].pet_breed,
          pet_gender: result.data.Result[0].pet_gender,
          pet_birthdate: result.data.Result[0].pet_birthdate,
          pet_height: result.data.Result[0].pet_height,
          pet_weight: result.data.Result[0].pet_weight,
          owner_id: result.data.Result[0].owner_id,
          vaccination_id: result.data.Result[0].vaccination_id,
          pet_vaccination_date: result.data.Result[0].pet_vaccination_date,
          veterinarian_id: result.data.Result[0].veterinarian_id,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

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
    axios
      .get("http://localhost:3000/auth/vaccinations")
      .then((result) => {
        if (result.data.Status) {
          setVaccination(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit-pet/" + id, pet)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/pets");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <div className="text-warning"></div>
        <h2>Add Pet</h2>
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
              value={pet.pet_name}
              onChange={(e) => setPet({ ...pet, pet_name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputChipNumber4" className="form-label">
              Chip Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputChipNumber4"
              placeholder="Enter Chip Number"
              value={pet.pet_chip_number}
              autoComplete="off"
              onChange={(e) =>
                setPet({ ...pet, pet_chip_number: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputType4" className="form-label">
              Type of Pet
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputType4"
              placeholder="Enter the Type of Pet"
              value={pet.pet_type}
              onChange={(e) => setPet({ ...pet, pet_type: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputBreed" className="form-label">
              Breed
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputBreed"
              placeholder="Enter the breed"
              value={pet.pet_breed}
              autoComplete="off"
              onChange={(e) => setPet({ ...pet, pet_breed: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputGender" className="form-label">
              Gender
            </label>
            <input
              type="char"
              className="form-control rounded-0"
              id="inputGender"
              placeholder="Enter the gender"
              value={pet.pet_gender}
              autoComplete="off"
              onChange={(e) => setPet({ ...pet, pet_gender: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputBirthDate" className="form-label">
              Birth Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputBirthDate"
              placeholder="Enter the date of birth"
              value={pet.pet_birthdate}
              autoComplete="off"
              onChange={(e) =>
                setPet({ ...pet, pet_birthdate: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputHeight" className="form-label">
              Height
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputHeight"
              placeholder="Enter the height in cm"
              value={pet.pet_height}
              autoComplete="off"
              onChange={(e) => setPet({ ...pet, pet_height: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputWeight" className="form-label">
              Weight
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputWeight"
              placeholder="Enter the weight in kg"
              value={pet.pet_weight}
              autoComplete="off"
              onChange={(e) => setPet({ ...pet, pet_weight: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="owner" className="form-label">
              Owner
            </label>
            <select
              name="Owner"
              id="owner"
              className="form-select"
              value={pet.owner_id}
              onChange={(e) =>
                setPet({
                  ...pet,
                  owner_id: e.target.value,
                })
              }
            >
              {owner.map((own) => {
                return (
                  <option key={own.owner_id} value={own.owner_id}>
                    {own.owner_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="vaccination" className="form-label">
              Select Vaccinations
            </label>
            <select
              name="Vaccination"
              id="vaccination"
              className="form-select"
              value={pet.vaccination_id}
              onChange={(e) =>
                setPet({
                  ...pet,
                  vaccination_id: e.target.value,
                })
              }
            >
              {vaccination.map((vacc) => {
                return (
                  <option key={vacc.vaccination_id} value={vacc.vaccination_id}>
                    {vacc.vaccination_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputDateVaccination" className="form-label">
              Date of Vaccination
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDateVaccination"
              placeholder="Enter the date of birth"
              value={pet.pet_vaccination_date}
              autoComplete="off"
              onChange={(e) =>
                setPet({ ...pet, pet_vaccination_date: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="mainVet" className="form-label">
              Select Main Veterinarian
            </label>
            <select
              name="mainvet"
              id="mainVet"
              className="form-select"
              value={pet.veterinarian_id}
              onChange={(e) =>
                setPet({
                  ...pet,
                  veterinarian_id: e.target.value,
                })
              }
            >
              {veterinarian.map((vet) => {
                return (
                  <option key={vet.veterinarian_id} value={vet.veterinarian_id}>
                    {vet.veterinarian_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <button className="btn btn-success w-100 rounded-0 mb-2 mt-3">
              Edit Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPet;
