import React from 'react';
import ReactDOM from 'react-dom';
import './../App.css';

const Modal = ({ isShowing, hide, text }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <p>
                    ID: {text.id} <br />
                    Name: {text.name} <br />
                    NameType: {text.nametype} <br />
                    RcClass: {text.recclass} <br />
                    Year: {text.year} <br />
                </p>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;