import Link from "next/link"
import axios from "../../utils/axios";
import { useRouter } from "next/router"


const Logout = () => {
    const router = useRouter();

    return (
        <div>
            <Link href="/">Home</Link>

            <br />

            <button onClick={() => {
                axios.post("/api/user/logout")
                    .then(res => {
                        console.debug(res)
                        router.push("/") // redirect
                    })
                    .catch(err => console.debug(err))
            }}>Logout</button>

        </div>
    )
}

export default Logout;