import React from 'react'
import { Link } from "react-router-dom";
import { FaPersonCircleXmark } from "react-icons/fa6";

const PetOwners = () => {
  return (
    <div className="px-5 my-4 mx-2">
    <div className="d-flex justify-content-between align-items-center">
      <h3>Pet - Owners  List</h3>
      <Link to="/dashboard/add-pet-owner" className="btn btn-success">
          Add Pet Owner
        </Link>
    </div>
    <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><FaPersonCircleXmark /> No Owners Found</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
  )
}

export default PetOwners