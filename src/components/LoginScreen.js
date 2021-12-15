import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import userService from '../services/user';

const LoginScreen = ({user, setUser}) => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        if (username === '' || password === '') {
            alert('All fields required')
        } else {
            userService.login(username, password)
                .then(res => {
                    setUser(res)
                    history.goBack()
                })
                .catch(() =>
                    alert('Invalid username or password. Try again.'));
        }
    }

    return (
        <div className='container-fluid'>
            <h1 className="wrapper">Login</h1>
            {/*Did not logged in*/}
            {
                !user &&
                <>
                <div className='form-group row col-sm-10'>
                    <label htmlFor='username'
                           className='col-sm-2 col-form-label'>
                        Username
                    </label>
                    <input type='text'
                           className='col-sm-10 form-control'
                           id='username'
                           placeholder='username'
                           value={username}
                           onChange={e =>
                               setUsername(e.target.value)}
                           />
                </div>
                <div className='form-group row col-sm-10'>
                    <label htmlFor='password'
                           className='col-sm-2 col-form-label'>
                        Password
                    </label>
                    <input type='password'
                           className='col-sm-10 form-control'
                           id='password'
                           placeholder='password'
                           value={password}
                           onChange={e =>
                               setPassword(e.target.value)}
                           />
                </div>
                <div className='form-group row col-sm-10'>
                    <label htmlFor='login-btn'
                           className='col-sm-2 col-form-label'/>
                    <button className='btn btn-secondary btn-block col-sm-10 form-control'
                            onClick={login}>
                        Login
                    </button>
                </div>
                <div className="form-group row col-sm-10">
                    <label htmlFor='cancel-btn' className="col-sm-2 col-form-label"/>
                    <button className='btn btn-danger btn-block col-sm-10 form-control' >
                        <Link to={"/"} className="cancel-link">
                            Cancel</Link>
                    </button>
                </div>
                <div className='form-group row col-sm-10'>
                    <label htmlFor='register-btn'
                           className='col-sm-2 col-form-label'/>
                    <Link to='/register'
                          className='col-sm-10 text-left cancel-link'>
                        Register Now
                    </Link>
                </div>
                </>
            }
            {/*Logged in*/}
            {
                user &&
                <>
                    <div className='alert alert-info'>
                        You're already logged in
                    </div>
                    <button className='btn btn-secondary'
                            onClick={() => history.goBack()}>
                        Go Back
                    </button>
                </>
            }
        </div>
    )
}

export default LoginScreen