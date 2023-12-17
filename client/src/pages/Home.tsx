import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const [name, setName] = useState<string>('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:4000/api/validation')
            .then(res => {
                if(res.data.valid) {
                    setName(res.data.username)
                } else {
                    navigate('/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
    })

  return (
    <div>Hola { name }</div>
  )
}

export default Home;
