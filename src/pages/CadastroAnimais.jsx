// importando compontentes do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

// importação de compontentes
import NavBarra from "../components/NavBarra";
import { useState, useEffect } from "react";

// importação do Navigate
import { useNavigate } from "react-router-dom";

const urlEspecies = "http://localhost:5000/especies";
const urlAnimais = "http://localhost:5000/animais";

const CadastroAnimais = () => {
  // lista de especie
  const [especies, setEspecies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(urlEspecies);
        const raca = await req.json();
        console.log(raca);
        setCategorias(raca);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);



  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [vacina, setVacina] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

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
      if (especie !== "") {
        if (raca !== "") {
          const animal = { nome, especie, raca, vacina, imagemUrl };
          console.log(animal);
          try {
            const req = await fetch(urlAnimais, {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(animal),
            });
            const res = req.json();
            console.log(res);
            setAlertClass("mb-3 mt-2");
            setAlertVariant("success");
            setAlertMensagem("Animal cadastrado com sucesso");
            alert("Animal efetuado com sucesso");
            //navigate("/home");
          } catch (error) {
            console.log(error);
          }
        } else {
          setAlertClass("mb-3 mt-2");
          setAlertMensagem("O campo vacina não pode ser vazio");
        }
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("O campo especie não pode ser vazio");
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
        <h1>Cadastrar Animaiss</h1>
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
                  placeholder="Digite o nome do Animal"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FloatingLabel>

              {/* Caixinha de Raça */}
              <FloatingLabel
                controlId="floatingInputeRaca"
                label="Raça"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite a Raça do Animal"
                  value={especie}
                  onChange={(e) => setRaca(e.target.value)}
                />
              </FloatingLabel>
              {/* select de raca */}
              <Form.Group controlId="formGridTipo" className="mb-3">
                <Form.Label>Tipo de animal</Form.Label>
                <Form.Select
                  value={especie}
                  onChange={(e) => {
                    setEspecie(e.target.value);
                  }}
                >
                  {especie.map((especie) => (
                    <option key={especie.id} value={especie.nome}>
                      {especie.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Caixinha de Vacina */}
              <FloatingLabel
                controlId="floatingInputVacina"
                label="Vacina"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="O animal foi Vacinado?"
                  value={vacina}
                  onChange={(e) => setVacina(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="formFileLg" className="mb-3">
                {/* Caixinha da Imagem */}
                <FloatingLabel
                  controlId="floatingInputImage"
                  label="Envie o link da imagem do animal"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Envie o link da imagem do animal"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                  />
                </FloatingLabel>
                <Image
                  src={imagemUrl === "" ? linkImagem : imagemUrl}
                  rounded
                  width={300}
                  height={300}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Alerta caso haja erro */}
          <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>

          {/* Botão para enviar o formulario de cadastro de animal */}

          <Button variant="primary" size="lg" type="submit">
            Cadastrar
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CadastroAnimais;