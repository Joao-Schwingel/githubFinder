import { UserProps } from '../types/user'
import Search from '../components/Search'
import User  from '../components/User'
import {useState} from "react"
import Error from '../components/Erro'

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setErro] = useState(false);

    const loadUser = async(userName: string) => {
        setErro(false)
        setUser(null)
        const res = await fetch(`https://api.github.com/users/${userName}`)

        const data = await res.json();

        if(res.status == 404){
            setErro(true);
            return;
        }

        const {avatar_url, login, location, followers, following} = data

        const userData: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following,
        }
        setUser(userData)
    }


    return(
        <div>
        <Search loadUser={loadUser}/>
        {user && <User {...user} />}
        {error && <Error/>}
        </div>
    )
}

export default Home