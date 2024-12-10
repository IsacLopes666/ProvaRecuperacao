import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardAnimal = (props) => {
  // Funcao pra deletar um animal
  const handleDelete = async (e) => {
    const req = await fetch(`http://localhost:5000/animals/${props.id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    console.log(res);
    alert(`Produto ${res.nome} removido`);
  };

  return (
    <div>
      <Card style={{ width: "16rem", height: "30rem" }}>
        {/* Imagem do card */}
        <Card.Img variant="top" src={props.imagemUrl} height="200px" />
        <Card.Body>

          <Card.Title>{props.nome}</Card.Title>
        
          <Card.Subtitle className="mb-2 text-muted">
            Vacinado: {props.vacina}
          </Card.Subtitle>

          <Card.Text>
            {" "}
            <b>Especie:</b> <br />
            {props.especie}
          </Card.Text>
          <Card.Text>
            {" "}
            <b>Raça:</b> <br />
            {props.raca}
          </Card.Text>

          <Card.Link href={`/animal/editar/${props.id}`}>
            <Button variant="info">Editar</Button>
          </Card.Link>

          <Card.Link href="/home">
            <Button variant="danger" type="button" onClick={handleDelete}>
              Excluir
            </Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduto;
