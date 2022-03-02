import { useState } from "react";
import axios from "../../utils/axios";
import Link from "next/link";
import { useRouter } from "next/router"

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div>
            <Link href="/">Home</Link>

            <form onSubmit={e => {
                e.preventDefault()
                axios.post("/api/user/login", { username, password })
                    .then(res => { 
                        console.debug(res)
                        router.push("/") // redirect 
                    })
                    .catch(err => { console.debug(err) })
            }}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Login" />
            </form>


        </div>
    )
}

export default Login;