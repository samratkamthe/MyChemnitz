import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
   const [credentials,setCredentials]=useState({email:"",password:""})
   let navigate = useNavigate();


  const  handleSubmit=async(e)=>{
        e.preventDefault();
        
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              
             
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          })
          const json=await response.json();
    //        const getUsername = () => {
    //   return json.name; 
    // };
          
          // console.log(json)
          if(json.success){
            //save the auth token and redirect to the next page
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Login","success","Successfully")
            navigate("/");
            
            

          }
          else{
            props.showAlert("Invalid credentials","danger","Error")
            // alert("Invalid Credentials")
          }

    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
      
    }
   
  return (
    <div>
       <h2>Login to access your Notes!</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export  default Login