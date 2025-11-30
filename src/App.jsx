import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import './App.css';

function App() {
    const [pkmnList, setPkmnList] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const pkmnIDs = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393];

    function shuffle() {
        const shuffledList = [...pkmnList];
        for (let i = pkmnList.length - 1; i > 0; i--) {
            let swapIndex = Math.floor(Math.random() * (pkmnIDs.length - i));
            [shuffledList[i], shuffledList[swapIndex]] = [shuffledList[swapIndex], shuffledList[i]];
        }
        setPkmnList([...shuffledList]);
    }

    function cardOnClick() {
        setScore(score + 1);
        shuffle();
        window.scrollTo(top);
    }

    useEffect(() => {
        async function getData() {
            const pkmnData = [];
            for (const id of pkmnIDs) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

                    if (!response.ok) {
                        throw new Error("Error status: " + response.status);
                    }

                    const data = await response.json();
                    pkmnData.push(
                        {   
                            id, 
                            name: data.name, 
                            img: data.sprites.front_default
                        }
                    );
                }
                catch(error) {
                    console.log(error.message);
                }
            }
            setPkmnList([...pkmnData]);
        }

        getData();
    }, [])

    return (
        <>
            <header>
                <h1>Memory Game</h1>
                <div className="scoreboard">
                    <h3>High Score: {highScore}</h3>
                    <h3>Score: {score}</h3>
                </div>
            </header>
            <main>
                <ul className='cardList'>
                    {pkmnList.map(({id, name, img}) => {
                        return (
                            <Card 
                                key={id} 
                                name={name} 
                                img={img}
                                onClick={cardOnClick}
                            >
                            </Card>
                        )
                    })}
                </ul>
            </main>
        </>
    )
}

export default App;
