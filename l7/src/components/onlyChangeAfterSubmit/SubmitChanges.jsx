import { useEffect, useState } from 'react';
import './SubmitChanges.css';
import axios from 'axios';

function ChangePText(){
    const[users,setUsers]=useState([]);
    const[savedUsers,setsavedUsers]=useState({})
     

     useEffect(()=>{
        axios.get('http://10.10.88.251:2040/Sale/All')
        .then(res=> setUsers(res.data))
        .catch(res=>console.log('It doesnt have error.'))
     })
     const savedNotesFunction =(id,newNote) =>{
     setsavedUsers(prevSavedUsers=>({...prevSavedUsers, [id]:newNote}))
       
     }
     const submitChangesNote = (id) =>{
        const note = savedUsers[id] || '';
        axios.put(`http://10.10.88.251:2040/Sale/All/${id}`,{note})
        .then(response => {
            console.log(response.data);
            // Dəyişiklikləri əsas state-ə tətbiq et
            setUsers(users.map(user =>
                user.id === id ? { ...user, note } : user
            ));
        })
        .catch(err => console.log('ERROR OCCURS:', err));
     }
return(

    <div className='MainContainer-user-Changes'>

        {users.map(user=>(
                <div key={user.id}>


                    <h3>{user.updatedUserId}</h3>
                    <p>{user.note}</p>
                    <input 
                    type="text" 
                    name="" 
                    id="" 
                    value= {savedUsers[user.id]!==undefined?savedUsers[user.id]:user.note|| ''}
                    onChange={(e)=>savedNotesFunction(user.id, e.target.value )}
                    />
                    <button onClick={()=>submitChangesNote(user.id)}>Save Changes</button>
                </div>
        ))}

    </div>
)
}
export default ChangePText

