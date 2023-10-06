import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function NavBar(props) {

  const logout = () => {
    axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:3001/logout"
    }).then(res => {console.log(res);window.location.reload();}).catch(err => console.log(err));
  };

  return (
    <div className="header-div">
      <a href="/"><img src="logo.svg" className="header-logo"></img></a>
      <span className="header-links">
        {!props.username && 
          <>
            <Link href="/login"><h2>Login</h2></Link>
            <Link href="/register"><h2>Inregistrare</h2></Link>
          </>
        }   
        {props.username && 
          <>
            <Link href="/" onClick={logout} ><h2>Logout</h2></Link>
            <Link href="/profile"><h2>Profil</h2></Link>
          </>
        }
      </span>
    </div>
  );
}