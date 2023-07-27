import React, { useState, useEffect } from 'react';
import { UserService } from '../services/UserService';


let LiveUserSearch = () => {
   
    const [state, setState] = useState({
    searchKey: '',    
    loading: false,
    users: [],
    fUsers:[],
    errorMessage: null,
  });

useEffect(() => {
   const fetchData = async () => {
    try {
      setState({...state,loading:true})
        let response = await UserService.getAllUsers();
      let { results } = response.data;
      setState({
        ...state,
        users: results,
        fUsers:results,
        loading: false
      })
      
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error
      })
      console.error("Error fetching users:", error);
      // Handle the error (e.g., display an error message)
       }
   };

  fetchData();
}, []);

    let searchUser = (event) => {
       
        let filteredUsers = state.fUsers.filter(user => {
            return user.name.first.toLowerCase().includes(event.target.value.toLowerCase())
        })
         setState({
            ...state,
             searchKey: event.target.value,
            users: filteredUsers
        })
    }



    return (
        <React.Fragment>
            {/* <pre>{ JSON.stringify(state.users)}</pre> */}
            {/* <pre>{state.searchKey }</pre> */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-white p-3">
                                <p className="h4">Live User Search</p>
                                <form>
                                    <input
                                        value={state.searchKey}
                                        onChange={searchUser}
                                        type="text" className="form-control" placeholder='Search..' />
                                </form>

                            </div>
                            <div className="card-body bg-light">
                                <ul className="list-group">
                                    {state.users.length > 0 && state.users.map(user => {
                                        return (
                                            <li key={user.login.uuid} className="list-group-item list-group-item-primary">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                    <img src={user.picture.thumbnail} alt='' className='img-fluid rounded-circle' />
                                                    </div>
                                                <div className="col-sm-8">
                                                    <p className="h5">{user.name.title}. {user.name.first} {user.name.last}</p>
                                                        <small>{user.location.city}, {user.location.country} </small>

                                                </div>
                                                </div>
                                             </li>)
                                         }) }
                                    
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>            
        
    );
}

export default LiveUserSearch;