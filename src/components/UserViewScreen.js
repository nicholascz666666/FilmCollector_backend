import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import bookmarkService from '../services/bookmark';
import producerService from '../services/recommendation';
import producerFilmService from '../services/producerFilm';
import userService from "../services/user";

const ProfileDetails = () => {
    const {uid} = useParams();
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [bookmarks, setBookmarks] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [producerFilms, setProducerFilms] = useState([]);

    useEffect(() => {
        userService.findUserById(uid)
            .then(res => setUser(res));
        setLoaded(true)
    }, [uid]);

    useEffect(() => {
        if (uid) {
            bookmarkService.getBookmarksForUser(uid).then(res => setBookmarks(res));
        }
        if (uid && user.role === "PRODUCER") {
            producerService.getRecommendationsForUser(uid).then(res => setRecommendations(res));
        }
        if (uid && user.role === "PRODUCER") {
            producerFilmService.getProducerFilmsForUser(uid).then(res => setProducerFilms(res));
        }

        if (uid && user.role === "ADMIN") {
            producerService.getRecommendationsForUser(uid).then(res => setRecommendations(res));
        }

    }, [uid, user.role]);
    return (
        <div>
            <br/>
            {loaded && user && user.role === "CLIENT" &&
                <div>
                    <h1>{user.username}'s Profile</h1>
                    <h6>{user.role}</h6>
                    <br/>
                    <h3>Bookmarks</h3>
                    <div className="bottom-padding">
                    <ul className='list-group'>
                        {bookmarks.map(bookmark =>
                            <Link key={bookmark._id}
                                  className='list-group-item bookmark-link'
                                  to={`/details/${bookmark.filmId}`}>
                                {bookmark.filmTitle}
                            </Link>
                        )}
                    </ul>
                    </div>
                </div>
            }

            {loaded && user && user.role === "ADMIN" &&
            <div>
                <h1>{user.username}'s Profile</h1>
                <h6>{user.role}</h6>
                <br/>
                <h3>Recommendations</h3>
                <div>
                    <ul className='list-group'>
                        {recommendations.map(recommendation =>
                            <Link key={recommendation._id}
                                  className='list-group-item bookmark-link'
                                  to={`/details/${recommendation.filmId}`}>
                                {recommendation.filmTitle}
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
            }

            {loaded && user && user.role === "PRODUCER" &&
            <div>
                <h1>{user.username}'s Profile</h1>
                <h6>{user.role}</h6>
                <br/>
                <div>
                <h3>Producer's Film</h3>
                <div>
                <ul className='list-group'>
                    {producerFilms.map(producerFilm =>
                        <Link key={producerFilm._id}
                              className='list-group-item bookmark-link'
                              to={`/details/${producerFilm.filmId}`}>
                            {producerFilm.filmTitle}
                        </Link>
                    )}
                </ul>
                </div>
                <br/>
                <h3>Recommendations</h3>
                <div>
                <ul className='list-group'>
                    {recommendations.map(recommendation =>
                        <Link key={recommendation._id}
                              className='list-group-item bookmark-link'
                              to={`/details/${recommendation.filmId}`}>
                            {recommendation.filmTitle}
                        </Link>
                    )}
                </ul>
                </div>
                <br/>
                <h3>Bookmarks</h3>
                <div className="bottom-padding">
                    <ul className='list-group'>
                        {bookmarks.map(bookmark =>
                            <Link key={bookmark._id}
                                  className='list-group-item bookmark-link'
                                  to={`/details/${bookmark.filmId}`}>
                                {bookmark.filmTitle}
                            </Link>
                        )}
                    </ul>
                </div>
                </div>
            </div>
            }
        </div>
    )
}

export default ProfileDetails;
