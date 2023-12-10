import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { RegistrationData } from "../../Interface/register";
import {
  EMAIL_INPUT_REGEX,
  PWD_INPUT_RGX,
  USER_NAME_INPUT_RGX,
} from "../../constant/regex";

import axios from "../../api/axios";

function Register() {
  const userRef = useRef<HTMLInputElement>(null);

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState<RegistrationData>({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  // const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (userRef.current !== null) {
      userRef?.current.focus();
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegistrationData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateFormData = async (registrationData: RegistrationData) => {
    const tempErr = {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    };

    if (!USER_NAME_INPUT_RGX.test(registrationData.name)) {
      tempErr.name =
        "alphabet and numbers are only allowed with 3-20 character";
    }

    if (!EMAIL_INPUT_REGEX.test(registrationData.email)) {
      tempErr.email = "email is not a valid one";
    }

    if (!PWD_INPUT_RGX.test(registrationData.password)) {
      tempErr.password =
        "Atleast 1 capital and small letter, 1 number. 8-20 character";
    }

    if (!PWD_INPUT_RGX.test(registrationData.rePassword)) {
      
      tempErr.rePassword =
        "Atleast 1 capital and small letter, 1 number. 8-20 character";
    } else if (registrationData.password !== registrationData.rePassword) {
      tempErr.rePassword = "passwords are not matching";
    }
    const validated = Object.values(tempErr).every(
      (value: string) => value.length === 0
    );

    setError(tempErr);
    return validated;
  };

  const handleRegister = async (e: MouseEvent) => {
    e.preventDefault();
    const validated = await validateFormData(registrationData);
    if (validated) {
      // send registartion req
      console.log("validation success ", { error, registrationData });
      try{
        const resposne = await axios.post('/auth/register', JSON.stringify({
            email : registrationData.email,
            name : registrationData.name,
            password: registrationData.password
          }),{
            headers: {'Content-Type':'application/json'},
            withCredentials:true
          })
          console.log("resposne -----> ", resposne.data);
          
      } catch(err) {
        console.log("register errr", err);
      }
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-md p-5 mx-auto">
        <h1 className="text-lg font-medium pb-5 text-white">Register</h1>
        <form className=" flex flex-col gap-5 bg-black/40 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div>
            <label className="input-label" htmlFor="name">
              name
            </label>
            <input
              className="input-box"
              type="text"
              id="name"
              name="name"
              ref={userRef}
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              required
              aria-invalid={error.name ? true : false}
              aria-describedby="name is mandidatory"
            />
            {error.name && <span className="text-red-500">{error.name}</span>}
          </div>

          <div>
            <label className="input-label" htmlFor="email">
              email
            </label>
            <input
              className="input-box"
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              required
              aria-invalid={error.email ? true : false}
              aria-describedby="email is mandidatory"
            />
            {error.email && <span className="text-red-500">{error.email}</span>}
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
              aria-invalid={error.password ? true : false}
              aria-describedby="password is mandidatory"
            />
            {error.password && (
              <span className="text-red-500">{error.password}</span>
            )}
          </div>

          <div>
            <label className="input-label" htmlFor="rePassword">
              Confirm Password
            </label>
            <input
              className="input-box"
              type="password"
              id="rePassword"
              name="rePassword"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              required
              aria-invalid={error.rePassword ? true : false}
              aria-describedby="reenter password is mandidatory"
            />
            {error.rePassword && (
              <span className="text-red-500">{error.rePassword}</span>
            )}
          </div>

          <button
            className="bg-blue-400 mt-5 px-4 py-2 rounded-md text-white hover:bg-blue-500 duration-200"
            onClick={(e: MouseEvent) => handleRegister(e)}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
