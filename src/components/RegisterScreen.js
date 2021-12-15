import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import userService from '../services/user';

const RegisterScreen = ({user}) => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');

    const register = () => {
        if (username === '' || password === '' || fullName === '' || email === '') {
            alert('All fields required.');
        } else if (role === 'user') {
            alert('Must choose a role')
        }
        else {
            userService.register(username, password, fullName, email, role)
                .then(() => history.push('/login'))
                .catch(() => alert('Error. Possible duplicated username. Try again.'));
        }
    }

    return (
        <div className='container-fluid'>
            <h1 className="wrapper">Register</h1>
            {/*User did not registered yet*/}
            {
                !user &&
                <>
                <div className='form-group row col-sm-10'>
                    <label htmlFor='firstName' className='col-sm-2 col-form-label'>
                        Full Name</label>
                    <input type='text'
                           className='col-sm-10 form-control'
                           value={fullName}
                           id='firstName'
                           placeholder='Enter first name'
                           onChange={e =>
                               setFullName(e.target.value)}/>
                </div>
                <div className='form-group row col-sm-10'>
                    <label htmlFor='username' className='col-sm-2 col-form-label'>
                        Username</label>
                    <input type='text'
                           className='col-sm-10 form-control'
                           value={username}
                           id='username'
                           placeholder='Create username'
                           onChange={e =>
                               setUsername(e.target.value)}/>
                </div>
                <div className='form-group row col-sm-10'>
                    <label htmlFor='password' className='col-sm-2 col-form-label'>
                        Password</label>
                    <input type='password'
                           className='col-sm-10 form-control'
                           value={password}
                           id='password'
                           placeholder='Create password'
                           onChange={e =>
                               setPassword(e.target.value)}/>
                </div>
                <div className='form-group row col-sm-10'>
                    <label htmlFor='email' className='col-sm-2 col-form-label'>
                        Email address</label>
                    <input type='email'
                           className='col-sm-10 form-control'
                           value={email}
                           id='email'
                           placeholder='Provide email'
                           onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className='form-group row col-sm-10'>
                    <label htmlFor='role' className='col-sm-2 col-form-label'>
                        Role</label>
                    <select required
                            className='col-sm-10 form-control'
                            defaultValue=""
                            onChange={(e) =>
                                setRole(e.target.value)}>
                        <option value="" disabled>Choose role here</option>
                        <option value={'CLIENT'} >Client</option>
                        <option value={'PRODUCER'}>Producer</option>
                        <option value={'ADMIN'}>Admin</option>
                    </select>
                </div>
                <div className="form-group row col-sm-10">
                    <label htmlFor='register-btn' className="col-sm-2 col-form-label"/>
                         <button className='btn btn-secondary btn-block col-sm-10 form-control'
                                 onClick={register}>
                             Register</button>
                </div>
                <div className="form-group row col-sm-10">
                    <label htmlFor='cancel-btn' className="col-sm-2 col-form-label"/>
                    <button className='btn btn-danger btn-block col-sm-10 form-control' >
                        <Link to={"/"} className="cancel-link">
                            Cancel</Link>
                    </button>
                </div>
                <div className='form-group row col-sm-10'>
                    <label htmlFor='login-btn'
                           className='col-sm-2 col-form-label'/>
                    <Link to='/login'
                          className='col-sm-10 text-left cancel-link'>
                        Go to login
                    </Link>
                </div>
                </>
            }
            {/*User registered */}
            {
                user &&
                <>
                    <div className='alert alert-warning'>
                        You're already logged in
                    </div>
                    <button className='btn btn-secondary' onClick={() => history.goBack()}>
                        Go Back
                    </button>
                </>
            }
        </div>
    )
}

export default RegisterScreen