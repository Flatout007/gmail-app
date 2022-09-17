import './App.css';
import Nav from './Nav';
import Aside from './Aside';
import Email from "./Email";
import Mail from "./Mail";
import Login from "./Login";
import { RootState, UserObject } from './app/store';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactElement, useEffect } from 'react';
import { auth } from "./firebase";
import { onAuthStateChanged, User} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";
import { login } from './features/user_slice';

function App(): ReactElement {

  const user: UserObject = useSelector(function (state: RootState): UserObject {
    return state.user.currentUser;
  });
  const dispatch: Dispatch = useDispatch();

  useEffect(function (): void {
    
    onAuthStateChanged(auth, function(user: User | null) {
      
      if (user) {
        dispatch(login({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }))  
      }
    });
  }, []);

  return (
    <Router>
      {user ?
        <div className="App">
          <Nav></Nav>
          <Aside></Aside>

          <Routes>
            <Route path='/mail' element={<Mail />} />
            <Route path='/' element={<Email />} />
          </Routes>
        </div>
        :
        <Login />
      }
    </Router>
  );
}

export default App;
