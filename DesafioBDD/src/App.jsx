import Alert from './components/Alert'
import Buscador from './components/Buscador'
import Formulario from './components/Formulario'
import Listado from './components/Listado'
import { BaseColaboradores } from './components/BaseColaboradores'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'

function App() {

  const [listaDeColaboradores, setListaDeColaboradores] = useState(BaseColaboradores);
  const [alert, setAlert] = useState({ error: '', mensaje: '', color: '' });
  const [buscar, setBuscar] = useState("");

  const agregarColaborador = (nuevoColaborador) => {
    const colaboradorConID = {
      ...nuevoColaborador,
      id: Date.now()
    };

    setListaDeColaboradores([...listaDeColaboradores, colaboradorConID]);

  }

  const manejeElCambio = (evento) => {
    setBuscar(evento.target.value.trim());
  }

  const listaDeColaboradoresFiltrada = listaDeColaboradores.filter((colaborador) => {
    if (
      colaborador.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
      colaborador.correo.toLowerCase().includes(buscar.toLowerCase()) ||
      colaborador.edad.toLowerCase().includes(buscar.toLowerCase()) ||
      colaborador.cargo.toLowerCase().includes(buscar.toLowerCase()) ||
      colaborador.telefono.toLowerCase().includes(buscar.toLowerCase())

    ) {
      return true;
    }

    return false;
  })

  return (
    <>
      <h1 className='fs-1 p-5'>Lista de Colaboradores</h1>
      <Buscador buscar={buscar} manejeElCambio={manejeElCambio} />
      <Listado listaDeColaboradores={listaDeColaboradoresFiltrada} />
      <Formulario listoParaAgregar={agregarColaborador} setAlert={setAlert} />
      {alert.mensaje && <Alert color={alert.color}>{alert.mensaje}</Alert>}
    </>
  )
}

export default App
