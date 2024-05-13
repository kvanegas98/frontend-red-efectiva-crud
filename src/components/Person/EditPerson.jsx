import React, { useState,useEffect } from 'react';
import { editPerson, getPersonById } from '../../services/api';

const EditPopup = ({ person, onSave, onCancel }) => {
  const [editedPerson, setEditedPerson] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phone: '',
    maritalStatus: '',
  });
  const [showModal, setShowModal] = useState(true); 
  const [errors, setErrors] = useState({}); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson({ ...editedPerson, [name]: value });
  };
  useEffect(() => {
    fetchData();
}, []);

  const fetchData = async () => {
    try {
        const data = await getPersonById(person.personId);
        delete data.dateOfBirth;
        setEditedPerson(data);
    } catch (error) {
        
    } finally {
    }
};


  const validateForm = () => {
    const newErrors = {};

    // Verificar los campos requeridos
    if (!editedPerson.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    if (!editedPerson.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    if (!editedPerson.gender.trim()) {
      newErrors.gender = 'El sexo es requerido';
    }
    if (!editedPerson.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(editedPerson.email.trim())) {
      newErrors.email = 'El email no es válido';
    }
    if (!editedPerson.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!isValidPhoneNumber(editedPerson.phone.trim())) {
      newErrors.phone = 'El teléfono no es válido';
    }
    if (!editedPerson.maritalStatus.trim()) {
      newErrors.maritalStatus = 'El estado civil es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    // Expresión regular para validar teléfono (números solamente)
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return; 
    }

    try {
        const updatedPerson = await editPerson(editedPerson);
        onSave(updatedPerson); 
        setShowModal(false); // Cierra el modal

      } catch (error) {
        console.error('Error saving person:', error);
      }
  };

  const handleClose = () => {
    onCancel();
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="modal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Editar Persona</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onCancel}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">Nombre</label>
                  <input type="text" className={`form-control ${errors.firstName && 'is-invalid'}`} id="firstName" name="firstName" value={editedPerson.firstName} onChange={handleInputChange} />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Apellido</label>
                  <input type="text" className={`form-control ${errors.lastName && 'is-invalid'}`} id="lastName" name="lastName" value={editedPerson.lastName} onChange={handleInputChange} />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">Sexo</label>
                  <select className={`form-select ${errors.gender && 'is-invalid'}`} id="gender" name="gender" value={editedPerson.gender} onChange={handleInputChange}>
                    <option value="">Seleccione el sexo</option>
                    <option value="Male">Masculino</option>
                    <option value="Female">Femenino</option>
                  </select>
                  {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" name="email" value={editedPerson.email} onChange={handleInputChange} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Teléfono</label>
                  <input type="text" className={`form-control ${errors.phone && 'is-invalid'}`} id="phone" name="phone" value={editedPerson.phone} onChange={handleInputChange} />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="maritalStatus" className="form-label">Estado Civil</label>
                  <select className={`form-select ${errors.maritalStatus && 'is-invalid'}`} id="maritalStatus" name="maritalStatus" value={editedPerson.maritalStatus} onChange={handleInputChange}>
                    <option value="">Seleccione el estado civil</option>
                    <option value="Single">Soltero</option>
                    <option value="Married">Casado</option>
                    <option value="Divorced">Divorciado</option>
                  </select>
                  {errors.maritalStatus && <div className="invalid-feedback">{errors.maritalStatus}</div>}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditPopup;
