import { FC, useEffect, useState } from 'react'
import './App.css'
import Card from './Card'
import { MEMORY_CARD_LIST } from './cardList'
import { CardDetails } from './type'

const App: FC = () => {
    const [cardList, setCardList] = useState<CardDetails[]>([])
    const [activeCards, setActiveCards] = useState<string[]>([])
    const [playerName, setPlayerName] = useState<string>('Ashish')
    const [userScore, setUserScore] = useState<number>(0)
    const [remaningUserChances, setRemaningUserChances] = useState<number>(10)
    const [timer, setTimer] = useState<number>(0)
    const [timerId, setTimerId] = useState<number | null>(null);

    useEffect(() => {
        setCardList([...MEMORY_CARD_LIST].sort(() => 0.5 - Math.random()))
    }, [])

    const startGame = (): void => {
        const newlist = [...cardList].map((list) => {
            list.active = true

            return list
        })
        setCardList(newlist)

        setTimeout(() => {
            const list = [...cardList].map((list) => {
                list.active = false

                return list
            })
            setCardList(list)
        }, 2000)
    }

    const updateData = (matched: boolean, newList: CardDetails[]): void => {
        setActiveCards([])
        setCardList(newList)
        setRemaningUserChances((prev) => prev - 1)
        matched && setUserScore((prev) => prev + 1)
    }

    useEffect(() => {
        if (activeCards.length === 2) {
            setTimeout(() => {
                const matched = activeCards[0] === activeCards[1]
                const newList = [...cardList].map((card) => {
                    if (activeCards.includes(card.image)) {
                        if (matched) {
                            card.matched = true
                        } else {
                            card.active = false
                        }
                    }

                    return card
                })
                updateData(matched, newList)
            }, 500)
        }
    }, [activeCards, cardList])

    const changeCardVisibility = (
        selectedIndex: number,
        image: string
    ): void => {
        const a = [...cardList]
        a[selectedIndex].active = true
        setCardList(a)
        setActiveCards((prev) => [...prev, image])
    }

    return (
        <div className="App">
            <div className="header">
                <div className="player">
                    <h1>Player : </h1>
                    <h2>{playerName}</h2>
                </div>

                <div className="score">
                    <h1>Score : </h1>
                    <h2>{userScore}</h2>
                </div>

                <div className="chances">
                    <h1>Remaning Chances : </h1>
                    <h2>{remaningUserChances}</h2>
                </div>
            </div>

            <div className="subHeader">
                <h1 onClick={() => startGame()}>Start Game</h1>
                <h1>{timer}</h1>
            </div>

            <div className="card-body-container">
                <div className="card-container">
                    {cardList.map((list, index) => (
                        <Card
                            changeCardVisibility={changeCardVisibility}
                            data={list}
                            index={index}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
