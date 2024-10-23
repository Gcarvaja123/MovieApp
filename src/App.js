import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Moviedetail from './pages/Moviedetail';

function App() {

  
  return (
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/movies' element ={<Movies/>}/>
      <Route path='/movies/:movieid' element={<Moviedetail/>}/>

    </Routes>
  );
}

export default App;
