import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCircle } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [veterinariansTotal, setVeterinariansTotal] = useState();
  const [petOwnersTotal, setPetOwnersTotal] = useState();
  const [petsTotal, setPetsTotal] = useState();
  const [admins, setAdmins] = useState([]);
  const [events, setEvents] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [role, setRole] = useState(""); // State to store user role

  useEffect(() => {
    // Fetch user role from token
    const token = getCookie("token");
    if (token) {
      const decodedToken = decodeJWT(token);
      setRole(decodedToken.role);
    }

    adminCount();
    veterinariansCount();
    AdminRecords();
    petOwnersCount();
    petsCount();
    fetchAppointments();
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

  const AdminRecords = () => {
    axios.get("http://localhost:3000/auth/admin-records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      }
    });
  };

  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin-count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const veterinariansCount = () => {
    axios
      .get("http://localhost:3000/auth/veterinarians-count")
      .then((result) => {
        if (result.data.Status) {
          setVeterinariansTotal(result.data.Result[0].veterinarian);
        }
      });
  };

  const petsCount = () => {
    axios.get("http://localhost:3000/auth/pets-count").then((result) => {
      if (result.data.Status) {
        setPetsTotal(result.data.Result[0].pets);
      }
    });
  };

  const petOwnersCount = () => {
    axios.get("http://localhost:3000/auth/pet-owners-count").then((result) => {
      if (result.data.Status) {
        setPetOwnersTotal(result.data.Result[0].petowners);
      }
    });
  };

  const handleDeleteAdmin = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete-admin/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const fetchAppointments = () => {
    axios
      .get("http://localhost:3000/auth/appointments-combined")
      .then((result) => {
        if (result.data.status) {
          setEvents(result.data.result);
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Calculate total cost when events or selected dates change
    const filteredAppointments = events.filter((event) =>
      moment(event.appoitments_starts_at).isBetween(
        moment(startDate).startOf("day"),
        moment(endDate).endOf("day"),
        undefined,
        "[]"
      )
    );
    const cost = filteredAppointments.reduce(
      (acc, event) => acc + event.service_price,
      0
    );
    setTotalCost(cost);
  }, [events, startDate, endDate]);

  const filteredAppointments = events.filter((event) =>
    moment(event.appoitments_starts_at).isBetween(
      moment(startDate).startOf("day"),
      moment(endDate).endOf("day"),
      undefined,
      "[]"
    )
  );

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="mx-4 px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admins</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal ? adminTotal : 0}</h5>
          </div>
        </div>
        <div className="px-3 mx-4 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Veterinarians</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{veterinariansTotal ? veterinariansTotal : 0}</h5>
          </div>
        </div>
        <div className="px-3 mx-4 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Pet Owners</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{petOwnersTotal ? petOwnersTotal : 0}</h5>
          </div>
        </div>
        <div className="px-3 mx-4 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Pets</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{petsTotal ? petsTotal : 0}</h5>
          </div>
        </div>
      </div>
      <hr className="mx-4" />
      <div>
        <div className="mt-4 px-5 pt-3 d-flex align-items-center justify-content-between">
          <h3>Appointments</h3>
          <div className="d-flex align-items-center">
            <div className="display-flex align-items-center">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd-MM-yyyy"
                style={{ width: "150px" }}
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd-MM-yyyy"
                className="mx-3"
                style={{ width: "150px" }}
              />
            </div>
            <Link to="/dashboard/preview-appointment" className="btn btn-light">
              Calendar
            </Link>
            <Link
              to="/dashboard/add-appointment"
              className="btn btn-success m-3"
            >
              Book an appointment
            </Link>
          </div>
        </div>
        <div className="px-5">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Service</th>
                <th>Pet</th>
                <th>Veterinarian</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((event) => (
                  <tr key={event.appointments_id}>
                    <td>
                      {moment(event.appoitments_starts_at).format("DD-MM-YYYY")}
                    </td>
                    <td>{moment(event.appoitments_starts_at).format("LT")}</td>
                    <td>{moment(event.appointments_ends_at).format("LT")}</td>
                    <td>{event.service_name}</td>
                    <td>{event.pet_name}</td>
                    <td>{event.veterinarian_name}</td>
                    <td>{event.service_price} €</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <FaCalendarAlt /> No appointments found for the selected
                    date range.
                  </td>
                  <td></td>
                </tr>
              )}
              <tr>
                <td>Total Cost:</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{totalCost} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-4 px-5 pt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3>List of Admins</h3>
          {role === "admin" && (
            <Link to="/dashboard/add-admin" className="btn btn-success m-3">
              Add Admin
            </Link>
          )}
        </div>
        <div className="mt-3">
          {admins.length === 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <RiAdminFill /> No Admin Found
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.email}</td>
                    <td>
                      <FaCircle color="green" /> Available
                    </td>
                    <td>
                      {role === "admin" && ( // Conditionally render buttons based on role
                        <>
                          <Link
                            to={`/dashboard/edit-admin/` + admin.id}
                            className="btn btn-success btn-sm me-2"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteAdmin(admin.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
