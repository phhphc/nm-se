import { useState } from "react"
import Link from "next/link"
import axios from "../../utils/axios"

const SignUp = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConformPassword] = useState<string>("")
    const [faculty, setFaculty] = useState<string>("")


    return (
        <div>
            <Link href="/">Home</Link>
            <br />

            <form onSubmit={e => {
                e.preventDefault();
                axios.post("/api/user/signup", {
                    username,
                    password,
                    faculty,
                })
                    .then(res => { console.debug(res) })
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
                <label>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={e => setConformPassword(e.target.value)} />
                </label>
                <label>
                    Faculty:
                    <input type="text" value={faculty} onChange={e => setFaculty(e.target.value)} />
                </label>
                <input type="submit" value="Sign Up" />
            </form>

        </div >
    )
}

export default SignUp