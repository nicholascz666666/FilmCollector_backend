import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import userService from '../services/user';
import bookmarkService from '../services/bookmark';
import recommendationService from '../services/recommendation';
import producerFilmService from '../services/producerFilm';

const ProfileScreen = ({user, setUser}) => {

    const [editing, setEditing] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [producerFilms, setProducerFilms] = useState([]);

    const onChangeFullName = (e) => {
        const text = e.target.value;
        setUser({...user, fullName: text});
    }

    const onChangePassword = (e) => {
        const text = e.target.value;
        setUser({...user, password: text})
    }

    const onChangeEmail = (e) => {
        const emailVal = e.target.value;
        setUser({...user, email: emailVal});
    }

    const cancel = () => {
        setEditing(false);
    }

    const save = () => {
        userService.updateUser(user);
        setEditing(false);
    }

    useEffect(() => {
        if (user) {
            bookmarkService.getBookmarksForUser(user._id)
                .then(res => setBookmarks(res));
        }
        if (user && user.role === "PRODUCER") {
            recommendationService.getRecommendationsForUser(user._id)
                .then(res => setRecommendations(res));
        }
        if (user && user.role === "PRODUCER") {
            producerFilmService.getProducerFilmsForUser(user._id)
                .then(res => setProducerFilms(res));
        }
        if (user && user.role === "ADMIN") {
            recommendationService.getRecommendationsForUser(user._id)
                .then(res => setRecommendations(res));
        }
    }, [user])
    return (
        <div className='container-fluid'>
            <br/>
            {/*Display users info with editing */}
            {
                editing && user &&
                <div>
                    <h2 className="text-info">{user.username}'s Profile</h2>
                    <ul className='list-group'>
                        <li className='text-info list-group-item'>
                            Full Name:
                            <input className='form-control' onChange={onChangeFullName}
                                   value={user.fullName}/>
                        </li>
                        <li className='list-group-item'>
                            Username: {user.username}
                        </li>
                        <li className='list-group-item'>
                            New password:
                            <input className='form-control' type='password'
                                   onChange={onChangePassword} value={user.password}/>
                        </li>
                        <li className='list-group-item'>
                            Change email on file:
                            <input className='form-control' onChange={onChangeEmail}
                                   value={user.email}/>
                        </li>
                        <li className='list-group-item'>
                            Role: {user.role}
                        </li>
                    </ul>
                    <br/>
                    <div>
                        <button className='btn btn-success' onClick={save}>
                            Save changes
                        </button>
                        <button className='btn btn-danger float-right' onClick={cancel}>
                            Discard changes
                        </button>
                    </div>
                </div>

            }
            {/*Display no users info */}
            {
                !user &&
                <>
                    <br/>
                    <div className="alert alert-warning">
                        <strong>
                            Login to view your profile
                        </strong>
                    </div>
                    <Link className='btn btn-secondary' to='/login'>
                        Login
                    </Link>
                </>
            }
            {/*Display users info without editing */}
            {
                !editing && user &&
                <div>
                    <h1 className="">{user.username}'s Profile</h1>
                    <div className="row">
                        <h4 className="account-headers col-11">
                            General Account Settings </h4>
                        <button className='btn btn-primary float-right col-1 edit-profile-btn'
                                onClick={() =>
                                    setEditing(true)}>
                            Edit settings
                        </button>
                    </div>
                    <ul className='list-group'>

                        <li className='list-group-item text-info'>Full Name: {user.fullName}</li>
                        <li className='list-group-item text-info'>Username: {user.username}</li>
                        <li className='list-group-item text-info'>Email address: {user.email}</li>
                        <li className='list-group-item text-info'>Role: {user.role}</li>
                    </ul>
                    <br/>
                </div>
            }
            {/*Display clients info without editing */}
            {
                !editing && user && user.role === "CLIENT" &&
                <div className="bottom-padding">
                    <h4 className="account-headers">
                        Bookmarks </h4>
                    <ul className='list-group bookmark-link'>
                        {bookmarks.map(bookmark =>
                                           <Link key={bookmark._id}
                                                 className='list-group-item bookmark-link'
                                                 to={`/details/${bookmark.filmId}`}>
                                               {bookmark.filmTitle}
                                           </Link>
                        )}
                    </ul>
                </div>
            }


            {
                !editing && user && user.role === "ADMIN" &&
            <div>
                <h4 className="account-headers">
                    Recommendation List </h4>
                <ul className='list-group bookmark-link'>
                    {recommendations.map(recommendation =>
                        <Link key={recommendation._id}
                              className='list-group-item bookmark-link'
                              to={`/details/${recommendation.filmId}`}>
                            {recommendation.filmTitle}
                        </Link>
                    )}
                </ul>
            </div>
            }
            {/*Display producers info without editing */}
            {
                !editing && user && user.role === "PRODUCER" &&
                <div>
                    <h4 className="account-headers">
                        Producer's Films </h4>
                    <ul className='list-group bookmark-link'>
                        {producerFilms.map(book =>
                                               <Link key={book._id}
                                                     className='list-group-item bookmark-link'
                                                     to={`/details/${book.filmId}`}
                                                     style={{color: 'red'}}>
                                                   {book.filmTitle}
                                               </Link>
                        )}
                    </ul>
                </div>
            }
            <br/>
            {!editing && user && user.role === "PRODUCER" &&
             <div>
                 <h4 className="account-headers">
                     Recommendation List </h4>
                 <ul className='list-group bookmark-link'>
                     {recommendations.map(recommendation =>
                                              <Link key={recommendation._id}
                                                    className='list-group-item bookmark-link'
                                                    to={`/details/${recommendation.filmId}`}>
                                                  {recommendation.filmTitle}
                                              </Link>
                     )}
                 </ul>
             </div>
            }
            <br/>
            {!editing && user && user.role === "PRODUCER" &&
             <div className="bottom-padding">
                 <h4 className="account-headers">
                     Bookmarks </h4>
                 <ul className='list-group bookmark-link'>
                     {bookmarks.map(bookmark =>
                                        <Link key={bookmark._id}
                                              className='list-group-item bookmark-link'
                                              to={`/details/${bookmark.filmId}`}>
                                            {bookmark.filmTitle}
                                        </Link>
                     )}
                 </ul>
             </div>
            }
        </div>
    )
}

export default ProfileScreen