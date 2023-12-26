import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Alert from './components/Alert';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';




function App() {
// eslint-disable-next-line
  const [alert ,setAlert]=useState(null)
  const showAlert=(message,type,stat )=>{
    setAlert({msg:message,  type:type ,stat:stat})
    setTimeout(()=>{
      setAlert(null)
    },2000)
  }


  return (
<>
<NoteState>
<Router>
<Navbar/>
<Alert alert={alert}/>

<div className="container">
<Routes> 
  <Route exact path="/" element={<Home showAlert={showAlert}/> } />
  <Route exact path="/about"  element={<About/>  }/>
  <Route exact path="/signup"  element={<Signup showAlert={showAlert}/>  }/>
  <Route exact path="/login"  element={<Login showAlert={showAlert}/>  }/>


  
</Routes>
</div>
</Router>
</NoteState>
</>
  );
}

export default App;
