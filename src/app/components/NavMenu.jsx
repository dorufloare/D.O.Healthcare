import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function NavBar(props) {

  const logout = () => {
    axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:3001/logout"
    }).then(res => console.log(res)).catch(err => console.log(err));
  };

  return (
    <div className="header-div">
      {!props.username && 
      <>
      <Link href="/login"><h2>Login</h2></Link>
      <Link href="/register"><h2>Register</h2></Link>
      </>
      }   
      {props.username && 
        <>
          <h2 onClick={logout} style={{ cursor: "pointer" }}>Logout</h2>
          <Link href="/"><h2>Profile</h2></Link>
        </>
      }
      
    </div>
  );
}