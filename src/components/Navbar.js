import React,{useEffect,useState} from 'react'
import { Link ,useLocation, useNavigate} from 'react-router-dom'

// import Login from './Login';

const Navbar = (props) => {
//  const uname=props.userData.name
  const [userLocation, setUserLocation] = useState("");
   const [showProfileMenu, setShowProfileMenu] = useState(false);
  const apiUrl=process.env.REACT_APP_API_URI;
  


   

  let navigator=useNavigate();
      const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("name");

        navigator("/mapview");
        props.showAlert("Logout","success","Successfully")

      }

    let location = useLocation()

//

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      const fetchLocation = async () => {
        try {
          const resp = await fetch(`${apiUrl}/api/auth/getuser`, {
            method: 'POST',
            headers: {
              'auth-token': token,
            },
          });
          const data = await resp.json();
          setUserLocation(data.location);
        } catch (error) {
          console.error("Failed to fetch location", error);
        }
      };

      fetchLocation();
    } else {
      setUserLocation(''); // if no token, clear the location
    }
  }, [location.pathname,apiUrl]);


  const handleDeleteUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${apiUrl}/api/auth/deleteuser`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        props.showAlert("Account deleted", "success", "Your account has been deleted.");
        handleLogout();
      } else {
        const data = await response.json();
        props.showAlert("Error", "danger", data.error || "Failed to delete account");
      }
    } catch (error) {
      props.showAlert("Error", "danger", "Server error. Try again later.");
    }
  };


  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{    zIndex:4}} >
  <div className="container-fluid">
    <Link className="navbar-brand" style={{left: '9px',
    fontFamily: 'cursive',
    position: 'absolute',
    borderRadius: '7px',
    padding: '7px'}} to="/"><img style={{height:"50px", borderRadius:"6px"}} src="https://www.ardmediathek.de/img?imwidth=1920&url=https%3A%2F%2Fapi.ardmediathek.de%2Fimage-service%2Fimages%2Furn%3Aard%3Aimage%3A4db632fd2ae4e3a8%3Fch%3D1df3bf5ff47277c3%26w%3D{width}" alt="" />MyChemnitz</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home <i className="fa-solid fa-house mx-1"></i></Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About<i className="fa-solid fa-circle-info mx-1"></i></Link>
        </li>
         {localStorage.getItem('token') && (
    <li className="nav-item">
      <Link className={`nav-link ${location.pathname === "/mapview" ? "active" : ""}`} to="/mapview">Map<i className="fa-solid fa-map-location-dot mx-1"></i></Link>
    </li>
    
    
  )}
      {localStorage.getItem('token') && (
    <li className="nav-item">
      <Link className={`nav-link ${location.pathname === "/bookeditem" ? "active" : ""}`} to="/bookeditem">Bookmarks<i className="fa-solid fa-bookmark mx-1"></i></Link>
    </li>
    
    
  )}
    
      </ul>
      {!localStorage.getItem('token')?<form>

      <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to="/signup"  role="button">Sign up</Link>
      </form> :<div><button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button><div  className="users" style={{color:"white"}}><img className="img" onClick={() => setShowProfileMenu(!showProfileMenu)} src='https://cdn-icons-png.flaticon.com/512/4315/4315730.png' alt='User'/>{localStorage.getItem('name')} - Location({userLocation})
      {/* */}
{showProfileMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '40px',
                      right: 0,
                      background: 'white',
                      color: 'black',
                      borderRadius: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      zIndex: 1000,
                      width: '150px',
                      padding: '8px 0',
                    }}>
                      <button
                        style={{
                          display: 'block',
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '8px 16px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #ccc'
                        }}
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigator("/update-profile");
                        }}
                      >
                        Update
                      </button>
                      <button
                        style={{
                          display: 'block',
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '8px 16px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          color: 'red',
                          fontWeight: 'bold'
                        }}
                        onClick={() => {
                          setShowProfileMenu(false);
                          handleDeleteUser();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}

      {/* */}
      
      
      
      </div></div>} 


    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
