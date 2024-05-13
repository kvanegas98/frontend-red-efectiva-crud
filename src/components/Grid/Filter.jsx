import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getDataUsers, getAllDataPostsById, getDataPosts } from '../../services/api';

const Filters = ({ dataPosts: initialDataPosts, setDataPost }) => {
    const [usersData, setUsersData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [originalDataPosts, setOriginalDataPosts] = useState([]);
    const [sortByTitleAscending, setSortByTitleAscending] = useState(true);
    const [filterType, setFilterType] = useState('user');

    useEffect(() => {
        setOriginalDataPosts(initialDataPosts);
    }, [initialDataPosts]);

    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        try {
            const userData = await getDataUsers();
            setUsersData(userData);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };
    

    const fetchFilteredPosts = async (userId) => {
        try {
            const postsData = userId ? await getAllDataPostsById(userId) : await getDataPosts();
            setDataPost(postsData?.map((post) => ({
                ...post,
                user: usersData.find((user) => user.id === post.userId)
            })));
            setOriginalDataPosts(postsData);
            if (filterType === 'title') {
                handleSortByTitle(); // Mantener la dirección del ordenamiento si se filtra por título
            }
        } catch (error) {
            console.error('Error fetching filtered posts:', error);
        }
    };

    const handleUserSelectionChange = (event) => {
        const userId = event.target.value;
        setSelectedUserId(userId);
        setFilterType('user');
        fetchFilteredPosts(userId);
    };

    const handleSortByTitle = () => {
        const newData = [...originalDataPosts];
        const sortedData = newData.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (sortByTitleAscending) {
                return titleA.localeCompare(titleB);
            } else {
                return titleB.localeCompare(titleA);
            }
        });
        setDataPost(sortedData);
        setSortByTitleAscending(!sortByTitleAscending);
        setFilterType('title');
    };

    const handleSearchInputChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        setSearchText(searchText);

        if (!searchText) {
            fetchFilteredPosts(selectedUserId);
        } else {
            const filtered = originalDataPosts.filter((post) => post.body.toLowerCase().includes(searchText));
            setDataPost(filtered);
        }
        setFilterType('search');
        // setSortByTitleAscending(true);
    };

    const handleResetFilters = () => {
        setSearchText('');
        setSelectedUserId('');
        fetchFilteredPosts('');
        setFilterType('');
    };

    return (
        <>
            <div className="filters-container mt-4 p-4 bg-light rounded">
                <Row className="align-items-center">
                    <Col xs={8} md={8} lg={8}>
                        {/* <Form.Label>Seleccione un usuario:</Form.Label> */}
                        <Form.Select
                            aria-label="Seleccione un usuario"
                            onChange={handleUserSelectionChange}
                            value={selectedUserId}
                        >
                            <option value="">Seleccione un usuario</option>
                            {usersData.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col xs={4} md={4} lg={4} >
                        <Button
                            variant="danger"
                            onClick={handleResetFilters}
                        >
                            <i class="bi bi-arrow-clockwise"></i> Restablecer
                        </Button>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs={8} md={8} lg={8} className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Buscar texto en body"
                            onChange={handleSearchInputChange}
                            value={searchText}
                        />
                    </Col>
                    <Col xs={4} md={4} lg={4} className="mb-3" >
                        <Button
                            variant="primary"
                            onClick={handleSortByTitle}
                        >
                            {sortByTitleAscending ? <i class="bi bi-caret-down"></i> : <i class="bi bi-caret-up"></i>}  Ordenar por Título 
                            {/* {sortByTitleAscending ? '↓' : '↑'} */}
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Filters;
