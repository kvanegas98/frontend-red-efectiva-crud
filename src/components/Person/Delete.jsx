import { deletePerson } from '../../services/api'; 
import React, { useState } from 'react';


const DeletePerson = ({ person, onSave, onCancel }) => {
    const [showModal, setShowModal] = useState(true); 

    const handleClose = () => {
      onCancel();
      setShowModal(false);
    };
  const handleDelete = async () => {
    try {
      await deletePerson(person.personId);
      onSave()
      setShowModal(false)
    } catch (error) {
      console.error('Error deleting person:', error);
    }

  };

  return (
    showModal && (
      <div className="modal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Eliminar Persona</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
            <p>¿Estás seguro de que quieres eliminar a {person.firstName}  {person.lastName}?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleDelete}>SI</button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>No</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};



export default DeletePerson;
