/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Row, Col } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const ProfilModal = ({user, showFromProfil, ...props }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // console.log(user ? user.list : [])

    const columns=[
        {
         name: 'crypto monnaie',
         with: "100%",
         cell: row=> row.id
        }
    ]

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Information Utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group className="mb-3" controlId="formGridPassword">
                <Row className="mb-3 h6">
                    <Form.Group as={Col} controlId="formGridPrenom">
                      <Form.Control value={user ? user.firstname : ""} className="square" disabled/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNom">
                      <Form.Control value={user ? user.lastname: ""} className="square" disabled/>
                    </Form.Group>
                  </Row>
            </Form.Group>
            <Row>
                <Form.Group as={Col}>
                    <Form.Control value={user ? user.email : ""} className="square" disabled/>
                </Form.Group>
            </Row>
            <div style={{paddingLeft: '1.5rem'}}>
                Favoris
            </div>
            <div style={{maxHeight: '5rem'}}>
                <DataTable
                    data={user ? user.list : []}
                    columns={columns}
                />
            </div>
         
            </Modal.Body>
            <Modal.Footer style={{justifyContent: 'center'}}>
                <Button variant="primary" onClick={ handleClose }>
                Sauvegarder
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProfilModal;