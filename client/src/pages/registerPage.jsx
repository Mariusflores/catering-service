import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function RegisterPage() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault();
        console.log("registering...")
        await fetch("/api/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({username, password})

        });

        navigate("/login")
    }

    return <div>
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
            <div className={"input-box"}>Username:<input type="text" onChange={e => setUsername(e.target.value)}/></div>
            <div className={"input-box"}>Password:<input type={
                showPassword ? "text" : "password"
            } onChange={e => setPassword(e.target.value)}/>
                <br/>
                <br/>

                <label htmlFor="check">Show password
                    <input
                        type="checkbox"
                        value={showPassword}
                        onChange={() => setShowPassword((prev) => !prev)}
                    />
                </label>
            </div>

            <div>
                <button>Register</button>
                <hr/>
            </div>

        </form>

    </div>
}