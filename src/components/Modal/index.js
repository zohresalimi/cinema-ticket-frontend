/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// styled
import "./style.css";

function Modal({ children, closeModal }) {
  return (
    <div className="full-page">
      <div className="video-wrapper">
        <div
          className="close-btn"
          role="button"
          data-testid="close-btn"
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
