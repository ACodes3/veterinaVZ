import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
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
      .post("http://localhost:3000/auth/add-pet", pet)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/pets");
        } else {
          alert(result.data.Error);
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };


  return(
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
            onChange={(e) =>
              setPet({ ...pet, pet_name: e.target.value })
            }
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
            onChange={(e) =>
              setPet({ ...pet, pet_type: e.target.value })
            }
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
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_breed: e.target.value })
            }
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
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_gender: e.target.value })
            }
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
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_height: e.target.value })
            }
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
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_weight: e.target.value })
            }
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
          <label htmlFor="mainVet" className="form-label">
            Select Main Veterinarian
          </label>
          <select
            name="mainvet"
            id="mainVet"
            className="form-select"
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
            Add Pet
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddPet;
