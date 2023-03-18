import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../../App.css'
import Search from './Search'
import history from 'history/browser';
import { logout } from '../../actions/userAction'

const Header = () => {
    const dispatch = useDispatch();
    const { loading, user } = useSelector(state => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <img src="/images/touch.jpg" alt='Logo' width={140} height={35} />
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Search history={history} />

                    {/* TODO */}
                    {/* <Routes>
                        <Route render={(history) => <Search history={history} />} />
                    </Routes> */}
                    {/* <Router render={(history) => <Search history={history} />} /> */}
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to='/cart' style={{ textDecoration: 'none', cursor: 'pointer' }}>
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">2</span>
                    </Link>
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className='btn dropdown-toggle text-white mr-4'
                                type="button" id="dropDownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby='dropDownMenuButton' >
                                {user && user.role !== "admin" ? (
                                    <Link className='dropdown-item' to='/orders/me' >Orders</Link>
                                ) : (
                                    <Link className='dropdown-item' to='/dashboard' >Dashboard</Link>
                                )}
                                <Link className='dropdown-item' to='/me' >Profile</Link>
                                <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler} >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    ) : !loading && <Link to="/login" className="btn ml-2" id="login_btn">Login</Link>}


                </div>
            </nav>
        </>
    )
}

export default Header