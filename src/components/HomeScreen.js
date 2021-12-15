import "../vendors/bootstrap/css/bootstrap.min.css"
import {BrowserRouter, Link, Route} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import RegisterScreen from "./RegisterScreen";
import DetailsScreen from "./DetailsScreen";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";
import UserListsScreen from "./UserListsScreen";
import SearchScreen from "./SearchScreen";
import UserPublicProfile from "./UserViewScreen";
import React, {useEffect, useState} from "react";
import userService from "../services/user";

const HomeScreen = () => {
    const [user, setUser] = useState(undefined);

    const logout = () => {
        return userService.logout()
            .then(() => setUser(undefined));
    }

    useEffect(() => {
        userService.fetchProfile()
            .then(res => setUser(res));
    }, []);

    return (
        <div className='container-fluid'>
            <BrowserRouter>
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                    <Link className='navbar-brand' to='/'>IMDB Clone</Link>
                    <div className='collapse navbar-collapse'>
                        <div className='navbar-nav'>
                            <Link className='nav-item nav-link' to='/'>
                                Home
                            </Link>
                        </div>
                        <div className='navbar-nav'>
                            <Link className='nav-item nav-link' to='/search'>
                                Search
                            </Link>
                        </div>
                        {user &&
                         <div className='navbar-nav'>
                             <Link className='nav-item nav-link' to='/profile'>
                                 Profile
                             </Link>
                         </div>
                        }
                        <div className='navbar-nav'>
                            <Link className='nav-item nav-link' to='/user-list'>
                                Users
                            </Link>
                        </div>
                    </div>
                    {
                        !user &&
                        <>
                            <Link className='btn btn-clear' to='/login'>
                                Login
                            </Link>
                            <Link className='btn btn-clear ' to='/register'>
                                Register
                            </Link>
                        </>
                    }
                    {
                        user &&
                        <>
                            <div className='mr-3'>
                                <Link to='/profile' className="user-name-link">
                                    Hi {user.fullName}
                                </Link>
                            </div>
                            <button className='btn btn-secondary' onClick={logout}>
                                Logout
                            </button>
                        </>
                    }
                </nav>
                <Route exact={true} path={['/']}>
                    <HomeComponent user={user}/>
                </Route>
                <Route exact={true} path={['/register']}>
                    <RegisterScreen user={user}/>
                </Route>
                <Route exact={true} path={['/details/:filmId']}>
                    <DetailsScreen user={user}/>
                </Route>
                <Route exact={true} path={['/login']}>
                    <LoginScreen user={user} setUser={setUser}/>
                </Route>
                <Route exact={true} path={['/profile']}>
                    <ProfileScreen user={user} setUser={setUser}/>
                </Route>
                <Route exact={true} path={['/user-list']}>
                    <UserListsScreen user={user}/>
                </Route>
                <Route exact={true} path={['/search', '/search/:searchItem']} component={SearchScreen}/>
                <Route exact={true} path={['/profile/:uid']} component={UserPublicProfile}/>
            </BrowserRouter>
        </div>
    );
}

export default HomeScreen;