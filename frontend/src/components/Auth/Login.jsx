import { useState } from "react";
import axios from "axios";
import { useSignIn } from 'react-auth-kit'
import { Link, useNavigate } from "react-router-dom";
import { TourState } from "../../context/TourProvider";
import Toast from "../Utils/Toast";


function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setLoadUser } = TourState();
  const signIn = useSignIn();
  const navigate = useNavigate();


  const submitHandler = async () => {
    if (!email || !password) {
      alert("Some fields are missing")
      return;
    }


    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      if (signIn({
        token: data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: data.data.user,
      })) {
        Toast({ type: "success", message: "Logged in Successfully", duration: 1000 });
        setLoadUser(true);
        navigate("/")
      }
    } catch (error) {
      Toast({ type: "error", message: "User is not existed or credentials is wrong.", duration: 1000 });
    }
  };
  return (

    <>
      <form className="form font-bold">
        <div className="input-group">
          <label htmlFor="email" className="font-bold">Email</label>
          <input type="email" name="email" placeholder="nome@email.com.br" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="primary" onClick={submitHandler} type="button">Submit</button>
      </form>
      <Link to={'/signup'}>
        <button className="p-4 m-4 text-center w-full bg-pink-500 rounded-xl text-white">Sign up</button>
      </Link>
    </>

  )
}

export default Login