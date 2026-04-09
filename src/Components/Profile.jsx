import React from 'react'
import { ProfileUserCard } from './userCardVariant'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile';

const Profile = () => {
  const loggedInUser = useSelector(store=>store.user);

  return (loggedInUser&& 
    <div className='text-center flex flex-col'>
      {/* <ProfileUserCard user={loggedInUser} /> */}
      <EditProfile loggedInUser={loggedInUser}/>
    </div>
  )
}

export default Profile