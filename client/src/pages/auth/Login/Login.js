import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { login, registerLoginGoogle } from '../../../services/authentification';
import './style.css'
import {FcGoogle} from 'react-icons/fc'
import { useLogged } from '../Hooks';

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {

  const [values, setValues] = React.useState(defaultValues);
  const [err, setErr] = React.useState(null);
  const { handleConnect } = useLogged();

  const handleChange = async () => {
    const { email, password } = values;

    if (err) setErr(null);

    const res = await login(email, password);

    if (!res) setErr({ type: "BadCredentials" });

    handleConnect()

  };

  const handleGoogle = async () => {
    const res = await registerLoginGoogle();
    if (!res) setErr({ type: "BadCredentials" });

    // handleConnect()
  }

    return (
        <div style={{ alignItems: 'center' }}>
          <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Col lg={1}>
              <h3 style={{ fontSize: '2rem' }}>
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">Se connecter</h1>
                </div>
                {/* <Form> */}
                  <Row className="mb-3 h6">
                    <Form.Group className="mb-3" controlId="formGridEmail">
                      <Form.Label>E-mail*</Form.Label>
                      <Form.Control className="square " placeholder="E-mail"  onChange={e => setValues({...values, email: e.target.value})}  value={values.email} />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 h6">
                    <Form.Group className="mb-3" controlId="formGridMotDePasse">
                      <Form.Label>Mot de Passe*</Form.Label>
                      <Form.Control type="password" className="square " placeholder="Mot de passe"  onChange={e => setValues({...values, password: e.target.value})}  value={values.password} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3 h6">
                    <div className="positionbtn">
                      <Button className="mb-3 square bg-primary " type="submit" onClick={handleChange}>
                        Se connecter
                      </Button>
                    </div>
                    <Form.Group className="mb-3 text-center" controlId="formGridMotDePasse">
                      Ou
                    </Form.Group>
                    <div className="positionbtn">
                      <Button onClick={handleGoogle} className="bg-transparent text-dark mb-3 border-secondary color" type="submit">
                        <FcGoogle /> Se connecter avec Google
                      </Button>
                    </div>
                    <div className="mb-3 text-center">
                      <p className="h6">Vous n'avez pas de compte ? <a href="/register">Créer un compte</a></p>
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

export default Login;