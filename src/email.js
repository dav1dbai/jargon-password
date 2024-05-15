import {supabase} from './supabase.js'
import { useState, useEffect } from 'react'

function Email() {
    const [email, setEmail] = useState('')
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
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'https://jargonpassword.vercel.app/resetpassword',
        })
        console.log(data);
        console.log(error);
        //setPage('password');
      }
    }
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
}

export default Email;