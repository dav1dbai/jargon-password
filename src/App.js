import logo from './logo.svg';
import './App.css';
import {supabase} from './supabase.js'
import { useState, useEffect } from 'react'

function App() {

  const [page,setPage] = useState('email');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [passError, setPassError] = useState('default password error')
  const [invalid,setInvalid] = useState(false);

  
  async function handleEmailSubmit(){
    setInvalid(false);
    //console.log(email);
    const {data,error} = await supabase.from('profiles').select('email').eq('email',email);
    if(!(data[0] != null)){
      console.log("bad email")
      setInvalid(true);
    }
    else{
      console.log(email);
      console.log(window.location.origin)
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/',
      })
      console.log(data);
      console.log(error);
      //setPage('password');
    }
  }

  async function handlePassSubmit(){
    //console.log(password);
    //console.log(retypePassword);
    if(password != retypePassword){
      setInvalid(true);
      setPassError("passwords don't match, please try again");
      return;
    }
    if(password.length < 6){
      setInvalid(true);
      setPassError("passwords must be at least 6 characters long, please try again");
      return;
    }
    //can add more checks here
    const { data, error } = await supabase.auth.updateUser({
      password: password
    })
    console.log(data);
    console.log(error);
  }

  switch(page){
    case 'email':
      return(
          <div style={{ textAlign: 'center' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button type="submit" onClick={()=>handleEmailSubmit()} style={{ padding: '5px 10px' }}>
              Submit
            </button>
            {invalid && <p style={{ color: 'red', textAlign: 'center' }}>This email is not registered with us</p>}
          </div>
      )
    case 'password':
      return(
        <div style={{ textAlign: 'center' }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <input
              type="password"
              value={retypePassword}
              onChange={e => setRetypePassword(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button type="submit" onClick={()=>handlePassSubmit()} style={{ padding: '5px 10px' }}>
              Submit
            </button>
            {invalid && <p style={{ color: 'red', textAlign: 'center' }}>{passError}</p>}
        </div>
      )
  }
}

export default App;
