import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from './components/Card';
import './App.css';

function App() {
    const [pkmnList, setPkmnList] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [clickedPkmnList, setClickedPkmnList] = useState([]);
    const pkmnIDs = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393];

    function shuffle() {
        const shuffledList = [...pkmnList];
        for (let i = pkmnList.length - 1; i > 0; i--) {
            let swapIndex = Math.floor(Math.random() * (pkmnIDs.length - i));
            [shuffledList[i], shuffledList[swapIndex]] = [shuffledList[swapIndex], shuffledList[i]];
        }
        setPkmnList([...shuffledList]);
    }

    function cardOnClick(event) {    
        const clickedId = event.target.closest(".card").id;
        if (clickedPkmnList.includes(clickedId)) {
            gameOver();
        }
        else {
            const newScore = score + 1;
            if (newScore > highScore) {
                setHighScore(newScore);
            }
            setScore(newScore);
            setClickedPkmnList([...clickedPkmnList, clickedId]);
        }
        shuffle();
        window.scrollTo(top);
    }

    function cardOnKeydown(event) {
        if (event.key === "Enter") {
            cardOnClick(event);
        }
    }

    function gameOver() {
        setClickedPkmnList([]);
        setScore(0);
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
                <div className='scoreboard'>
                    <h1>Memory Game</h1>
                    <div>
                        <h2>High Score: {highScore}</h2>
                        <h2>Score: {score}</h2>
                    </div>
                </div>
                <p>Get points by clicking images but don't click the same one more than once</p>
            </header>
            <main>
                <ul className='cardList'>
                    {pkmnList.map(({id, name, img}) => {
                        return (
                            <Card 
                                key={id}
                                id={id}
                                name={name} 
                                img={img}
                                onClick={cardOnClick}
                                onKeyDown={cardOnKeydown}
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
