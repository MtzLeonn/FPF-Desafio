import React, { useEffect, useState } from "react";
import { ModalContent, CustomDialog } from "react-st-modal";
import { Link } from "react-router-dom";

import { FaCheck,FaUndoAlt, } from "react-icons/fa";
import { VscTrash, } from "react-icons/vsc";
import { FiEdit3, } from "react-icons/fi";
import { CgDollar, } from "react-icons/cg";
import swal from "sweetalert";

import logo from "../../assets/fpf-logo.svg";
import "./style.css";

import api from "../../services/api";

import axios from "axios";

export default function Home() {
  //URL used in axios requests
  const URL_API_GETDATA = "http://localhost:3333/project";
  const URL_API_UPDATEDATA = "http://localhost:3333/project/update";

  //Data via get
  const [projects, setProjects] = useState([]);
  ///

  //Data to update via put/axios
  const [newName, setNewName] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newFinishDate, setNewFinishDate] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newProjectRisk, setNewProjectRisk] = useState("");
  const [newParticipants, setNewParticipants] = useState([]);
  ///

  const [editMode, setEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const onEdit = ({ id }) => {
    setEditMode({
      status: true,
      rowKey: id,
    });
  };

  const onCancelEdit = () => {
    setEditMode({
      status: false,
      rowKey: null,
    });
  };

  const updateProject = ({
    id,
    name,
    start_date,
    finish_date,
    budget,
    projectRisk,
    participants,
  }) => {
    axios
      .put(URL_API_UPDATEDATA, {
        id,
        name,
        start_date,
        finish_date,
        budget,
        projectRisk,
        participants,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSaveEdit = ({
    id,
    name,
    start_date,
    finish_date,
    budget,
    projectRisk,
    participants,
  }) => {
    console.log(newParticipants.length);
    updateProject({
      id,
      name,
      start_date,
      finish_date,
      budget,
      projectRisk,
      participants,
    });
    setEditMode({
      status: false,
      rowKey: null,
    });
  };

  //Fetch data
  const fetchApiData = () => {
    axios
      .get(URL_API_GETDATA)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchApiData();
  });
  ///

  async function handleDelete(id) {
    await api.delete(`/project/delete/${id}`);
  }

  //Modal
  function CustomDialogContent({
    projetSelected,
    budgetSelected,
    projectRiskPerc,
  }) {
    const [value, setValue] = useState("");
    const [valueCalculated, setValueCalculated] = useState("");

    async function handleCalc(e) {
      e.preventDefault();
      console.log(value, projectRiskPerc);
      var value_float = parseFloat(value);
      var perc = parseFloat(projectRiskPerc);

      var return_value = value_float - value_float * perc;
      console.log(return_value, typeof return_value);
      setValueCalculated(return_value);
    }

    return (
      <>
        {parseFloat(budgetSelected) > parseFloat(value) ? (
          <span className="list-group-item list-group-item-action list-group-item-danger">
            Valor de investimento menor que o do projeto!
          </span>
        ) : (
          ""
        )}
        {valueCalculated !== "" &&
        parseFloat(budgetSelected) < parseFloat(value) ? (
          <span className="list-group-item list-group-item-action list-group-item-success">
            Valor do retorno do investimento:{" "}
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(valueCalculated)}
          </span>
        ) : (
          ""
        )}
        <ModalContent>
          <div className="dialog-box d-flex justify-content-center">
            <div className="container">
              <h6 className="text-center">Nome do projeto: {projetSelected}</h6>
              <p className="text-center">
                Valor do projeto:{" "}
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(budgetSelected)}
              </p>
            </div>
            <div className="container">
              <form className="form-inline" onSubmit={handleCalc}>
                <div className="form-group mb-2">
                  <label className="">Informe um valor de investimento: </label>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </div>
                <button
                  className="btn btn-block btn-sm btn-success"
                  type="submit"
                >
                  Calcular
                </button>
              </form>
            </div>
          </div>
        </ModalContent>
      </>
    );
  }
  //

  return (
    <>
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
        <Link class="text-uppercase text-dark" to="/new" > <img src="https://img.icons8.com/fluent-systems-regular/24/000000/add.png"/> Novo projeto</Link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      
    </form>
  </div>
</nav>
     <br/>
      <div className="container py-2">
        <div className="table-responsive-lg">
          <table className="table shadow text-center table-bordered">
            <thead className="green">
              <tr className="text-light">
                <th scope="col">Projeto</th>
                <th scope="col">Data início</th>
                <th scope="col">Data final</th>
                <th scope="col">Investimento</th>
                <th scope="col">Risco</th>
                <th scope="col">Participantes</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item, key, array) => (
                <tr key={key}>
                  <td>
                    {editMode.status && editMode.rowKey === item.id ? (
                      <input
                        className="form-control"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        required={true}
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>
                    {editMode.status && editMode.rowKey === item.id ? (
                      <input
                        className="form-control"
                        type="date"
                        value={newStartDate}
                        onChange={(e) => setNewStartDate(e.target.value)}
                        required={true}
                      />
                    ) : (
                      item.start_date
                    )}
                  </td>
                  <td>
                    {editMode.status && editMode.rowKey === item.id ? (
                      <input
                        className="form-control"
                        type="date"
                        value={newFinishDate}
                        onChange={(e) => setNewFinishDate(e.target.value)}
                        required={true}
                      />
                    ) : (
                      item.finish_date
                    )}
                  </td>
                  <td>
                    {editMode.status && editMode.rowKey === item.id ? (
                      <input
                        className="form-control"
                        type="number"
                        min={0}
                        value={newBudget === "" ? item.budget : newBudget}
                        onChange={(e) => setNewBudget(e.target.value)}
                        required={true}
                      />
                    ) : (
                      Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.budget)
                    )}
                  </td>

                  <td width={150}>
                    {editMode.status && editMode.rowKey === item.id ? (
                      <select
                        className="form-control"
                        type="text"
                        value={newProjectRisk}
                        onChange={(e) => setNewProjectRisk(e.target.value)}
                        required={true}
                      >
                        <option defaultValue="DEFAULT"></option>
                        <option value="Baixo ">Baixo</option>
                        <option value="Médio">Médio</option>
                        <option value="Alto">Alto</option>
                      </select>
                    ) : (
                      item.project_risk
                    )}
                  </td>
                  <td>
                    {editMode.status && editMode.rowKey === item.id ? (
                      <>
                        <input
                          className="form-control"
                          type="text"
                          onDoubleClick={(e) => {
                            setNewParticipants(
                              item.participants.concat(e.target.value)
                            );
                          }}
                          required={true}
                        />
                        <small className="form-text text-muted">
                          Dê dois cliques para adicionar um participante.
                        </small>
                      </>
                    ) : (
                      <div className="py-2">
                        {item.participants.map((item, key) => (
                          <span key={key}>
                            <p className="btn btn-sm btn-light disabled mx-1">
                              {item}
                            </p>
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="whd">
                    <div class="row mg-lf">
                    <div class="col-3">
                        <div className="">
                        {editMode.status && editMode.rowKey === item.id ? (
                          <React.Fragment>
                            <div className="row d-flex justify-content-between">
                              <div className="">
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() =>
                                    onSaveEdit({
                                      id: item.id,
                                      name:
                                        newName === "" ? item.name : newName,
                                      start_date:
                                        newStartDate === ""
                                          ? item.start_date
                                          : newStartDate,
                                      finish_date:
                                        newFinishDate === ""
                                          ? item.finish_date
                                          : newFinishDate,
                                      budget:
                                        newBudget === ""
                                          ? item.budget
                                          : newBudget,
                                      projectRisk:
                                        newProjectRisk === ""
                                          ? item.project_risk
                                          : newProjectRisk,
                                      participants: newParticipants,
                                    })
                                  }
                                >
                                  <FaCheck />
                                </button>
                              </div>
                              <div className="">
                                <button
                                  className="btn btn-sm btn-secondary"
                                  style={{ marginLeft: 8 }}
                                  onClick={() => onCancelEdit()}
                                >
                                  <FaUndoAlt />
                                </button>
                              </div>
                            </div>
                          </React.Fragment>
                        ) : (
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() =>
                              onEdit({
                                id: item.id,
                              })
                            }
                          >
                            
                            <FiEdit3 className="mg-top" />
                          </button>
                        )}
                      </div>
                      </div>
                      <div class="col-3">
                        <div className="">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={async () => {
                              console.log(item.project_risk_perc);
                              await CustomDialog(
                                <CustomDialogContent
                                  projetSelected={item.name}
                                  budgetSelected={item.budget}
                                  projectRiskPerc={item.project_risk_perc}
                                />,
                                {
                                  title: "Simular ROI",
                                  showCloseIcon: true,
                                }
                              );
                            }}
                          >
                            <CgDollar className="mg-top" />
                          </button>
                        </div>
                      </div>
                      <div class="col-3">
                        <div className="">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            swal({
                              title: "Deletar projeto?",
                              text: "",
                              icon: "warning",
                              buttons: ["Cancelar", "Confirmar"],
                              dangerMode: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                swal("Projeto deletado", {
                                  icon: "success",
                                });
                                handleDelete(item.id);
                              } else {
                                swal("Projeto não deletado", {
                                  icon: "warning",
                                });
                              }
                            });
                          }}
                        >
                          <VscTrash className="mg-top" />
                        </button>
                      </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
