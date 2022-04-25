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
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";

import "./styles.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
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

  async function handleCheckQuestionAsAnswered(questionId: string) {
    database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
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
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>

                    <button onClick={() => handleHighlightQuestion(question.id)}>
                      <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}
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
