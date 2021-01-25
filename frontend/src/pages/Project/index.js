import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import swal from "sweetalert";
import "./style.css";

import logo from "../../assets/fpf-logo.svg";

import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Project() {
  const [name, setName] = useState("");
  const [start_date, setstart_date] = useState("");
  const [finish_date, setfinish_date] = useState("");
  const [budget, setBudget] = useState("");
  const [project_risk, setproject_risk] = useState("");
  const [participants, setParticipants] = useState([]);

  const history = useHistory();

  async function handleNewProject(e) {
    e.preventDefault();

    const dataInputs = {
      name,
      start_date,
      finish_date,
      budget,
      project_risk,
      participants,
    };
    console.log(dataInputs);
    try {
      await api.post("/project/new", dataInputs);
      swal({
        title: "Projeto cadastrado",
        text: "Estamos voltando para a tela inicial.",
        icon: "success",
      }).then(() => {
        history.push("/");
      });
    } catch (err) {
      swal({
        title: "Erro ao cadastrar o projeto",
        text: "Por favor, tente novamente!",
        icon: "warning",
      });
      return err;
    }
  }

  return (
    <>
      <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
  <a class="navbar-brand" href="#">
  <img
                src={logo}
                width="120"
                className="d-inline-block align-top"
                alt=""
                loading="lazy"
              />
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
         <Link className="text-uppercase text-dark" to="/"><FaArrowLeft /> Voltar </Link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      
    </form>
  </div>
</nav>
      </div>
      <div className="container"> 
        <div class="card mg-top-card">
        <h5 class="card-title text-center text-uppercase">Cadastradar novos projetos</h5>
        <br/>
          <div class="card-body">
          <div className="container">
        <form className="">
          <div className="form-row">
            <div className="col mb-3">
              <div className="form-group">
                <label htmlFor="">Nome do projeto</label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="">Data de início</label>
                <input
                  className="form-control"
                  type="date"
                  value={start_date}
                  onChange={(e) => setstart_date(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="">Data final</label>
              <input
                className="form-control"
                type="date"
                value={finish_date}
                onChange={(e) => setfinish_date(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <hr />
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="">Valor do investimento</label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div className="col-md-8 mb-3">
              <div className="form-group">
                <label htmlFor="">Risco do projeto</label>
                <select
                  className="form-control"
                  type="text"
                  value={project_risk}
                  onChange={(e) => setproject_risk(e.target.value)}
                  required={true}
                >
                  <option></option>
                  <option value="0">Baixo</option>
                  <option value="1">Médio</option>
                  <option value="2">Alto</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col mb-3">
              <div className="form-group">
                <label htmlFor="">Participantes</label>
                <input
                  className="form-control"
                  type="text"
                  onDoubleClick={(e) =>
                    setParticipants(participants.concat(e.target.value))
                  }
                  required={true}
                />
                <small className="form-text text-muted">
                  Dê dois cliques para adicionar um participante.
                </small>
              </div>
           {participants.length <= 0 ? (
              ""
            ) : (
                <ul className="list-group">
                  {participants.map((item, key) => (
                    <li className="list-group-item" key={key}>
                      {item}
                    </li>
                  ))}
                </ul>
            )}
            </div>
            
            <br/>
          </div>
          <div className=" text-center">
             <button
              className="btn btn-success"
              type="submit"
              onClick={handleNewProject}
            >
              Cadastrar
            </button>
          </div>
         
        </form>
      </div>
          </div>
        </div>
      </div>
     
    </>
  );
}
