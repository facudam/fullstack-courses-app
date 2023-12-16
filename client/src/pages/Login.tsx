import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  type UserData = {
    user_id: number;
    user_name: string;
    user_email: string;
    user_password: string;
    isLogged: boolean;
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [account, setAccount] = useState<UserData>();
  const [isDataInvalid, setIsDataInvalid] = useState<boolean>(false);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        setIsDataInvalid(false);
        setAccount(res.data);
        // setIsLoggedIn(true)
      })
      .catch((err) => {
        setIsDataInvalid(true);
        console.log("hola " + err);
      });
  };

  return (
    <div>
      {account?.isLogged ? (
        <p>Bienvenido {account?.user_name}</p>
      ) : (
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
      )}

      {isDataInvalid && <span>Usuario y/o contraseña inválidos</span>}
    </div>
  );
};
