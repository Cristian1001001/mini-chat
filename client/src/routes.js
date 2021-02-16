import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {SignUp} from "./pages/signUp";
import {SignIn} from "./pages/signIn";
import {Chat} from "./pages/chat";
import {useSelector} from "react-redux";
import {AppWindow} from "./pages/appWindow";
import {ChatRoom} from "./pages/chatRoom";


export const UseRoutes = () =>{
    const {isLogged} = useSelector(state=>state.auth)
    if (isLogged) {
        return (
            <>
                <Switch>
                    <Route path='/userWindow'>
                        <AppWindow/>
                    </Route>
                </Switch>
                <Redirect to='userWindow'>
                    <AppWindow/>
                </Redirect>
            </>
        )
    }
    return (
        <>
            <Switch>
                <Route path="/signUp" exact>
                    <SignUp/>
                </Route>
                <Route path="/signIn" exact>
                    <SignIn/>
                </Route>
            </Switch>
            <Redirect to="/signUp">
                <SignUp/>
            </Redirect>
        </>
    )

}
