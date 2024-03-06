import './App.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { Header } from './Header/Header';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import Home from './Home/Home';

function App() {
  const isAuthenticated = false
  return (
    <Router >
      {/* <Header /> */}
      <Routes >

          {isAuthenticated ? <Route exact path='/' element={<Home />} /> : <Route path="/login" element={<Login/>} />}
        

        {/* Define other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
