import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BasicBookAppointmentCalendar = () => {
  const navigate = useNavigate();
  const [veterinarian, setVeterinarian] = useState([]);
  const [owner, setOwner] = useState([]);
  const [pet, setPet] = useState([]);
  const [service, setService] = useState([]);
  const [appointment, setAppointment] = useState({
    appointments_created_at: "",
    appoitments_starts_at: "",
    appointments_ends_at: "",
    owner_id: "",
    veterinarian_id: "",
    pet_id: "",
    service_id: "",
  });
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

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/services")
      .then((result) => {
        if (result.data.Status) {
          setService(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/add-appointment", appointment)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/preview-appointment");
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
        <h2>Add an Appointment</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputCreated" className="form-label">
              Appointment Created
            </label>
            <input
              type="datetime-local"
              className="form-control rounded-0"
              id="inputStart4"
              placeholder="Enter Appointment Date"
              autoComplete="off"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  appointments_created_at: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputStart4" className="form-label">
              Appointment Starts
            </label>
            <input
              type="datetime-local"
              className="form-control rounded-0"
              id="inputStart4"
              placeholder="Enter Appointment Date"
              autoComplete="off"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  appoitments_starts_at: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEndDate4" className="form-label">
              Appointments End Date
            </label>
            <input
              type="datetime-local"
              className="form-control rounded-0"
              id="inputEndDate4"
              placeholder="Enter Appointments End"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  appointments_ends_at: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="owner" className="form-label">
              Select Owner
            </label>
            <select
              name="owner"
              id="owner"
              className="form-select"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
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
            <label htmlFor="vet" className="form-label">
              Select the Vet
            </label>
            <select
              name="vet"
              id="vet"
              className="form-select"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
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
            <label htmlFor="pet" className="form-label">
              Select Pet
            </label>
            <select
              name="pet"
              id="pet"
              className="form-select"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  pet_id: e.target.value,
                })
              }
            >
              {pet.map((p) => {
                return (
                  <option key={p.pet_id} value={p.pet_id}>
                    {p.pet_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="service" className="form-label">
              Select Service
            </label>
            <select
              name="service"
              id="service"
              className="form-select"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  service_id: e.target.value,
                })
              }
            >
              {service.map((serv) => {
                return (
                  <option key={serv.service_id} value={serv.service_id}>
                    {serv.service_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <button className="btn btn-success w-100 rounded-0 mb-2 mt-3">
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicBookAppointmentCalendar;
