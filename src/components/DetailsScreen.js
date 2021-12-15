import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import filmService from '../services/film'
import bookmarkService from '../services/bookmark'
import recommendationService from '../services/recommendation'
import producerService from '../services/producerFilm'
import './home.css'


const DetailsScreen = ({user}) => {
    const {filmId} = useParams();
    const [filmDetails, setFilmDetails] = useState([]);
    const [filmLoaded, setFilmLoaded] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [recommendation, setRecommendation] = useState(false);
    const [producerFilm, setProducerFilm] = useState(false);
    const [users, setUsers] = useState([])
    const history = useHistory();

    useEffect(() => {
            filmService.findFilmById(filmId)
                .then(items => {
                    setFilmDetails(items)
                    setFilmLoaded(true)
                })
            if (user) {
                bookmarkService.IsBookmark(filmId, user._id)
                    .then(res => setBookmark(res))
            }
            if (user && user.role === "PRODUCER") {
                recommendationService.IsRecommendation(filmId, user._id)
                    .then(res => setRecommendation(res))
            }
            if (user && user.role === "PRODUCER") {
                producerService.IsProducerFilm(filmId, user._id)
                    .then(res => setProducerFilm(res))
            }
            if (user && user.role === "ADMIN") {
                recommendationService.IsRecommendation(filmId, user._id)
                    .then(res => setRecommendation(res))
            }
    }, [filmId, user])


    useEffect(() => {
        bookmarkService.getAllUsersForBookmark(filmId)
            .then(res => {
                setUsers(res)
                setUsersLoaded(true)
            })
    }, [filmId])

    const addBookmark = () => {
        bookmarkService.addBookmark(filmId, user._id, user.username, filmDetails.Title)
            .then(() => setBookmark(true));
    }

    const removeBookmark = () => {
        bookmarkService.removeBookmark(filmId, user._id)
            .then(() => setBookmark(false));
    }

    const addRecommendation = () => {
        recommendationService.addRecommendation(filmId, user._id, user.username, filmDetails.Title)
            .then(() => setRecommendation(true));
    }

    const removeRecommendation = () => {
        recommendationService.removeRecommendation(filmId, user._id)
            .then(() => setRecommendation(false));
    }

    const addProducerFilm = () => {
        producerService.addProducerFilm(filmId, user._id, user.username, filmDetails.Title)
            .then(() => setProducerFilm(true));
    }

    const removeProducerFilm = () => {
        producerService.removeProducerFilm(filmId, user._id)
            .then(() => setProducerFilm(false));
    }

    const onClickMustLogin = () => {
        alert("Must be logged in to bookmark item.")
    }

    return (

        <div>
            { filmLoaded &&
            <div>
                <br/>
                <div className="row">
                    <i className='fas fa-arrow-alt-circle-left fa-2x col-sm-6' onClick={() => history.goBack()}/>
                    {
                    user && user.role === "CLIENT" &&
                    <div>
                        <Link className='fas fa-book bookmark float-right library-padding' to='/profile'>Bookmarked Movies</Link>
                        {
                            !bookmark &&
                            <button className='btn btn-clear'
                                    onClick={addBookmark}>
                                <i className='far fa-bookmark float-right bookmark left-reader-padding'>
                                    Add Bookmark
                                </i>
                                </button>
                        }
                        {
                            bookmark &&
                            <button className='btn btn-clear'
                                                onClick={removeBookmark}>
                                <i className='fas fa-bookmark float-right bookmark left-reader-padding'>
                                    Remove Bookmark
                                </i>
                                </button>
                        }
                    </div>
                    }
                    {
                        user && user.role === "ADMIN" &&
                        <div>
                            <Link className='fas fa-book bookmark float-right library-padding' to='/profile'>
                                My Profile</Link>
                            {
                                !recommendation &&
                                <button className='btn btn-clear'
                                        onClick={addRecommendation}>
                                    <i className='fas fa-plus-circle float-right bookmark'>
                                        Add to Recommendations
                                    </i>
                                </button>
                            }
                            {
                                recommendation &&
                                <button className='btn btn-clear'
                                        onClick={removeRecommendation}>
                                    <i className='fas fa-minus-circle float-right bookmark'>
                                        Remove Recommendation
                                    </i>
                                </button>
                            }
                        </div>
                    }

                    {
                    user && user.role === "PRODUCER" &&
                    <div className="left-author-padding">
                        <Link className='fas fa-book bookmark float-right library-padding' to='/profile'>My Profile</Link>
                        {
                            !bookmark &&
                            <button className='btn btn-clear'
                                    onClick={addBookmark}>
                                <i className='far fa-bookmark float-right bookmark left-padding'>
                                    Add to Bookmark
                                </i>
                            </button>
                        }
                        {
                            bookmark &&
                            <button className='btn btn-clear'
                                    onClick={removeBookmark}>
                                <i className='fas fa-bookmark float-right bookmark'>
                                    Remove Bookmark
                                </i>
                            </button>
                        }
                        {
                            !recommendation &&
                            <button className='btn btn-clear'
                                    onClick={addRecommendation}>
                                <i className='fas fa-plus-circle float-right bookmark'>
                                    Add to Recommendations
                                </i>
                            </button>
                        }
                        {
                            recommendation &&
                            <button className='btn btn-clear'
                                    onClick={removeRecommendation}>
                                <i className='fas fa-minus-circle float-right bookmark'>
                                    Remove Recommendation
                                </i>
                            </button>
                        }
                        {
                            !producerFilm &&
                            <button className='btn btn-clear'
                                    onClick={addProducerFilm}>
                                <i className='fas fa-pen float-right bookmark'>
                                    Add to Producer List
                                </i>
                            </button>
                        }
                        {
                            producerFilm &&
                            <button className='btn btn-clear'
                                    onClick={removeProducerFilm}>
                                <i className='fas fa-minus-circle float-right bookmark'>
                                    Remove from Producer List
                                </i>
                            </button>
                        }
                    </div>
                    }
                    {
                    !user &&
                    <div className="col-sm-6">
                        {
                            !bookmark &&
                            <button className='btn btn-clear float-right'
                                    onClick={onClickMustLogin}>
                                <i className='far fa-bookmark bookmark'>
                                    Add Bookmark
                                </i>
                            </button>
                        }
                    </div>
                    }
                </div>
                <br/>
                <div className="bottom-padding">
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            {/*<img alt={`${filmDetails.Title} book`}*/}
                            {/*     src={`http://books.google.com/books/content?id=${filmDetails.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}*/}
                            {/*     height="275px" width="185px"*/}
                            {/*/>*/}
                            <img alt={`${filmDetails.Title} movie`} src={`${filmDetails.Poster}`}/>
                        </li>
                        <li className='list-group-item'>
                            <p className="detail-fields">Title:</p>
                            <p>{filmDetails.Title}</p>
                        </li>
                        {/*<li className='list-group-item'>*/}
                        {/*    <p className="detail-fields">Author(s):  </p>*/}
                        {/*    <p>{filmDetails.volumeInfo.authors}</p>*/}
                        {/*</li>*/}
                        {/*<li className='list-group-item'>*/}
                        {/*    <p className="detail-fields">Categories: </p>*/}
                        {/*    <p>{filmDetails.volumeInfo.categories}</p>*/}
                        {/*</li>*/}
                        {/*<li className='list-group-item'>*/}
                        {/*    <p className="detail-fields">Ratings Count:</p>*/}
                        {/*    <p>{filmDetails.volumeInfo.ratingsCount}</p>*/}
                        {/*    <p className="detail-fields">Average Rating:</p>*/}
                        {/*    <p>{filmDetails.volumeInfo.averageRating} </p>*/}
                        {/*</li>*/}
                        {/*<li className='list-group-item'>*/}
                        {/*    <p className="detail-fields">Page Count: </p>*/}
                        {/*    <p>{filmDetails.volumeInfo.pageCount}</p>*/}
                        {/*</li>*/}
                        {/*<li className='list-group-item'>*/}
                        {/*    <p className="detail-fields">Publisher: </p>*/}
                        {/*    <p>{filmDetails.volumeInfo.publisher}</p>*/}
                        {/*    <p className="detail-fields">Published Date:</p>*/}
                        {/*    <p>{filmDetails.volumeInfo.publishedDate}</p>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
            }
            { usersLoaded  && users !== [] && user &&
                <div className="bottom-padding">
                    <h4 className="title-color">Check out who has bookmarked this!</h4>
                    <ul className='list-group'>
                        {
                            users.map(user =>
                                <li className='list-group-item col-sm'
                                    key={user.userId}>
                                    <Link
                                        to={`/profile/${user.userId}`}
                                        className="user-links">
                                        {user.username}
                                    </Link>
                                </li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default DetailsScreen;