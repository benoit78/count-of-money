import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import './style.css'
import {FcGoogle} from 'react-icons/fc'
import { register } from '../../../services/authentification';

import {useNavigate} from 'react-router-dom';
import { useLogged } from '../Hooks';

const defaultValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  role: "user"
};

const Register = () => {


  const [values, setValues] = React.useState(defaultValues);
  const [err, setErr] = React.useState(null);
  const { handleConnect } = useLogged();

  const navigate = useNavigate();

  const handleChange = async () => {
    const { email, password, firstName, lastName, role } = values;

    if (err) setErr(null);

    const res = await register(firstName, lastName, email, password, role);

    if (!res) setErr({ type: "BadCredentials" });
    else  navigate('/');

    handleConnect()
  };

    return (
        <div style={{ alignItems: 'center' }}>
          <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Col lg={1}>
              <h3 style={{ fontSize: '2rem' }}>
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">Création d'un compte</h1>
                  <br></br>
                </div>
                {/* <Form> */}
                  <Row className="mb-3 h6">
                    <Form.Group as={Col} controlId="formGridPrenom">
                      <Form.Label>Prénom*</Form.Label>
                      <Form.Control  type="text"className="square "  placeholder="Prénom" onChange={e => setValues({...values, firstName: e.target.value})}  value={values.firstName} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNom">
                      <Form.Label>Nom*</Form.Label>
                      <Form.Control type="text" className="square "  placeholder="Nom" onChange={e => setValues({...values, lastName: e.target.value})}  value={values.lastName} />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 h6">
                    <Form.Group className="mb-3" controlId="formGridEmail">
                      <Form.Label>E-mail*</Form.Label>
                      <Form.Control type="text" className="square " placeholder="E-mail" onChange={e => setValues({...values, email: e.target.value})}  value={values.email} />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 h6">
                    <Form.Group className="mb-3" controlId="formGridMotDePasse">
                      <Form.Label>Mot de Passe*</Form.Label>
                      <Form.Control type="password" className="square " placeholder="Mot de passe" onChange={e => setValues({...values, password: e.target.value})}  value={values.password} />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 h6">
                    <div className="positionbtn">
                      <Button className="mb-3 square bg-primary " type="submit" onClick={handleChange}>
                        Créer un Compte
                      </Button>
                    </div>
                      <Form.Group className="mb-3 text-center" controlId="formGridMotDePasse">
                        Ou
                      </Form.Group>
                      <div className="positionbtn">
                      <Button className="bg-transparent text-dark mb-3  border-secondary color" type="submit">
                        <FcGoogle /> Créer un compte avec Google
                      </Button>
                    </div>
                    <div className="mb-3 text-center">
                      <p className="h6">Déjà un compte ? <a href="/login">Se connecter</a></p>
                    </div>
                  </Row>
                {/* </Form> */}
              </div>
              </h3>
            </Col>
          </Row>
        </div>
      );
}

export default Register;