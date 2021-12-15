import React, {useState} from 'react';
import axios from "axios";
import './home.css'
import {Link, useHistory} from "react-router-dom";

const SearchScreen = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [medias, setMedia] = useState({items: []});
    const history = useHistory();

    const onInputChange = (e) => {
        setSearchTitle(e.target.value);
    }

    let API_URL = 'http://www.omdbapi.com/?apikey=e5a4694e&';

    const fetchMedias = async () => {
        const result = await axios.get(`${API_URL}s=${searchTitle}`)
        setMedia(result.data);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        fetchMedias().catch(() => alert('Invalid search term.'));

    }

    const updateSearch = () => history.push(`/search/${searchTitle}`);

    return (
        <section>
            <form className="mt-2 wrapper" onSubmit={onSubmitHandler}>
                <br/>
                <div className="w-75 wrapper">
                    <input type="search" className="form-control me-sm-2" placeholder="Media title"
                           value={searchTitle} onChange={onInputChange}/>
                    <button type="submit" className="btn btn-secondary my-2 my-sm-0"
                            onClick={updateSearch}>
                        Search
                    </button>
                </div>
                <br/>
            </form>
            {medias.Search === undefined &&
             <div className=" w-50 wrapper-warning alert-warning">
                 Search IMDb by typing a word or phrase in the search box at the top of this
                 page </div>
            }
            {searchTitle !== undefined && medias.Search !== undefined &&
             <div className="bottom-padding">
                 <h6 className="pt-5 wrapper">
                     Results for {searchTitle}
                 </h6>
                 <ul>
                     {
                         medias.Search.map((media, index) => {
                             return (
                                 <li key={index}>
                                     <div>
                                         <span className="fs-4"> {media.Title} </span>
                                         <br/>

                                         <Link to={`/details/${media.imdbID}`}>
                                             <img alt={`${media.Title} movie`}
                                                  src={`${media.Poster}`}/>
                                         </Link>
                                         <div>
                                             <br/>
                                             <button className="btn btn-primary">
                                                 <Link to={`/details/${media.imdbID}`}
                                                       className="text-light">
                                                     Details
                                                 </Link>
                                             </button>
                                         </div>
                                     </div>
                                     <hr/>
                                 </li>
                             )
                         })
                     }
                 </ul>
             </div>
            }
        </section>
    )
}

export default SearchScreen;