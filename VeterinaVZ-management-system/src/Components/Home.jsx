import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCircle } from "react-icons/fa";
import DateRangePicker from "./DatePicker/DateRangePicker";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [veterinariansTotal, setVeterinariansTotal] = useState();
  const [petOwnersTotal, setPetOwnersTotal] = useState();
  const [petsTotal, setPetsTotal] = useState();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    veterinariansCount();
    AdminRecords();
  }, []);

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
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 mx-4 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Veterinarians</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{veterinariansTotal}</h5>
          </div>
        </div>
        <div className="px-3 mx-4 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Pet Owners</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>TODO</h5>
          </div>
        </div>
        <div className="px-3 mx-4 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Pets</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>TODO</h5>
          </div>
        </div>
      </div>
      <hr className="mx-4" />
      <div className="mt-4 px-5 pt-3 d-flex align-items-center justify-content-between">
        <h3>Vaccinations</h3>
        <div className="d-flex align-items-center">
          <DateRangePicker />
          <Link to="/dashboard" className="btn btn-light">
            Book Appointment
          </Link>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3 d-flex align-items-center justify-content-between">
        <h3>Appointments</h3>
        <div className="d-flex align-items-center">
          <DateRangePicker />
          <Link to="/dashboard" className="btn btn-light">
            Book Appointment
          </Link>
        </div>
      </div>
      <div className="my-4 px-5 pt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3>List of Admins</h3>
          <Link to="/dashboard" className="btn btn-success">
            Add Admin
          </Link>
        </div>
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
              <tr key={admin}>
                <td>{admin.email}</td>
                <td>
                  <FaCircle color="green" /> Available
                </td>
                <td>
                  <button className="btn btn-success btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
