import React, { useState, useEffect } from "react";
import { getData } from "./services/callAPI";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

function App() {
  const dataAlquiler = [
    { id: 1, cliente: 1, camara: 1, estado: 0, dias: 1 },
    { id: 2, cliente: 1, camara: 1, estado: 0, dias: 1 },
    { id: 3, cliente: 1, camara: 1, estado: 0, dias: 1 },
  ];

  const [data, setData] = useState(dataAlquiler);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [dataValues, setDataValues] = useState({
    id: "",
    cliente: "",
    camara: "",
    estado: "",
    dias: "",
  });

  useEffect(() => {
    getData("http://localhost:5000/api/enalquiler").then(
      ({ id, cliente, camara, estado, dias }) => {
        console.log("data : ", { id, cliente, camara, estado, dias });
        setDataValues({
          id: id,
          cliente: cliente,
          camara: camara,
          estado: estado,
          dias: dias,
        });
      }
    );
  }, []);

  const seleccionarRegistro = (elemento, caso) => {
    setDataValues(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editar = () => {
    var dataNueva = data;
    data.forEach((resp) => {
      if (resp.id === dataValues.id) {
        resp.cliente = dataValues.cliente;
        resp.camara = dataValues.camara;
        resp.estado = dataValues.estado;
        resp.dias = dataValues.dias;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  };

  const eliminar = () => {
    setData(data.filter((registro) => registro.id !== dataValues.id));
    setModalEliminar(false);
  };

  const abrirModalInsertar = () => {
    setDataValues(null);
    setModalInsertar(true);
  };

  const insertar = () => {
    var valorInsertar = dataValues;
    valorInsertar.id = data[data.length - 1].id + 1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  };

  return (
    <div className="App">
      <h1>CAM-APP</h1>
      <h2>Registro de Alquiler</h2>
      <br />
      <button className="btn btn-success" onClick={() => abrirModalInsertar()}>
        Insertar
      </button>
      <br />
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Camara</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elemento) => (
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.cliente}</td>
              <td>{elemento.camara}</td>
              <td>{elemento.estado}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarRegistro(elemento, "Editar")}
                >
                  Editar
                </button>{" "}
                {"   "}
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarRegistro(elemento, "Eliminar")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Cliente</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="cliente"
              value={dataValues && dataValues.cliente}
            />
            <br />

            <label>Camara</label>
            <input
              className="form-control"
              type="text"
              name="camara"
              value={dataValues && dataValues.camara}
              onChange={handleChange}
            />
            <br />

            <label>Estado</label>
            <input
              className="form-control"
              type="text"
              name="estado"
              value={dataValues && dataValues.estado}
              onChange={handleChange}
            />
            <br />

            <label>Dias</label>
            <input
              className="form-control"
              type="text"
              name="dias"
              value={dataValues && dataValues.dias}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el registro{" "}
          {dataValues && dataValues.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Cliente</label>
            <input
              className="form-control"
              type="text"
              name="cliente"
              value={dataValues ? dataValues.cliente : ""}
              onChange={handleChange}
            />
            <br />

            <label>Camara</label>
            <input
              className="form-control"
              type="text"
              name="camara"
              value={dataValues ? dataValues.camara : ""}
              onChange={handleChange}
            />
            <br />

            <label>Estado</label>
            <input
              className="form-control"
              type="text"
              name="estado"
              value={dataValues ? dataValues.estado : ""}
              onChange={handleChange}
            />
            <br />

            <label>Dias</label>
            <input
              className="form-control"
              type="text"
              name="dias"
              value={dataValues ? dataValues.dias : ""}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
