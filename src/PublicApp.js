import { Link,Outlet } from "react-router-dom"
function PublicApp() {
    return <div>
        <Link to={"/auth/login"}> <button>Login btn</button></Link>
        <Link to={"/auth/signup"}><button>Signup btn</button></Link>
        <Outlet />
        </div>
}

export default PublicApp