import TextInput from '../components/TextInput'
import {NavLink} from 'react-router-dom'

export default function SignPage() {
    return (
    <div className="bg-zinc-600 min-h-screen">
        <p className="p-3 font-bold italic text-white text-2xl">RART-2000</p>

        <div className="flex items-center flex-col">
            <form>
                <TextInput label="username"/>
                <TextInput label="password"/>
                <button className="m-3 w-96 p-1 rounded-md bg-sky-300 hover:bg-sky-400">Sign In</button>
            </form>
            <NavLink
                to="/register"
                className="m-3 mt-8 w-96 p-1 text-center rounded-md bg-white hover:bg-gray-200">
                Register
            </NavLink>
        </div>
    </div>
    )
}