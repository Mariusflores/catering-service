import {useState} from "react";
import {Link} from "react-router-dom";

export function LoginPage() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        await fetch("/api/login", {
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({username, password})
        });
    }

    return <div>
        <form  onSubmit={handleSubmit}>
            <div className={"input-box"}>username:<input type="text" onChange={e => setUsername(e.target.value)}/></div>
            <div className={"input-box"}>password:<input type="password" onChange={e => setPassword(e.target.value)}/></div>
            <div>
                <button>Log in</button>
            </div>

        </form>

        <div>Dont have an account? <Link to={"/register"}>Register here</Link></div>
    </div>

}