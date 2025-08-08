import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
   const [signup,setSignup]=useState({name:"",email:"",password:"",cpassword:"",location:""})
   const [emailError, setEmailError] = useState("");
  const apiUrl=process.env.REACT_APP_API_URI

   let navigate = useNavigate();
   const  handleSubmit=async(e)=>{
         e.preventDefault();
         const response=await fetch(`${apiUrl}/api/auth/createuser`,{
             method:'POST',
             headers:{
               'Content-Type':'application/json',       
             },
             body:JSON.stringify({name:signup.name,email:signup.email,password:signup.password ,location:signup.location })
           })
           const json=await response.json()
           console.log(json)
           if(json.success && signup.password===signup.cpassword){
             //save the auth token and redirect to the next page
            //  localStorage.setItem('token',json.authtoken);
             navigate("/login");
             props.showAlert("Acount Created SuccessFully","success","Successfully")
           }
           else{
             props.showAlert("Invalid credentials","danger","Error")
           }
     }
     const onChange=(e)=>{
         setSignup({...signup,[e.target.name]:e.target.value}) 
           if (e.target.name === "email") {
    if (!e.target.value.endsWith("@gmail.com")) {
      setEmailError("Email must end with @gmail.com");
     
    } else {
      setEmailError("");
    }
  }
     }

  return (
    <div className="container"> 
    <h2 className="my-3">SignUp to Create your MyChemnitz Account! </h2>
     <form onSubmit={handleSubmit}>
     <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" value={signup.name} name="name" onChange={onChange} id="name" maxLength={15} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="text" className={`form-control ${emailError ? "is-invalid" : ""}`} id="email" value={signup.email} name="email" onChange={onChange} aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    {emailError && <div className="invalid-feedback">{emailError}</div>}
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"value={signup.password} name="password" onChange={onChange} id="paasword" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="cpassword" className="form-control" value={signup.cpassword} name="cpassword"onChange={onChange} id="cpaasword" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="location" className="form-label">Current Location</label>
    <input type="text" className="form-control" value={signup.location} name="location" onChange={onChange} id="location" maxLength={15} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
