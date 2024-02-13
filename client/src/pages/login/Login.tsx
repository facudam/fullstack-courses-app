import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";


export const Login = () => {

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ isDataInvalid, setIsDataInvalid ] = useState<boolean>(false);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get(`${ apiBaseUrl }/api/validation`)
        .then(res => {
            if(res.data.valid) navigate('/') 
        })
        .catch(err => {
            console.log(err)
        })
})

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${ apiBaseUrl }/api/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res: AxiosResponse) => {
        if (res.data.login) {
          setIsDataInvalid(false);
          navigate('/')
        }
      })
      .catch((err) => {
        setIsDataInvalid(true);
        console.log("Hubo un error: " + err);
      });
  };

  return (
    <div>
      <form action="" onSubmit={  handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={  handleEmail}
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={ handlePassword }
            type="password"
            name="password"
            placeholder="Enter password"
            value={ password }
          />
        </div>
        <button type="submit">Log in</button>
        <p>Don't you have an account already?</p>
        <Link to="/signup">Create an account</Link>
      </form>
      { isDataInvalid && <span>Usuario y/o contraseña inválidos</span> }
    </div>
  );
};
