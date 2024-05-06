import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {NavBar} from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Apod} from './components/Apod';
import {Epic} from './components/Epic';
import {Rover} from './components/Rover';
import {Main} from './components/Main';
import { Helmet } from 'react-helmet';

function App() {
    return (
        <>
            <Helmet>
                <title>Diamond and NASA</title>
            </Helmet>
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/nasaAppReact" element={<Main/>}/>
                    <Route path="/nasaAppReact/src/components/main" element={<Main/>}/>
                    <Route path="/nasaAppReact/apod" element={<Apod/>}/>
                    <Route path="/nasaAppReact/epic" element={<Epic/>}/>
                    <Route path="/nasaAppReact/rover" element={<Rover/>}/>
                </Routes>
            </Router>
        </>

    );
}

export default App;