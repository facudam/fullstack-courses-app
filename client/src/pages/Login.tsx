import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDataInvalid, setIsDataInvalid] = useState<boolean>(false);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get('http://localhost:4000/api/validation')
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
        "http://localhost:4000/api/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
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
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleEmail}
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlePassword}
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
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
