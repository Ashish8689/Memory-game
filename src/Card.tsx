import { FC } from 'react'
import { CardComponent } from './type'

const Card: FC<CardComponent> = ({ data, changeCardVisibility }) => {
    const { id, image, active, matched } = data

    return (
        <div
            className={`card ${matched && 'active'} ${active && 'active'}`}
            onClick={() => !matched && changeCardVisibility(id, image)}
        >
            {image}
        </div>
    )
}

export default Card
