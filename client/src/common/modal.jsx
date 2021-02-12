import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import auth from "./../services/authService";
const InfoModal = () => {
  const [show, setShow] = useState(false);
  const user = auth.getCurrentUser();
  useEffect(() => {
    if (!user) {
      setShow(true);
    }
  }, [user]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton className="bg-dark text-white text-center">
          <h5>Please Login as Admin</h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <p>
            To see the full functionality please login as Admin using the
            following credentials.
          </p>
          <h6>Email:</h6>
          <p className="ml-4">admin@domain.com</p>
          <h6>Password:</h6>
          <p className="ml-4">pass@123</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InfoModal;
