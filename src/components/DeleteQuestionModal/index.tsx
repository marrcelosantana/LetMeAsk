import Modal from "react-modal";
import deleteImg from "../../assets/images/delete.svg";
import { database } from "../../services/firebase";

import "./styles.scss";

interface DeleteQuestionModalProps {
  roomId: string;
  questionId: string;
  isOpenModal: boolean;
  closeModal: () => void;
}

export function DeleteQuestionModal({roomId, questionId, isOpenModal, closeModal} : DeleteQuestionModalProps) {

  async function handleDeleteQuestion(questionId: string) {
    database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    await closeModal();
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="icon-container">
        <img src={deleteImg} alt="Remover Pergunta" />
        <span>Excluir pergunta</span>
        <p>Tem certeza que deseja excluir esta pergunta?</p>
      </div>
      <div className="buttons-container">
        <button className="cancel-btn" onClick={closeModal}>
          Cancelar
        </button>
        <button
          className="confirm-btn"
          onClick={() => handleDeleteQuestion(questionId)}
        >
          Sim, excluir
        </button>
      </div>
    </Modal>
  );
}
