import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {

  //states
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais:"",
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({})
  const [error, guardarError] = useState(false)


  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar){
        const appId = '47d9fe7d262a355a9f572e3763aed97b';

        //en caso de que el proyecto este alojado en un server con https se debe modificar la url a https
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado); // aca se guardan los resultados
        guardarConsultar(false)
        if(resultado.cod === '404'){
          guardarError(true)
        }else{
          guardarError(false)
      
        }

      }
      
    }
    // para evitar que se muestren errores:
    
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);

  //carga condicional de componente, se crea un state de error y se valida para luego mostrar la respuesta
  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados o puedes verificar los datos de ingreso"/>
  }
  else{
    componente =<Clima 
                  resultado = {resultado}
                />
  }

  return (
    <Fragment>
      <Header 
      titulo = "Clima react app"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda= {guardarBusqueda}
                guardarConsultar = {guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente} 
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
