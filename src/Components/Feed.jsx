import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { FeedUserCard } from './userCardVariant'

const Feed = () => {
  const feed = useSelector(store=>store.feed);
  const dispatch = useDispatch();

  const getFeed = async()=>{
    try{
      const res = await axios.get(BASE_URL+"/user/feed",{
        withCredentials:true,
      })
      dispatch(addFeed(res?.data?.data));
    }catch(err){
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.error(errorMsg);
    }
  }

  useEffect(()=>{
    getFeed()
  },[])

  return (feed &&
    <div className='text-center bg-base-100 min-h-screen"'>
      <FeedUserCard user={feed[0]} />
    </div>
  )
}

export default Feed