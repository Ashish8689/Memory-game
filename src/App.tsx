import { FC, useEffect, useState } from 'react'
import './App.css'
import Card from './Card'
import { MEMORY_CARD_LIST } from './cardList'
import { CardDetails } from './type'

const App: FC = () => {
    const [cardList, setCardList] = useState<CardDetails[]>(MEMORY_CARD_LIST)
    const [activeCards, setActiveCards] = useState<string[]>([])
    const [userPoint, setUserPoint] = useState<number>(0)
    const [userChances, setUserChances] = useState<number>(10)

    const updateData = (matched: boolean, newList: CardDetails[]): void => {
        setActiveCards([])
        setCardList(newList)
        setUserChances((prev) => prev - 1)
        matched && setUserPoint((prev) => prev + 1)
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

    const changeCardVisibility = (id: number, image: string): void => {
        setActiveCards((prev) => [...prev, image])
        setCardList(
            [...cardList].map((card) => {
                if (card.id === id) {
                    card.active = true
                }

                return card
            })
        )
    }

    return (
        <div className="App">
            <h1>Chance Remaning : {userChances} </h1>
            <h1>User Point : {userPoint} </h1>
            {userChances === 0 ? <h2>Game is over</h2> : ''}
            {cardList.map((list, index) => (
                <Card
                    changeCardVisibility={changeCardVisibility}
                    data={list}
                    key={index}
                />
            ))}
        </div>
    )
}

export default App
