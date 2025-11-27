import { useState } from 'react';
import { Card } from './components/Card';
import './App.css';

function App() {
  const [pkmnList, setPkmnList] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const pkmnIDs = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393];

  function createCards() {
    return pkmnIDs.map((idNum, index) => <Card id={idNum} key={index}></Card>)
  }

  return (
    <>
      <header>

      </header>
      <main>
        {createCards()}
      </main>
    </>
  )
}

export default App;
