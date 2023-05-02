import { useState } from "react";
import axios from "axios";
import { useToast } from '@chakra-ui/react'
import {useSignIn} from 'react-auth-kit'
import '../../style.css'


function Login() {
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const signIn = useSignIn();

  const submitHandler = async () => {  
    if (!email || !password) {
        toast({
            title: "Please Fill all the Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        return;
    }

    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const {data}  = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );
        //TODO:
        signIn({
          token:data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: data.data,
        })



        // console.log(JSON.stringify(data));
        toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    } catch (error) {
        toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    }
};
  return (
    
    <form className="form font-bold">
      <div className="input-group">
        <label htmlFor="email" className="font-bold">Email</label>
        <input type="email" name="email" placeholder="nome@email.com.br" onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <button className="primary" onClick={submitHandler} type="button">Submit</button>
    </form>
  )
}

export default Login