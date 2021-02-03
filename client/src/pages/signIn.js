import React, {useState} from "react";
import {try_login} from "../redux/actions/auth";
import { useDispatch} from 'react-redux';
import {NavLink} from "react-router-dom";

export const SignIn = () =>{
    const dispatch = useDispatch()
    const [form, setForm]= useState({
        email: '',
        password: '',
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const loginHandler = async () => {

        await dispatch( try_login(form.email, form.password))
        // if(this.props.isSuccess){
        //     await alert('Вы успешно зарегистрировались')
        // }
    }
    return(
        <div className="row">
            <div className="col s6 offset-s4">
                <div className="card blue darken-1" style={{marginTop: '40px',width: '25rem'}}>
                    <div className="card-content white-text">
                        <span className="card-title">SignIn</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
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
                                    placeholder="Введите пароль"
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
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            // disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <NavLink to="/signUp"
                                 style={{marginLeft: '60px', color: 'red'}}
                        >
                            Create one
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
