import { FC } from 'react'
import { CardComponent } from './type'

const Card: FC<CardComponent> = ({ data, changeCardVisibility, index }) => {
    const { image, active, matched } = data

    return (
        <div
            className={`card ${matched && 'active'} ${active && 'active'}`}
            onClick={() => !matched && changeCardVisibility(index, image)}
        >
            <div className={`image-container ${active ? 'flipped' : ''}`}>
                <img
                    alt="image"
                    className="front"
                    src={process.env.PUBLIC_URL + '/images/front.jpg'}
                />
                <img alt="image" className="back" src={image} />
            </div>
        </div>
    )
}

export default Card
