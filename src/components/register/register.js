import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {
    const [email, setEmail] = useState(" ");
    const [message, setMessage] = useState(" ");
    
    const history = useHistory()


    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })
   

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
        setEmail({
            ...user,
            [email]: value
        })
    }
    

    const checkValidation = (e)=>{
        e.preventDefault()
        const rgExp = /^[a-zA-Z0-9._]@[a-z]+\.[a-z]/
        if(rgExp.text(email)){
            setMessage("Email isvalid")
        }else if(email===" "){
            setMessage("please enter email")
        }else if(!rgExp.test(email)){
            setMessage("email is not valid")
        }else{
            setMessage(" ")
        }
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then( res => {
                alert(res.data.message)
                history.push("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }

  

    return (
        <form onSubmit={checkValidation}>
        <div className="register">     
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" required="true" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" required="true" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" required="true" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" required="true" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register}>Register</div>
            <p>{message}</p>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
        </form>
        
    )
}

export default Register