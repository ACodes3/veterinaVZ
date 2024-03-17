import { useState } from "react";
import moment from "moment";
import Calendar from "./Calendar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const events = [
    {
      start: moment("2024-03-18T10:00:00").toDate(),
      end: moment("2024-03-18T11:00:00").toDate(),
      title: "MRI Registration",
      pet: "Zozo1",
      vet: "Doctor1",
    },
    {
      start: moment("2024-03-18T14:00:00").toDate(),
      end: moment("2024-03-18T15:30:00").toDate(),
      title: "ENT Appointment",
      pet: "Zozo2",
      vet: "Doctor2",
    },
  ];

const BasicCalendar = () => {
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEventClick = event => {
    setSelectedEvent(event);
    handleShow();
  };

  return (
    <>
      <Calendar
        events={events}
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
              <p>Start Time: {moment(selectedEvent.start).format("LLL")}</p>
              <p>End Time: {moment(selectedEvent.end).format("LLL")}</p>
              <p>Who: {selectedEvent.pet}</p>
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

export default BasicCalendar