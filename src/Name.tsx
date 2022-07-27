import { FC, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'

export const Name: FC = () => {
    const [userName, setUserName] = useState<string>('')
    const navigate = useNavigate()

    return (
        <div className="userName-container">
            <div className="userName-box-container">
                <input
                    className="userName"
                    placeholder="Enter your Name..."
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    className="userSumbit"
                    type="submit"
                    onClick={() => navigate('/game', { state: userName })}
                />
            </div>
        </div>
    )
}
