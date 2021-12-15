import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import userService from '../services/user'
import './home.css'

const UserListsScreen = ({user}) => {
    const [clients, setClient] = useState([])
    const [producers, setProducers] = useState([])
    const [admins, setAdmin] = useState([])

    useEffect(() => {
        if (user && user.role === "ADMIN") {
        userService.findAllProducers()
            .then(res => setProducers(res));
        }
        if (user &&user.role === "ADMIN") {
            userService.findAllClients()
                .then(res => setClient(res));
        }
        if (user &&user.role === "ADMIN") {
            userService.findAllAdmins()
                .then(res => setAdmin(res));
        }
    }, [user])



    return (
        <div>
            <h1>Page for Admins</h1>


                <div className="row author-reader-list home-page-users">
                    <h4 className="col-sm home-page-users">
                        <span className="fs-3">
                            The Producers
                        </span>
                    </h4>
                    <h4 className="col-sm home-page-users">
                        <span className="fs-3">
                            The Users
                        </span>
                    </h4>
                    <h4 className="col-sm home-page-users">
                        <span className="fs-3">
                            The Admins
                        </span>
                    </h4>
                </div>


            <div className="row home-page-users author-reader-list">
                <ul className='list-group user-list col-sm'>
                    {
                        producers.map(producer =>
                            <li className='list-group-item col-sm'
                                key={producer._id}>
                                <Link
                                    to={`/profile/${producer._id}`}
                                    className="user-links">
                                    {producer.username}
                                </Link>
                            </li>)
                    }
                </ul>

                <ul className='list-group user-list col-sm'>
                    {
                        clients.map(client =>
                            <li className='list-group-item col-sm'
                                key={client._id}>
                                <Link
                                    to={`/profile/${client._id}`}
                                    className="user-links">
                                    {client.username}
                                </Link>
                            </li>)
                    }
                </ul>

                <ul className='list-group user-list col-sm'>
                    {
                        admins.map(admin =>
                            <li className='list-group-item col-sm'
                                key={admin._id}>
                                <Link
                                    to={`/profile/${admin._id}`}
                                    className="user-links">
                                    {admin.username}
                                </Link>
                            </li>)
                    }
                </ul>


            </div>



        </div>

    )
}

export default UserListsScreen