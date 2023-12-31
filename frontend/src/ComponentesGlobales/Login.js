import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Stack,
  Button,
  Form,
  Spinner
} from "react-bootstrap";
import { FaVial } from 'react-icons/fa';
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import {client, login, getUser, decodedToken, register} from '../api_service/user_api.js'
//import {jwt} from 'jsonwebtoken'
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const mostrarFormularioRegistro = () => {
  setMostrarRegistro(true);
};

const volverAInicioSesion = () => {
  setMostrarRegistro(false);
};

  const [formulario, setFormulario] = useState({
    email: "",
    nombre:"",
    contrasena: "",
  });

  const { email, nombre,contrasena } = formulario;
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    setTextVisible(true);
  }, []);

  const handleInputChangue = (event) => {
    
    const { name, value } = event.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmitLogin = async (event) => {
    console.log("Usando handle submit de login")
    event.preventDefault()
    if (!email || !contrasena) {
      // Mostrar una alerta de error
      alert("Por favor, completa todos los campos");
      return;
    }

    try{
      setLoading(true)
      const token = await login(email,contrasena)
      console.log(token.data)
      const data = await decodedToken(token.data['access_token'])
      //console.log(data.data)
      //navigate('/administrador/tablero');
      localStorage.setItem('accessToken',token.data['access_token'])
      localStorage.setItem('user',data.data['nombre'])
      localStorage.setItem('email',data.data['email'])
      localStorage.setItem('scopes',data.data['scopes'])
      console.log(localStorage.getItem('accessToken'))
      console.log(localStorage.getItem('user'))
      console.log(localStorage.getItem('email'))
      console.log(localStorage.getItem('scopes'))
      
      if (data.data['scopes'][0] === 'admin'){
        navigate("/administrador/tablero")
      }
      else if(data.data['scopes'][0] === 'assist'){
        navigate("/ayudante/tablero")
      }else{
        navigate("/estudiante/tablero")
      }
      
    }
    catch(error){
      console.log("ha ocurrido un error " + error)
      alert("Email o contraseña incorrectos")
    }
    setLoading(false)
  };

  const handleSubmit = async(event) => {
    console.log("Usando handle submit de registro")
    //Registrar usuario
    event.preventDefault()
    if (!email || !contrasena) {
      // Mostrar una alerta de error
      alert("Por favor, completa todos los campos");
      return;
    }
    try
    {
      setLoading(true)
      console.log("email",email,"nombre",nombre,"password",contrasena)
      const registered = await register(email,nombre,contrasena)
      console.log(registered)
      setMostrarRegistro(false)
    }
    catch(error)
    {
      console.log("ha ocurrido un error " + error)
      alert("Ya existe un usuario con ese correo")
    }
    setLoading(false)
  };


  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row style={{ height: "100%" }}>
        <Col md={8} className="d-flex flex-column columna111">
          <Row style={{ flex: "10%" }}>
            <Col className="barraSuperiorXD">
              <Stack direction="horizontal" gap={5}>
                <div className="Logo">
                  <FaVial  className="bugIcon" />
                  <span className="bugTextXD">LabControl+</span>
                </div>

              </Stack>
            </Col>
          </Row>
          <Row style={{ flex: "55%" }}>
            <Col className="headerColo">
              <h1 className="headerTexto">
                {textVisible && (
                  <>
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      D
                    </motion.span>
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      e
                    </motion.span>
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      s
                    </motion.span>
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      c
                    </motion.span>
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      u
                    </motion.span>
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      b
                    </motion.span>
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      r
                    </motion.span>
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      e
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      {" "}
                    </motion.span>
                    
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      l
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1 }}
                    >
                      a
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                    >
                      {" "}
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      i
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.3 }}
                    >
                      n
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                    >
                      n
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.5 }}
                    >
                      o
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                    >
                      v
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.7 }}
                    >
                      a
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                    >
                      c
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.9 }}
                    >
                      i
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2 }}
                    >
                      ó
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2.1 }}
                    >
                      n
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2.2 }}
                    >
                      {" "}
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2.3 }}
                    >
                      e
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2.4 }}
                    >
                      n
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2.5 }}
                    >
                      {" "}
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2.6 }}
                    >
                      g
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2.7 }}
                    >
                      e
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2.8 }}
                    >
                      s
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 2.9 }}
                    >
                      t
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 3 }}
                    >
                      i
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 3.1 }}
                    >
                      ó
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 3.2 }}
                    >
                      n
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 3.3 }}
                    >
                      {" "}
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 3.4 }}
                    >
                      d
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 3.5 }}
                    >
                      e
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 3.6 }}
                    >
                      {" "}
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 3.7 }}
                    >
                      l
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 3.8 }}
                    >
                      a
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 3.9 }}
                    >
                      b
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 4 }}
                    >
                      o
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 4.1 }}
                    >
                      r
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 4.2 }}
                    >
                      a
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 4.3 }}
                    >
                      t
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 4.4 }}
                    >
                      o
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 4.5 }}
                    >
                      r
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 4.6 }}
                    >
                      i
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 4.7 }}
                    >
                      o
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 4.8 }}
                    >
                      s
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 4.9 }}
                    >
                      {" "}
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 5 }}
                    >
                      c
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 5.1 }}
                    >
                      o
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 5.2 }}
                    >
                      n
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 5.3 }}
                    >
                      {" "}
                    </motion.span>

                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 5.4}}
                    >
                      L
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 5.5 }}
                    >
                      a
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 5.6 }}
                    >
                      b
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 5.7 }}
                    >
                      C
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 5.8 }}
                    >
                      o
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 5.9 }}
                    >
                      n
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 6 }}
                    >
                      t
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 6.1 }}
                    >
                      r
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 6.2 }}
                    >
                      o
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 6.3 }}
                    >
                      l
                    </motion.span>
                    <motion.span
                      className="slideInControls"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 6.4}}
                    >
                      +
                    </motion.span>

                   
                  </>
                )}
              </h1>
            </Col>
          </Row>
          {/* <Row style={{ flex: "20%" }}>
            <Col className="textColo">
              <p className="parrafooo">
                BugFixer es la solución perfecta para tus proyectos.
                Colaboración de clientes, administradores y depuradores de forma
                ágil y sencilla. Optimiza tu proceso de desarrollo y garantiza
                la calidad de tu proyecto
              </p>
            </Col>
          </Row> */}
          <Row style={{ flex: "15%" }}>
            <Col className="contenedor-iconooo">
              {/* <BsArrowDown className="iconooo" /> */}
            </Col>
          </Row>
        </Col>

        <Col md={4} className="d-flex flex-column columna2 ">
          <Row style={{ flex: "100%" }}>

            <Col
              md={12}
              className="d-flex justify-content-center align-items-center Columna-formulario "
            >

            {loading ? (
            <div className='loading-spinner'>
                <Spinner animation="border" role="status" size="lg">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
            ):  
            !mostrarRegistro ? (  
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="formulario"
                    type="email"
                    placeholder="Ingresar email"
                    name="email"
                    value={email}
                    onChange={handleInputChangue}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    className="formulario"
                    type="password"
                    placeholder="Ingresar contraseña"
                    onChange={handleInputChangue}
                    value={contrasena}
                    name="contrasena"
                  />
                </Form.Group>
                <Form.Group >
                <p className="mt-1 centrar-texto link-simulado">
                  ¿Contraseña olvidada?
                </p>                 
                </Form.Group>

              <Button className="formulario" onClick={handleSubmitLogin}  variant="dark" type="submit">
                Iniciar sesion
              </Button>
              <p className="mt-3">
                ¿No tienes una cuenta? <span className="link-simulado" onClick={mostrarFormularioRegistro}>Regístrate</span>
              </p>
            </Form>
          ) : (

            <Form >
                {/* REGISTRO */}
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    className="formulario"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    name="nombre"
                    value={nombre}
                    onChange={handleInputChangue}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="formulario"
                    type="email"
                    placeholder="Ingresar email"
                    name="email"
                    value={email}
                    onChange={handleInputChangue}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    className="formulario"
                    type="password"
                    placeholder="Ingresar contraseña"
                    onChange={handleInputChangue}
                    value={contrasena}
                    name="contrasena"
                  />
                </Form.Group>
{/* 
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Repetir contraseña</Form.Label>
                  <Form.Control
                    className="formulario"
                    type="password"
                    placeholder="Ingresar contraseña"
                    onChange={handleInputChangue}
                    value={contrasena}
                    name="contrasena"
                  />
                </Form.Group>
 */}
                <Button className="formulario" onClick={handleSubmit} variant="dark" type="submit">
                Registrarte
              </Button>
              <p className="mt-3">
                ¿Tienes una cuenta? <span className="link-simulado" onClick={volverAInicioSesion}>Inicia sesión</span>
              </p>
            </Form>
          )}

            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;