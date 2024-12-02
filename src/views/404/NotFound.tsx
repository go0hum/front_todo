import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="font-black text-center text-6xl text-gray-800">
            Page not Found!
            <p className="text-xs pt-3">Maybe you want to create a task <Link to="/" className="text-orange-400">here</Link></p>
        </div>
    )
}