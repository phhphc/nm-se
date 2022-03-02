import axios from "../utils/axios";
import { Student } from "../interfaces"
import { useState, useEffect } from 'react';
import Link from "next/link";

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { increasement, decreasement, selectCount } from '../app/counterSlice';


function App() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [student, setStudent] = useState<Student | null>(null)

  useEffect(() => {
    axios.get("/api/user/detail")
      .then(res => setStudent(res.data))
      .catch(err => console.debug(err))
  }, [])

  return (
    <div>
      <Link href="/login">Login</Link>
      <br />
      <Link href="/logout">Logout</Link>
      <br />
      <Link href="/signup">Signup</Link>

      <div>
        {student ? `Hello ${student.username} from ${student.faculty}` : "You are not login"}
      </div>

      <div>
        <button onClick={() => dispatch(decreasement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increasement())}>+</button>
      </div>


    </div>
  );
}

export default App;
