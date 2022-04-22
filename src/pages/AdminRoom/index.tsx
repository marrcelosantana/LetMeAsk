import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../services/firebase";
import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";

import "./styles.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);
  const [openModal, setOpenModal] = useState(false);

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  async function handleDeleteQuestion(questionId: string) {
    database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    await setOpenModal(false);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <div className="main">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                content={question.content}
                author={question.author}
                key={question.id}
              >
                <button onClick={handleOpenModal}>
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
                <Modal
                  isOpen={openModal}
                  onRequestClose={handleCloseModal}
                  overlayClassName="react-modal-overlay"
                  className="react-modal-content"
                >
                  <div className="icon-container">
                    <img src={deleteImg} alt="Remover Pergunta" />
                    <span>Excluir pergunta</span>
                    <p>Tem certeza que deseja excluir esta pergunta?</p>
                  </div>
                  <div className="buttons-container">
                    <button className="cancel-btn" onClick={handleCloseModal}>Cancelar</button>
                    <button className="confirm-btn" onClick={() => handleDeleteQuestion(question.id)}>Sim, excluir</button>
                  </div>
                </Modal>
              </Question>
            );
          })}
        </div>
      </div>
    </div>
  );
}
