import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Row, Col, Nav, Form, Tab, Card, Button } from 'react-bootstrap'
import banner_img from '../../images/crypto_banner.jpg';
import { ImBin } from 'react-icons/im';
import { columns as defaultColumns } from './data';
import './style.css'
import ProfilModal from '../../components/Modal/ProfilModal';
import { getRole } from '../../services/authentification';
import { deleteUserById, getAllUsers, getUserById, updatedUser } from '../../services/user';
import { useUser } from '../Hooks/useUser';

const defaultValues = {
  email: "",
};

const Profil = (props) => {

  const [show, setShow] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [userValue, setUserValue] = useState();
  const [values, setValues] = React.useState(defaultValues);
  const [err, setErr] = React.useState(null);
  const role = getRole()
  const { user } = useUser();

  const loasUser = React.useCallback(() => {
    (async () => {
      const _userList = await getAllUsers();
      const newArray = _userList.filter((user) => user.role !== "root")
      setListUser(newArray);
          })();
  }, []);

  React.useEffect(() => loasUser(), [loasUser]);

  // const handleDeleteUser = async (id) => {
 
  // }


  const handleSeeUserProfil = async (id) => {
    const userInfo = await getUserById(id)
    setUserValue(userInfo)
    setShow(true)
  }

  const columns = [
    ...defaultColumns,
    {
        name: "Actions",
        width: "40%",
        cell: row =>
            <>
            <Button
                onClick={()=> handleSeeUserProfil(row._id)}
                style={{ marginRight: "5px" }}
            >
              Voir plus
            </Button>
            <Button
                variant="danger"
                onClick={() =>{ handleRemoveUser(row._id)}}
            >
              <ImBin
              style={{ marginRight:' 0.5rem'}}
              />
              Supprimer
            </Button>
            </>
    }
  ]

  const handleUpdateEmail = async() => {

    if (err) setErr(null);

    const res = await updatedUser(user._id, values.email);

    if (!res) setErr({ type: "BadCredentials" });
  }

  const handleRemoveUser = async (id) => {
    if (err) setErr(null);

    const res = await deleteUserById(id);

    if (!res) setErr({ type: "BadCredentials" });

    const _listUser = [...listUser]

    const userIndex = _listUser.findIndex(({_id}) => _id === res._id)
    if (userIndex !== -1) _listUser.splice(userIndex, 1);
    setListUser(_listUser)
  }


  return (
    <div style={{ width: '100vw' }}>
      <Col lg={5}>
        <img  style={{ width:'100vw', height:'15rem' }} src={banner_img} alt="bgCrypto" />
        <Tab.Container id="left-tabs-example" defaultActiveKey={role === "root" ? "user" : "email"}>
          <Row style={{ width:'100vw', paddingTop:'25px', paddingLeft:'25px', paddingRight:'25px' }}>
            <Col md={3}>
              <Nav variant="pills" className="flex-column">
                {
                  role === "user" ?
                  <>
                   <Nav.Item>
                  <Nav.Link eventKey="email">Email</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="password">Mot de passe</Nav.Link>
                </Nav.Item> */}
                  </>  :
                   ""
                }
                {
                  role === "root" ?
                  <Nav.Item>
                    <Nav.Link eventKey="user">Liste des utilisateurs</Nav.Link>
                  </Nav.Item> :
                  ""
                }
              </Nav>
            </Col>
            <Col md={9}>
            <Tab.Content>
              {
                role === "user" ?
                <>
                <Tab.Pane eventKey="email">
                  <Card style={{ width:'700px', height:'300px' }}>
                    <Card.Body>
                      <Row className="h5">
                        <Form.Group className="mb-3" controlId="formGridEmail">
                          <Form.Label>Changer l'adresse e-mail</Form.Label>
                          <br></br>
                          <Form.Control className="square rounded-pill" placeholder="E-mail" onChange={e => setValues({...values, email: e.target.value})}  value={values.email}/>
                        </Form.Group>
                        <Button variant="primary" onClick={handleUpdateEmail}>changer votre adresse mail</Button>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="password">
                  <Card style={{ width:'700px', height:'300px' }}>
                    <Card.Body>
                      <Row className="h5">
                        <Form.Group className="mb-3" controlId="formGridPassword">
                          <Form.Label>Changer le mot de passe</Form.Label>
                          <br></br>
                          <Form.Text>Utilisez un mot de passe unique pour assurer la sécurité de votre compte</Form.Text>
                          <Form.Control className="square rounded-pill" placeholder="Password" />
                        </Form.Group>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                </>
                :
                ""
              }
                {
                  role === "root" ?
                  <>
                  <Tab.Pane eventKey="user">
                  <Card style={{ width:'100%' }}>
                    <Card.Body>
                      <Row className="h5">
                        <Form.Group className="mb-3" style={{width: '50rem'}} controlId="formGridPassword">
                          <DataTable
                            data={listUser}
                            columns={columns}
                          />
                          <ProfilModal
                            show={ show }
                            onHide={() => setShow(false)}
                            user={userValue}
                          />
                        </Form.Group>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                  </>
                  : ""
                }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Col>
    </div>
  );
};

export default Profil;