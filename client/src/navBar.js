import React from 'react';
// import {NavLink} from 'react-router-dom'
import {useSelector} from "react-redux";
import { useDispatch} from 'react-redux';
import {log_out} from "./redux/actions/auth";
// import {on_search} from "../redux/actions/products";
// import {shopCart} from "../redux/actions/cart";

export default function NavBar() {
    const {isLogged} = useSelector(state=>state.auth)
    // const {search} = useSelector(state=> state.products)
    const dispatch = useDispatch()

    const handleLogOut = async () =>{
        dispatch(log_out())
    }
    // const onChange = (value) =>{
    //     dispatch(on_search(value))
    // }
    // const toShopCart = ()=>{
    //     dispatch(shopCart())
    // }

    return (
        <nav>
            <div className='container'>
                <div className="nav-wrapper">
                    {/*<NavLink className="brand-logo" to="/restaurants">Logo</NavLink>*/}
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {
                            !isLogged
                                ?
                                null
                                :
                                <li style={{marginLeft: '10px'}}>
                                    <button
                                        className="logout waves-effect waves-light btn-small"
                                        onClick={handleLogOut}
                                    >
                                        LogOut
                                    </button>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
