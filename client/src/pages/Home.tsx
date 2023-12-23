import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const [name, setName] = useState<string>('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true

    const handleLogout =  () => {
        axios.post('http://localhost:4000/logout')
            .then(() => navigate('/login'))
            .catch((error) => {console.log(error)})
    }
    

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
    <div>
        <p>Hola { name }</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
    
  )
}

export default Home;
