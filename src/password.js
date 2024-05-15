import {supabase} from './supabase.js'
import { useState, useEffect } from 'react'

function Password() {
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const [passError, setPassError] = useState('default password error')
    const [invalid,setInvalid] = useState(false);
  
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
  
export default Password;