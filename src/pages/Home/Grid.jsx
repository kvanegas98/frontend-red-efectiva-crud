import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getPerson } from '../../services/api';
import AddPerson from '../../components/Person/AddPerson';
import EditPerson from '../../components/Person/EditPerson';
import DeletePerson from '../../components/Person/Delete';

const GridLayout = () => {
    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editingPerson, setEditingPerson] = useState(false);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [deletePerson, setDeletePerson] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getPerson();
            setPerson(data.persons);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleEditar = (person) => {
        setEditingPerson(person);
        setIsEditPopupOpen(true);
    };

    const handleSaveEdit = (editedPerson) => {
        fetchData();
        setIsEditPopupOpen(false);
    };

    const handleCancelEdit = () => {
        setIsEditPopupOpen(false);
    };

    const handleAdd = () => {
        setIsAddPopupOpen(true);
    };

    const handleSaveAdd = (newPerson) => {
        fetchData();
        setIsAddPopupOpen(false);
    };

    const handleCancelAdd = () => {
        setIsAddPopupOpen(false);
    };


    const handleDelete = (person) => {
        setDeletePerson(person);
        setIsDeletePopupOpen(true);
    };

    const handleSaveDelete = () => {
        fetchData();
        setIsDeletePopupOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDeletePopupOpen(false);
    };


    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-primary ms-2 mt-2" onClick={handleAdd}>
                    <span style={{ marginRight: '5px' }}>+</span> Agregar Persona
                </button>
            </div>


            <div className='table-responsive'>
                <Table striped bordered hover responsive className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Sexo</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Fecha de nacimimiento</th>
                            <th>Estado Civil</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {person.map((res, index) => (
                            <tr key={index}>
                                <td>{res?.firstName}</td>
                                <td>{res?.lastName}</td>
                                <td>{res?.gender}</td>
                                <td>{res?.email}</td>
                                <td>{res?.phone}</td>
                                <td>{res?.dateOfBirth.split('T')[0]}</td>
                                <td>{res?.maritalStatus}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => handleEditar(res)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(res)}
                                    >
                                        Eliminar
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
                {isEditPopupOpen && (
                    <EditPerson
                        person={editingPerson}
                        onSave={handleSaveEdit}
                        onCancel={handleCancelEdit}
                    />

                )}

                {isAddPopupOpen && (
                    <AddPerson
                        onSave={handleSaveAdd}
                        onCancel={handleCancelAdd}
                    />
                )}

                {isDeletePopupOpen && (
                    <DeletePerson
                        person={deletePerson}
                        onSave={handleSaveDelete}
                        onCancel={handleCancelDelete}
                    />

                )}
            </div>
        </>
    );
};

export default GridLayout;
