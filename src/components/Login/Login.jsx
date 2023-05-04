import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../../firebase/firebase.init';
import { AuthContext } from '../Provider/Authprovider';

const Login = () => {
    //shyow and hid pass Word state
    const [showPass, setShowPass ] = useState(false);

    const navigate = useNavigate()

    

    //input filed
    const auth = getAuth(app);
    //login with input fileds
    const {loginWithEmail, createuserWIthGoogle} = useContext(AuthContext)
    const handlesubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        loginWithEmail(email, password)
        .then((result) => {
            const user = result.user;
            console.log(user);
            form.reset();
            navigate("/")
        }).catch((error) => {
            console.error(error);
            alert(error)
        })
    }

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        createuserWIthGoogle(provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
        }).catch((error) => {
            console.error(error);
            alert("something is wring")
        })

    }
    return (
        <div className='form_warper'>
            <h2 className='form_heading'>Please Login</h2>
            <form onSubmit={handlesubmit}>
                <label htmlFor="">Email
                <input className='login_input' placeholder='email' type="email" name="email" id="email" />
                </label>
                <br />
                <label htmlFor="password">
                    <div className='password_handle'>
                    <span>Password</span>
                    <span onClick={() => {setShowPass(!showPass)}}>{showPass ? "Hide Password" : "Show Password"}</span>
                    </div>
                 <input className='login_input' placeholder='password' type={showPass ? "text" : "password"} name="password" id="password" />
                </label>
                <div className='btn-warper'>
                    <input className='btn' type="submit" value="Sing in" />
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
            <p>If you have are new on this Please <Link to="/registration">register</Link></p>
        </div>
    );
};

export default Login;