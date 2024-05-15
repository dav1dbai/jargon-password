import {supabase} from './supabase.js'
import { useState, useEffect } from 'react'
import text_logo from './assets/name_jar.png'

function Password() {
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const [passError, setPassError] = useState('default password error')
    const [invalid,setInvalid] = useState(false);
    const [success,setSuccess] = useState(false);
  
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
      if(error == null){
        setSuccess(true)
      }
      else{
        setInvalid(true);
        setPassError("Something went wrong on our end. Please try again!")
      }
      console.log(data);
      console.log(error);
    }
  
    return(
      <div>
        <div>
            <a href="https://jargonlearn.com" target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 p-4">
                <img src={text_logo} alt="Logo" className="w-40 h-auto" />
            </a>
        </div>
        <div className='font-quicksand flex flex-col justify-center items-center h-screen bg-background-blue'>
            <div>
                <p className='font-bold'>Password</p>
                <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='font-medium px-4 py-2 border border-jargon-blue rounded mb-4'
                />
            </div>
            <div>
                <p className='font-bold'>Retype Password</p>
                <input
                type="password"
                value={retypePassword}
                onChange={e => setRetypePassword(e.target.value)}
                className='font-medium px-4 py-2 border border-jargon-blue rounded mb-4'
                />
            </div>
            <button type="submit" className='font-bold text-black px-4' onClick={()=>handlePassSubmit()} >
            Submit
            </button>
            {invalid && <p className='text-purple-900 text-center px-10 py-4 w-200'>{passError}</p>}
            {success && <p className='text-purple-900 text-center px-10 py-4 w-200'>Password reset. Feel free to close this window and try logging in through the extension!</p>}
        </div>
      </div>
    )
}
  
export default Password;