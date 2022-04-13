import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../../assets/images/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from 'react-hot-toast';
import { database } from "../../services/firebase";
import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";

import "./styles.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState('')
  const roomId = params.id;
  
  const { title, questions } = useRoom(roomId)

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if(newQuestion.trim() === ''){
      return;
    }

    if(!user){
      toast.error("Você precisa estar logado.")
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
    toast.success("Pergunta enviada com sucesso!")
  }

  return (
    <div id="page-room">
      <Toaster/>
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
          {questions.map(question => {
            return(
              <Question content={question.content} author={question.author} key={question.id}/>
            );
          })}
        </div>
      </div>
    </div>
  );
}
