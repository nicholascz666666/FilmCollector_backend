import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import bookmarkService from '../services/bookmark'
import recommendationService from '../services/recommendation'
import './home.css'

const HomeComponent = ({user}) => {

    const [bookmarks, setBookmarks] = useState([])
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        bookmarkService.getAllBookmarks()
            .then(res => setBookmarks(res));
    }, [])

    useEffect(() => {
        recommendationService.getAllRecommendations()
            .then(res => setRecommendations(res));
    }, [])

    return (
        <div>
            <br/>
            <div className="bottom-padding">
                <h4>
                    <span className="fs-2">
                        Featured today
                    </span>
                </h4>
                <ul className='homepage-icons'>
                    {
                        recommendations.map(recommendation =>
                            <li
                                key={recommendation._id}>
                                <Link
                                    to={`/details/${recommendation.filmId}`}
                                    className="homepage-icons-item">
                                    <img alt={``}
                                         src={`http://books.google.com/books/content?id=${recommendation.filmId}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
                                         height="220px" width="193px"
                                    />
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
            { user &&
                <div className="bottom-padding">
                    <h4>
                        <span className="user-name-link-background">
                        Take a look at what people are reading.
                        </span>
                    </h4>
                    <ul className='homepage-icons'>
                        {
                            bookmarks.map(bookmark =>
                                <li
                                    key={bookmark._id}>
                                    <Link
                                        to={`/details/${bookmark.filmId}`}
                                        className="homepage-icons-item">
                                        <img alt={``}
                                             src={`http://books.google.com/books/content?id=${bookmark.filmId}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
                                             height="220px" width="193px"
                                        />
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            }
            {
                !user &&
                <div>
                    <h4>
                        <span className=" fs-2">
                            What to watch
                        </span>
                    </h4>
                </div>
            }
        </div>
    )
}

export default HomeComponent