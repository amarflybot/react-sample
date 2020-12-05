import React, {useState} from 'react';
import './App.css';

function Button(props: { onClickFunction: (arg0: any) => any; increment: React.ReactNode; }) {
  const handleClick = () => props.onClickFunction(props.increment);
  return (
      <button onClick={handleClick}>
        +{props.increment}
      </button>
  );
}

function Display(props: { message: React.ReactNode; }) {
  return (
      <div>{props.message}</div>
  );
}

function App() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = (incr: number) => setCounter(counter+incr);
  return (
      <div>
        <Button onClickFunction={incrementCounter} increment={1} />
        <Button onClickFunction={incrementCounter} increment={5} />
        <Button onClickFunction={incrementCounter} increment={10} />
        <Button onClickFunction={incrementCounter} increment={20} />
        <Display message={counter}/>
      </div>
  );
}

export default App;
