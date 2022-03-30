import { useState } from "react";

function App() {
  const[counter, setCounter] = useState(0);

  function increment(){
    setCounter(counter + 1);
  }

  return (
    <div className="App">
      <button onClick={increment}>{counter}</button>
    </div>
  );
}

export default App;
