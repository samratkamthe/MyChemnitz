import React from 'react'
import Notes from './Notes'




const Home = (props) => {
    
  return (
    <div>
      <Notes/>
    </div>
  )
}

export default Home











































































// import React,{useContext, useEffect} from 'react'
// import noteContext from '../context/notes/noteContext';


// const Home = (props) => {
//     const a= useContext(noteContext);
//     useEffect(()=>{
//         a.update();
//         // eslint-disable-next-line 
//     },[])
//   return (
//     <div>
//       This is Home of {a.state.name} and lives in {a.state.class}
//     </div>
//   )
// }

// export default Home
