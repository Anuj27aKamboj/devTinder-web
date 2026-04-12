import React from 'react'
import { ProfileUserCard } from './userCardVariant'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile';
import UserCardSkeleton from './UserCardSkeleton';

const Profile = () => {
  const loggedInUser = useSelector(store=>store.user);

  if (!loggedInUser) {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 min-h-screen">
      <UserCardSkeleton />

      <div className="w-full max-w-lg flex flex-col gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="skeleton h-10 w-full"></div>
        ))}
      </div>
    </div>
  );
}

  return (loggedInUser&& 
    <div className='text-center flex flex-col'>
      {/* <ProfileUserCard user={loggedInUser} /> */}
      <EditProfile loggedInUser={loggedInUser}/>
    </div>
  )
}

export default Profile