import { FC } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import { Name } from './Name';
import Game from './Game';

const App: FC = () => {

    return (
        <div className="App">
            <Routes>
                <Route element={<Name />} path="/" />
                   <Route element={<Game />} path="/game" />
            </Routes>

        </div>
    )
}

export default App
