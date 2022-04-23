import { database } from "../../services/firebase";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { useRoom } from "../../hooks/useRoom";
import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { DeleteQuestionModal } from "../../components/DeleteQuestionModal";
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
  const [isopenModal, setOpenModal] = useState(false);
  const history = useHistory();

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }
  
  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    history.push('/');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
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
                <DeleteQuestionModal
                  roomId={roomId}
                  questionId={question.id}
                  isOpenModal={isopenModal}
                  closeModal={handleCloseModal}
                />
              </Question>
            );
          })}
        </div>
      </div>
    </div>
  );
}
