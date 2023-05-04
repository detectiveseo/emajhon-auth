import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/Authprovider';

const Header = () => {
    const {user} = useContext(AuthContext);
    const { singout } = useContext(AuthContext);
    // console.log(user.email)
    // const email = user.email;
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                {
                    user ? <button onClick={() => {singout().then().catch(err => {alert(err)})}}>Log out</button> :
                    <span>
                        <Link to="/login">Login</Link>
                        <Link to="/registration">registration</Link>
                    </span> 
                }
            </div>
            <div className='account_details_header'>
               {user ? user.email : " "}
            </div>
        </nav>
    );
};

export default Header;