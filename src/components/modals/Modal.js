import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styled from "styled-components";
import "../../styles/modal.css";
import ReactDOM from "react-dom";

const CloseIcon = styled(IoIosCloseCircleOutline)`
  font-size: 1.5rem;
  color: white;
`;

const Modal = (props) =>
  props.isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay">
            <div
              className="modal-wrapper"
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
            >
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={props.hide}
                >
                  <span aria-hidden="true" onClick={props.hide}>
                    <CloseIcon />
                  </span>
                </button>
              </div>
              <div className="modal-body">{props.children}</div>
            </div>
          </div>
        </React.Fragment>,
        document.querySelector("#modal-root")
      )
    : null;

export default Modal;
