import './UserNoteChnages.css'
import axios from 'axios';
import React,{ useEffect, useState } from 'react';
function ShowInfoUsers() {


    const[users,setUsers]=useState([]);
    useEffect(()=>{
        axios.get('http://10.10.88.251:2040/Sale/All')
        .then(res=> setUsers(res.data) ) //response-un datasi onsuzda array formasindadir.
    }, []);
    

    const handleChangeNote = (id, newTitle) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, note: newNote } : user
        ));
    };
    const handleSaveNote = (id, title) =>{
    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,{title})
    .then(response=>console.log(response.data))
    .catch(res=>console.log('ERROR ACCURS'));

    }
    return(

        <div className='mainContainer'>
            {
                users.map(user =>(

                    <div key={user.id}>
                        <h3>{user.userId}</h3>
                        <p>{user.title}</p>
                        <input 
                        type="text" 
                        name="" 
                        value={user.title|| ""}
                        id="" 
                        onChange={(e)=> handleChangeNote(user.id, e.target.value )} />
                        <button onClick={()=>handleSaveNote(user.id,user.title)}>Save Note</button>
                        </div>
                
                ))
            }

        </div>
    )

}
export default ShowInfoUsers;