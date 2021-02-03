import React, {useState} from 'react'
import {register} from "../redux/actions/auth";
import {useDispatch} from 'react-redux';
import {NavLink} from "react-router-dom";


export const SignUp= () =>{
    const dispatch = useDispatch()
    const [form, setForm]= useState({
        email: '',
        password: '',
        name: ''
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const registerHandler = async () => {

        await dispatch( register(form.email, form.password, form.name))
        // if(this.props.isSuccess){
        //     await alert('Вы успешно зарегистрировались')
        // }
    }


    return(
        <div className="row">
            <div className="col s6 offset-s4" >
                <div className="card blue darken-1" style={{marginTop: '40px',width: '25rem'}}>
                    <div className="card-content white-text">
                        <span className="card-title">SignUp</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter name"
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="yellow-input"
                                    value={form.name}
                                    onChange={changeHandler}
                                />
                                <div className="col-md-6">
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeHandler}

                                />
                                <div className="col-md-6">
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter Passord"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <div className="col-md-6">
                                    <label htmlFor="email">Password</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            // disabled={loading}
                        >
                            Register
                        </button>
                        <NavLink to="/signIn"
                                 style={{marginLeft: '60px', color: 'red'}}
                        >
                            I have an account
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
