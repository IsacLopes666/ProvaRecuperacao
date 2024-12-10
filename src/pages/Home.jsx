import React from 'react'
import CardAnimal from '../components/CardAnimal'
import Container from "react-bootstrap/Container";

// importar o hook useState para monitorar a mudança das variaveis
import { useState, useEffect } from "react";

//Importação de componentes
import NavBarra from '../components/NavBarra';

const url = "http://localhost:5000/animais"


const Home = () => {
  const [animais, setAnimal] = useState([])
  
  // useEffect pra puxar os dados da API
  useEffect(() =>{
    async function fetchData(){
      try{
        const req = await fetch(url)
        const animais = await req.json()
        console.log(animais)
        setAnimal(animais)
      }
      catch(erro){
        console.log(erro.message)
      }
    }
    fetchData()
  }, [])
  
  return (
    <div>
      <NavBar/>
      <h1>Animals</h1>
      <Container>
      <div className='lista-animals d-flex col-12 gap-4 mt-3 justify-content-center flex-wrap'>

      {animals.map((animal) =>
      <CardAnimal  
        key={animal.key}
        id={animal.id} 
        nome={animal.nome}
        vacina={animal.vacina}
        raca={animal.raca}
        especie={animal.especie}
        imagemUrl={animal.imagemUrl}
        />
      )}
     

      </div>
      </Container>
    </div>
  )
}

export default Home
