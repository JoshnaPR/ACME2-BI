import React from 'react';
import './style.css';

function Login() {
    return (
        <section>
            <div className="login-box">
                <form action="">
                    <h2>Login</h2>
                    <div className="input-box">
                        <span class="icon"><ion-icon name="mail"></ion-icon></span>
                        <input type="email" required/>
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                        <input type="password" required/>
                        <label>Password</label>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Remember Me</label>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p> Don't have an account? <a href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
