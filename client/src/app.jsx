import * as React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/loginPage";
import {RegisterPage} from "./pages/registerPage";
import {ProfilePage} from "./pages/profilePage";

function NavBar() {
    return <header id={"navbar"}>
        <div className={"link"}>
            <Link to={"/"}>Home page</Link>
        </div>
        <div className={"link"}>
            <Link to={"/menu"}> Menu </Link>
        </div>
        <div className={"link"}>
            <Link to={"/menu/new"}> Add to menu </Link>
        </div>
        <div className={"link"}>
            <Link to={"/login"}>Login</Link>
        </div>
        <div className={"link"}>
            <Link to={"/profile"}>Profile</Link>
        </div>


    </header>;
}

export function App() {
    return <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path={"/"} element={<h1> Home page</h1>}/>
            <Route path={"/menu"} element={<h1>TBD</h1>}/>
            <Route path={"/login"} element={<LoginPage/>}/>
            <Route path={"/menu/new"} element={<h1>TBD</h1>}/>
            <Route path={"/register"} element={<RegisterPage/>}/>
            <Route path={"/profile"} element={<ProfilePage/>}/>
            <Route path={"*"} element={<h1>This is not the page you are looking for</h1>}/>
        </Routes>

    </BrowserRouter>;
}