// importando compontentes do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";


// importação de compontentes
import NavBarra from "../components/NavBarra";
import { useState, useEffect } from "react";

// importação do Navigate
import { useNavigate } from "react-router-dom";

const urlUser = "http://localhost:5000/usuario";

const CadastroUsuario = () => {


  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");

  // Variaveis para alerta
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  // Criando o navigate
  const navigate = useNavigate();

  //  Função pra lidar com recarregamento da pagina
  const handleSubmit = async (e) => {
    // previne a pagina de se recarregada
    e.preventDefault();
    if (nome !== "") {
      if (email !== "") {
        if (senha !== "") {
          const Usuario = { nome, email, senha, confirmacao };
          console.log(Usuario);
          try {
            const req = await fetch(urlUser, {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(Usuario),
            });
            const res = req.json();
            console.log(res);
            setAlertClass("mb-3 mt-2");
            setAlertVariant("success");
            setAlertMensagem("Usuario cadastrado com sucesso");
            alert("Usuario efetuado com sucesso");
            //navigate("/home");
          } catch (error) {
            console.log(error);
          }
        } else {
          setAlertClass("mb-3 mt-2");
          setAlertMensagem("O campo senha não pode ser vazio");
        }
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("O campo email não pode ser vazio");
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("O campo nome não pode ser vazio");
    }
  };

  return (
    <div>
      <NavBar />
      <Container>
        <h1>Cadastrar Usuarios</h1>
        <form className="mt-3" onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              {/* Caixinha de Nome */}
              <FloatingLabel
                controlId="floatingInputNome"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do Usuario"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FloatingLabel>

              {/* Caixinha de email */}
              <FloatingLabel
                controlId="floatingInputDescrição"
                label="email"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite o email do Usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>

              {/* Senha */}
              <FloatingLabel
                controlId="floatingInputPreco"
                label="senha"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  step="0.1"
                  placeholder="Digite a senha do Usuario"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FloatingLabel>

              {/* Confirmacao */}
              <FloatingLabel
                controlId="floatingInputPreco"
                label="confirmacao"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  step="0.1"
                  placeholder="Confirme a senha"
                  value={confirmacao}
                  onChange={(e) => setConfirmacao(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            {/* <Col xs={6}> </Col> */}
          </Row>

          {/* Alerta caso haja erro */}
          <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>

          {/* Botão para enviar o formulario de cadastro de usuario */}

          <Button variant="primary" size="lg" type="submit">
            Cadastrar
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CadastroUsuario;