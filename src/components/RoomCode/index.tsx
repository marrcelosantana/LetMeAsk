import copyImg from '../../assets/images/copy.svg';
import toast, { Toaster } from 'react-hot-toast';

import './styles.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode (props: RoomCodeProps){

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.success("Código copiado!");
  }

  return(
    <div>
      <Toaster/>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
    </div>
  );
}