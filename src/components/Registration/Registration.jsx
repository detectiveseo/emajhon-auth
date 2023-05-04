import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import './Registration.css'
import app from '../../firebase/firebase.init';
import { AuthContext } from '../Provider/Authprovider';

const Registration = () => {
    //show and hide password state
    const [showPass, setShowPass] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")


    const { createUserWithEmail, createuserWIthGoogle } = useContext(AuthContext);
    console.log(createuserWIthGoogle)



    //create a user function with input filed
    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm_password.value;

        if(password !== confirmPassword){
            setErrorMsg("confirm password is wrong")
        }else{
            createUserWithEmail(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                form.reset();
            }).catch((error) => {
                alert(error)
            })
        }

        

    }


    //create an user function with google
    const provider = new GoogleAuthProvider;
    
    const handleGoogleLogin = () => {
        createuserWIthGoogle(provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
        }).catch((error) => {
            console.error(error);
        })

    }


    return (
        <div className='form_warper'>
            <h2 className='form_heading'>Please Registration</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">User Name
                <input className='input' placeholder='User name' type="text" name="name" id="name" />
                </label>
                <label htmlFor="">Email
                <input className='input' placeholder='email' type="email" name="email" id="email" />
                </label>
                <br />
                <label htmlFor="password"><div className='password_handle'>
                    <span>Password</span>
                    <span onClick={() => {setShowPass(!showPass)}}>{showPass ? "Hide Password" : "Show Password"}</span>
                    </div>
                 <input className='input' placeholder='password' type={showPass ? "text" : "password"} name="password" id="password" />
                </label>
                <label htmlFor="confirm">Confirm password
                  <input className='input' placeholder='password' type={showPass ? "text" : "password"} name="confirm_password" id="confirm_password" />
                </label>
                <p className='errorMassage'>{errorMsg}</p>
                <div className='btn-warper'>
                    <input className='btn' type="submit" value="Sing Up" />
                </div>
            </form>
            <div className='sparetor'>
                <hr />
                <p>or</p>
                <hr />
            </div>
            <div className='or_sing_up_Option'>
                <p onClick={handleGoogleLogin}>google</p>
            </div>
            <p>If you have already an account. <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Registration;