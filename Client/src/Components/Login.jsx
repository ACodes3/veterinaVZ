import { useState } from 'react';
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [ value, setValue] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (value.email.trim() === '' || value.password.trim() === '') {
            // If email or password is empty, do not proceed with login
            return;
        }
        axios.post("http://localhost:3000/auth/adminlogin", value)
            .then(result => {
                if(result.data.loginStatus) {
                    navigate("/dashboard");
                } else {
                    setError(result.data.Error)
                }
                
            })
            .catch(err => console.log(err));
    };
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email:</strong></label>
                    <input type='email' name='email' autoComplete='off' placeholder='Enter your email address' className='form-control rounded-0' onChange={(e) => setValue({...value, email: e.target.value})}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password:</strong></label>
                    <input type='password' name='password' placeholder='Enter your password' className='form-control rounded-0' onChange={(e) => setValue({...value, password: e.target.value})}/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                <div className='mb-1'>
                    <input type="checkbox" name="tick" id='tick' className="me-2" />
                    <label  className='mx-1' htmlFor='check'>Remember me</label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login