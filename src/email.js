import {supabase} from './supabase.js'
import { useState, useEffect } from 'react'
import text_logo from './assets/name_jar.png'

function Email() {
    const [email, setEmail] = useState('')
    const [invalid,setInvalid] = useState(false);
    const [waitMessage, setWaitMessage] = useState(false);
    async function handleEmailSubmit(){
      setInvalid(false);
      //console.log(email);
      const {data,error} = await supabase.from('profiles').select('email').eq('email',email);
      if(!(data[0] != null)){
        console.log("bad email")
        setInvalid(true);
      }
      else{
        //console.log(email);
        setWaitMessage(true);
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'https://jargonpassword.vercel.app/resetpassword',
        })
        console.log(data);
        console.log(error);
        //setPage('password');
      }
      //print error, print update for user
    }
    return(
        <div>
            <div>
                <a href="https://jargonlearn.com" target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 p-4">
                    <img src={text_logo} alt="Logo" className="w-40 h-auto" />
                </a>
            </div>
            <div className='font-quicksand flex flex-col justify-center items-center h-screen bg-background-purple'>
                <p className='py-4 font-bold text-violet-700'>Forgot your password? Enter your email to receive a reset link.</p>
                <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='font-medium px-4 py-2 border border-jargon-blue rounded mb-4'
                />
                <button type="submit" onClick={()=>handleEmailSubmit()} className='font-bold text-black px-4 '>
                Submit
                </button>
                {invalid && <p className='text-indigo-900 py-4'>This email is not registered with us, please try again</p>}
                {waitMessage && <p className='text-indigo-900 text-center px-10 py-4 w-200'>
                    You should shortly receive an email to reset your password.
                     Be sure to check your spam folder and try again in a few minutes if you haven't!
                </p>}
            </div>
        </div>
    )
}

export default Email;