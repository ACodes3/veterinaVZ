import { useState, useEffect } from "react";
import moment from "moment";
import Calendar from "../Appointments/Calendar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const BasicBookAppointmentCalendar = () => {
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/appointments-combined")
      .then((result) => {
        console.log(result.data); // Log the data received from the API
        if (result.data.status) {
          setEvents(result.data.result);
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    handleShow();
  };

  return (
    <>
      <Calendar
        events={events.map((event) => ({
          start: moment(event.appoitments_starts_at).toDate(),
          end: moment(event.appointments_ends_at).toDate(),
          title: event.service_name,
          pet: event.pet_name,
          owner: event.owner_name,
          vet: event.veterinarian_name,
        }))}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? selectedEvent.title : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent ? (
            <>
              <p>
                Time: {moment(selectedEvent.start).format("LLL")} -{" "}
                {moment(selectedEvent.end).format("LT")}{" "}
              </p>
              <p>Pet: {selectedEvent.pet}</p>
              <p>Owner: {selectedEvent.owner}</p>
              <p>Vet: {selectedEvent.vet}</p>
            </>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Edit
          </Button>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BasicBookAppointmentCalendar;
