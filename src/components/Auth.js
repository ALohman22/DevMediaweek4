import {useState, useContext} from 'react'
import AuthContext from "../store/authContext"
import axios from 'axios'
 
const Auth = () => {

    const authCtx = useContext(AuthContext)


   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
 
   const submitHandler = e => {
       e.preventDefault()

       const url = 'http://localhost:3069'

        const body = {
            username,
            password
        }

        axios.post(register ? `${url}/register` : `${url}/login`, body)
        .then(({data}) => {
            console.log('AFTER AUTH', data)
            authCtx.login(data.exp, data.token, data.userId)
            setPassword('')
            setUsername('')
            
        })
        .catch(err => {
                alert('Error while loging in')
                console.error(err)
        })
        
    //    console.log(username)
    //    console.log(password)
   }
//    console.log(register)
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type= 'text'
                   value= {username}
                   placeholder= 'username'
                   onChange={(e) => setUsername(e.target.value)}/>
               <input
                   className='form-input'
                   type= 'password'
                   value={password}
                   placeholder='password'
                   onChange={(e) => setPassword(e.target.value)}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button onClick={() => register ? setRegister(false) : setRegister(true)} className='form-btn'>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth