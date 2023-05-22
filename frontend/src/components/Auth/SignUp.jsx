import { useState } from "react";
import axios from "axios";
import {useSignIn} from 'react-auth-kit'
import { useNavigate  } from "react-router-dom";
import { TourState } from "../../context/TourProvider";
import Toast from "../Utils/Toast";


function SignUp() {
  const [name, setName] = useState()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const {setLoadUser} = TourState();
  const signIn = useSignIn();
  const navigate = useNavigate();


  const submitHandler = async () => {  
    if (!email || !password || !name || !passwordConfirm) {
       alert("Some fields are missing")
        return;
    }


    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const {data}  = await axios.post(
            "/api/users/signup",
            { email, password, name, passwordConfirm },
            config
        );
        if(signIn({
          token:data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: data.data.user,
        })) {
          Toast({ type: "success", message: "Signed up Successfully", duration: 1000 });
          setLoadUser(true);
          navigate("/")
        }
    } catch (error) {
      Toast({ type: "error", message: `${error.response.data.message}`, duration: 1000 });
    }
};
  return (
    <form className="form font-bold">
      <div className="input-group">
        <label htmlFor="name" className="font-bold">Name</label>
        <input type="text" name="name" placeholder="Alex" onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className="input-group">
        <label htmlFor="email" className="font-bold">Email</label>
        <input type="email" name="email" placeholder="nome@email.com.br" onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div className="input-group">
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input type="password" name="passwordConfirm" onChange={(e) => setPasswordConfirm(e.target.value)}/>
      </div>
      <button className="primary" onClick={submitHandler} type="button">Submit</button>
    </form>
  )
}

export default SignUp