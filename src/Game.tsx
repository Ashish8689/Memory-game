import { FC, useEffect, useState } from 'react'
import './App.css'
import Card from './Card'
import { MEMORY_CARD_LIST } from './cardList'
import { CardDetails, LocationState } from './type'
import { useLocation, useNavigate } from 'react-router-dom'

const Game: FC = () => {
    const [cardList, setCardList] = useState<CardDetails[]>([])
    const [activeCards, setActiveCards] = useState<string[]>([])
    const [userScore, setUserScore] = useState<number>(0)
    const [remaningUserChances, setRemaningUserChances] = useState<number>(10)
    const [startDialogue, setStartDialogue] = useState<boolean>(true)
    const [endDialogue, setEndDialogue] = useState<boolean>(false)
    const location = useLocation()
    const { state: userName } = location as LocationState
    const navigate = useNavigate()

    useEffect(() => {
        if (!userName) {
            navigate('/')
        }
    }, [])

    const shuffleCardList = (list: CardDetails[]): CardDetails[] =>
        [...list].sort(() => 0.5 - Math.random())

    const resetAllCards = (): CardDetails[] => {
        const resetCardData = [...cardList].map((list) => {
            list.active = false
            list.matched = false

            return list
        })

        return shuffleCardList(resetCardData)
    }

    useEffect(() => {
        setCardList(shuffleCardList(MEMORY_CARD_LIST))
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

    const restartGame = (): void => {
        setUserScore(0)
        setRemaningUserChances(10)
        setStartDialogue(true)
        setEndDialogue(false)
        setCardList(resetAllCards())
    }

    const updateData = (matched: boolean, newList: CardDetails[]): void => {
        setActiveCards([])
        setRemaningUserChances((prev) => prev - 1)
        setCardList(newList)
        matched && setUserScore((prev) => prev + 1)
    }

    useEffect(() => {
        if (
            cardList.length &&
            (userScore === cardList.length / 2 || !remaningUserChances)
        ) {
            setEndDialogue(true)
        }
    })

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
        <div className="app">
            <div className="header">
                <div className="player">
                    <h1>Player : </h1>
                    <h2>{userName}</h2>
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

            {startDialogue ? (
                <div className="startContainer">
                    <div className="startDialogue">
                        <h1>
                            Once you click on start button you will get 3s to
                            see the card for memorising it.
                        </h1>
                        <h6
                            onClick={() => {
                                setStartDialogue(false)
                                startGame()
                            }}
                        >
                            Start Now
                        </h6>
                    </div>
                </div>
            ) : (
                ''
            )}

            {endDialogue ? (
                <div className="startContainer">
                    <div className="startDialogue endDialogue">
                        <h1>Game End!!!</h1>
                        <div className="score-container">
                            <table>
                                <tr>
                                    <td colSpan={2}>Total Match : </td>
                                    <td className="score-value">{userScore}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Chance Remaning : </td>
                                    <td className="score-value">
                                        {remaningUserChances}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <h6 onClick={() => restartGame()}>Restart Game</h6>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default Game
