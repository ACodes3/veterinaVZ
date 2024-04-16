import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { formatDate } from "../Formaters/FormatDate";
import UserImage from "../../assets/sampleImages/user.png";

const OwnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/pet-owner/` + id)
      .then((result) => {
        console.log(result.data.Result); // Log the result here
        if (result.data.Status) {
          setOwner(result.data.Result[0]); // Access the first element of the array
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleDeleteOwner = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete-pet-owner/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit-pet-owner/" + id, owner)
      .then((result) => {
        console.log("Result:", result); // Add this line
        if (result.data.Status) {
          navigate("/owner-profile/" + id);
          window.location.reload(); // Refresh the page
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div>
      <h2>Owner Details - {owner.owner_name}</h2>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5 mb-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4 justify-content-center align-content-center">
                <div className="d-col text-black justify-content-center align-content-center">
                  <div className="justify-content-center align-content-center m-2">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                      <label htmlFor="category" className="form-label">
                        <strong>Pet Owner: {owner.owner_name}</strong>
                      </label>
                    </div>
                  </div>
                  <MDBCardImage src={UserImage} fluid alt="..." />
                  <div className="flex-grow-1 m-4">
                    {isEditing ? (
                      // Render editable fields in edit mode
                      <>
                        {/* Your editable fields here */}
                        <div className="d-flex justify-content-center pt-1">
                        <form className="row g-1" onSubmit={handleSubmit}>
                            <div className="col-12">
                              <label htmlFor="inputName4" className="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputName4"
                                placeholder="Enter Name"
                                value={owner.owner_name}
                                autoComplete="off"
                                onChange={(e) =>
                                  setOwner({ ...owner, owner_name: e.target.value })
                                }
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="inputName4" className="form-label">
                                EMSO
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputEMSO4"
                                placeholder="Enter EMSO"
                                value={owner.owner_emso}
                                autoComplete="off"
                                onChange={(e) =>
                                  setOwner({ ...owner, owner_emso: e.target.value })
                                }
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="inputEmail4" className="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control rounded-0"
                                id="inputEmail4"
                                placeholder="Enter Email"
                                value={owner.owner_email}
                                autoComplete="off"
                                onChange={(e) =>
                                  setOwner({ ...owner, owner_email: e.target.value })
                                }
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="inputPassword4" className="form-label">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control rounded-0"
                                id="inputPassword4"
                                placeholder="Enter Password"
                                value={owner.owner_password}
                                autoComplete="off"
                                onChange={(e) =>
                                  setOwner({ ...owner, owner_password: e.target.value })
                                }
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="inputPhone4" className="form-label">
                                Phone Number
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputPhone4"
                                placeholder="Enter Phone Number"
                                value={owner.owner_phone}
                                autoComplete="off"
                                onChange={(e) =>
                                  setOwner({ ...owner, owner_phone: e.target.value })
                                }
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="inputAddress4" className="form-label">
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputAddress4"
                                placeholder="Enter Your Address"
                                value={owner.owner_address}
                                autoComplete="off"
                                onChange={(e) =>
                                  setOwner({ ...owner, owner_address: e.target.value })
                                }
                              />
                            </div>
                            <div className="col-12 mt-4">
                              <button className="btn btn-success w-100 rounded-0 mb-2">
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="btn btn-secondary w-100 rounded-0 mb-2"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleLogout}
                                className="btn btn-primary w-100 rounded-0 mb-2"
                              >
                                Logout
                              </button>
                            </div>
                          </form>
                        </div>
                      </>
                    ) : (
                      // Render non-editable fields in view mode
                      <>
                        <MDBCardTitle>{owner.owner_name}</MDBCardTitle>
                        <MDBCardText>
                          <strong>EMSO: </strong> {owner.owner_emso}
                        </MDBCardText>
                        <MDBCardText>
                          <strong>Birth Date: </strong>{" "}
                          {formatDate(owner.owner_birthdate)}
                        </MDBCardText>
                        <MDBCardText>
                          <strong>Email: </strong> {owner.owner_email}
                        </MDBCardText>
                        <MDBCardText>
                          <strong>Phone: </strong> {owner.owner_phone}
                        </MDBCardText>
                        <MDBCardText>
                          <strong>Address: </strong> {owner.owner_address}
                        </MDBCardText>
                        <div className="d-flex justify-content-center pt-1">
                          <button
                            onClick={handleEdit}
                            className="btn btn-primary btn-sm me-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              navigate(`/owner-profile-pets/` + id);
                            }}
                            className="btn btn-primary btn-sm me-4"
                          >
                            View Pets
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteOwner(owner.owner_id);
                              navigate(`/`);
                            }}
                            className="btn btn-danger btn-sm me-4"
                          >
                            Delete
                          </button>
                          <button
                                onClick={handleLogout}
                                className="btn btn-secondary btn-sm me-4"
                              >
                                Logout
                              </button>
                        </div>
                      </>
                    )}
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

export default OwnerDetails;
