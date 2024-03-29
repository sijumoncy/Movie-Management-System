import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { ILogin } from "../../Interface/Login";
import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const emailInpRef = useRef<HTMLInputElement>(null);

  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>('');

  const {setAuth, auth} = useAuth()
  const navigate = useNavigate();

  // const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (emailInpRef.current !== null) {
      emailInpRef?.current.focus();
    }
  }, []);

  useEffect(() => {
    if(auth?.user.id){
      navigate('/')
    }
  }, [auth])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    // call login
    if(loginData.email && loginData.password) {
      setError('')
      try{
        const resposne = await axios.post('/auth/login', JSON.stringify({
            email : loginData.email,
            password: loginData.password
          }),{
            headers: {'Content-Type':'application/json'},
            withCredentials:true
          })
          const data = resposne.data.data

          const authObj = {
            tokens: data.tokens,
            user: {
              email : data.user.email,
              id :data.user._id,
              isAdmin :data.user.isAdmin,
              name : data.user.name
            }
          }
          
          setAuth({
            tokens: data.tokens,
            user: {
              email : data.user.email,
              id :data.user._id,
              isAdmin :data.user.isAdmin,
              name : data.user.name
            }
          })

          localStorage.setItem('auth', JSON.stringify(authObj))
          navigate('/')
          
      } catch(err) {
        console.log("register errr", err);
        toast.error('login failed')
      }
    } else{
      console.log("fields required");
      setError('All fields are required')
      
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-md p-5 mx-auto">
        <h1 className="text-lg font-medium pb-5 text-white">Login</h1>
        <form className=" flex flex-col gap-5 bg-black/40 shadow-md rounded px-8 pt-6 pb-8 mb-4">

          <div>
            <label className="input-label" htmlFor="email">
              email
            </label>
            <input
              ref={emailInpRef}
              className="input-box"
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              required
              aria-describedby="email is mandidatory"
            />
          </div>

          <div>
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              className="input-box"
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              required
              aria-describedby="password is mandidatory"
            />
          </div>

          <div className="text-center">
            {error && (
              <span className="text-red-500">{error}</span>
            )}
          </div>

          <button
            className="bg-blue-400 mt-5 px-4 py-2 rounded-md text-white hover:bg-blue-500 duration-200"
            onClick={(e: MouseEvent) => handleLogin(e)}
            disabled={!!error}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
