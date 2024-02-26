import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [veterinarian, setVeterinarian] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [petOwner, setPetOwner] = useState([]);
  const [pet, setPet] = useState({
    pet_owner: "",
    pet_nickname: "",
    pet_nb_chip: "",
    pet_type: "",
    pet_breed: "",
    pet_gender: "",
    pet_birth_date: "",
    pet_height: "",
    pet_weight: "",
    pet_vaccinated: "",
    image: "",
    pet_vaccination_id: "",
    pet_vet_id: "",
    category_id: "",
    pet_vaccination_date: "",
    pet_vaccination_validity: "",
  });

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
      .get("http://localhost:3000/auth/vaccination-types")
      .then((result) => {
        if (result.data.Status) {
          setVaccine(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/pet-owners")
      .then((result) => {
        if (result.data.Status) {
          setPetOwner(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pet_owner", pet.pet_owner);
    formData.append("pet_nickname", pet.pet_nickname);
    formData.append("pet_nb_chip", pet.pet_nb_chip);
    formData.append("pet_type", pet.pet_type);
    formData.append("pet_breed", pet.pet_breed);
    formData.append("pet_gender", pet.pet_gender);
    formData.append("pet_birth_date", pet.pet_birth_date);
    formData.append("pet_height", pet.pet_height);
    formData.append("pet_weight", pet.pet_weight);
    formData.append("pet_vaccinated", pet.pet_vaccinated);
    formData.append("image", pet.image);
    formData.append("pet_vaccination_id", pet.pet_vaccination_id);
    formData.append("pet_vet_id", pet.pet_vet_id);
    formData.append("category_id", pet.category_id);
    formData.append("pet_vaccination_date", pet.pet_vaccination_date);
    formData.append("pet_vaccination_validity", pet.pet_vaccination_validity);
    
    axios
      .post("http://localhost:3000/auth/add-pet", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/pets");
        } else {
          //alert(result.data.Error);
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
      <div className="p-3 rounded w-50 border">
        <div className="text-warning"></div>
        <h2>Add Pet and Pet Owner</h2>
        <h4>Pet</h4>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="petOwner" className="form-label">
              Select Pet Owner
            </label>
            <select
              name="PetOwner"
              id="petowner"
              className="form-select"
              onChange={(e) => setPet({ ...pet, pet_owner: e.target.value })}
            >
              {petOwner.map((owner) => {
                return (
                  <option key={owner.pet_owner_id} value={owner.pet_owner_id}>
                    {owner.pet_owner_name} {owner.pet_owner_surname}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Nickname
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Nickname"
              onChange={(e) => setPet({ ...pet, pet_nickname: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputChipNumber" className="form-label">
              Chip Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputChipNumber"
              placeholder="Enter Chip Number"
              autoComplete="off"
              onChange={(e) => setPet({ ...pet, pet_nb_chip: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPetType" className="form-label">
              Pet type
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPetType"
              placeholder="Enter the type of pet"
              onChange={(e) => setPet({ ...pet, pet_type: e.target.value })}
            />
            <label htmlFor="inputBreed" className="form-label">
              Breed
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputBreed"
              placeholder="Input Breed"
              autoComplete="off"
              onChange={(e) => setPet({ ...pet, pet_breed: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPetGender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPetGender"
              placeholder="Input Gender"
              autoComplete="off"
              onChange={(e) => setPet({ ...pet, pet_gender: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputBirthDate" className="form-label">
              Birth date
            </label>
            <input
              type="date" // Change type to "date"
              className="form-control rounded-0"
              id="inputBirthDate" // Change id to a more descriptive name
              placeholder="Enter Birth Date"
              autoComplete="off"
              onChange={(e) =>
                setPet({
                  ...pet,
                  pet_birth_date: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPetHeight" className="form-label">
              Height
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPetHeight"
              placeholder="Input height"
              autoComplete="off"
              onChange={(e) => setPet({ ...pet, pet_height: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPetWeight" className="form-label">
              Weight
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPetWeight"
              placeholder="Input Weight"
              autoComplete="off"
              onChange={(e) => setPet({ ...pet, pet_weight: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Vaccinated</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="inputPetVaccinated"
                onChange={(e) => {
                  const value = e.target.checked;
                  setPet({ ...pet, pet_vaccinated: value });
                }}
              />
              <label className="form-check-label" htmlFor="inputPetVaccinated">
                Yes
              </label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setPet({ ...pet, image: e.target.files[0] })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              If vaccinated, select vaccine
            </label>
            <select
              name="Vaccine"
              id="vaccine"
              className="form-select"
              onChange={(e) =>
                setPet({ ...pet, pet_vaccination_id: e.target.value })
              }
            >
              {vaccine.map((vac) => {
                return (
                  <option key={vac.vaccination_type_id} value={vac.vaccination_type_id}>
                    {vac.vaccination_type_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Select Main Veterinarian
            </label>
            <select
              name="Veterinarian"
              id="veterinarian"
              className="form-select"
              onChange={(e) => setPet({ ...pet, pet_vet_id: e.target.value })}
            >
              {veterinarian.map((vet) => {
                return (
                  <option key={vet.id} value={vet.id}>
                    {vet.name}
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
              onChange={(e) => setPet({ ...pet, category_id: e.target.value })}
            >
              {category.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>
          <h4> Info about the vaccination </h4>
          <div className="col-12">
            <label htmlFor="inputVaccinationDate" className="form-label">
              Vaccination date
            </label>
            <input
              type="date" // Change type to "date"
              className="form-control rounded-0"
              id="inputVaccinationDate" // Change id to a more descriptive name
              placeholder="Enter Vaccination Date"
              autoComplete="off"
              onChange={(e) =>
                setPet({
                  ...pet,
                  pet_vaccination_date: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputExpirationDate" className="form-label">
              Birth date
            </label>
            <input
              type="date" // Change type to "date"
              className="form-control rounded-0"
              id="inputExpirationDate" // Change id to a more descriptive name
              placeholder="Enter Vaccination Expiration Date"
              autoComplete="off"
              onChange={(e) =>
                setPet({
                  ...pet,
                  pet_vaccination_validity: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12 mt-4">
            <button className="btn btn-success w-100 rounded-0 mb-2">
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
