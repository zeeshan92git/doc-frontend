import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify'
function Myprofile() {

  const { userData, setuserData , getuserProfileData , backendURL , token } = useContext(AppContext);
  console.log("User Data on Profile page", userData);
  const [isEdit, setisEdit] = useState(false);
  const [image,setimage] = useState(false);

  const updateUserProfile = async  ()=>{
    try{

      const formData = new FormData();

      formData.append('name',userData.name);
      formData.append('phone',userData.phone);
      formData.append('address',JSON.stringify(userData.address));
      formData.append('gender',userData.gender);
      formData.append('dob',userData.dob);

      image && formData.append('image',image);

      const {data} = await  axios.post(backendURL + '/api/user/update-profile', formData , {headers : {token}});
      if(data.success){
        toast.success(data.message);
        await getuserProfileData();
        setisEdit(false);
        setimage(false);
      }
      else{
        toast.error(data.message);
      }
    }catch(error)
    {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (

    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        isEdit ? 
        <label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded  bg-opacity-90' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : 'https://res.cloudinary.com/dophfzeep/image/upload/v1744635339/image_r666sk.png'} alt="" />
          </div>
          <input onChange={(e)=>{setimage(e.target.files[0])}} type="file" id="image" hidden />
        </label>
        :
        <img className='w-36 rounded' src={userData.image} alt="profile_img" />
      }


      {
        isEdit ?
          <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 ' type="text" placeholder='edit your name...' onChange={e => setuserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl mt-4 text-neutral-800 '>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 mt-3 underline'>CONTACT INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 '>
          <p className='font-medium' >Email Id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium' >Phone: </p>
          {
            isEdit ? <input className='bg-blue-100 max-w-52' type="text" placeholder='edit your phone no... ' onChange={e => setuserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-500 '>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <div className='space-y-2'>
              <input
                className='bg-blue-100   max-w-52 block'
                type="text"
                placeholder='Line 1'
                value={userData.address?.line1 || ''}
                onChange={e => setuserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value }
                }))}
              />
              <input
                className='bg-blue-100 max-w-52 block'
                type="text"
                placeholder='Line 2'
                value={userData.address?.line2 || ''}
                onChange={e => setuserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value }
                }))}
              />
            </div>
          ) : (
            <p className='text-gray-400'>
              {userData.address?.line1}, {userData.address?.line2}
            </p>
          )}

        </div>
      </div>
      <p className='text-neutral-500 mt-3 underline' >BASIC INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Gender: </p>
        {
          isEdit ?
            <select className='max-w-20 bg-gray-100 ' onChange={(e) => setuserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className='text-gray-400'>{userData.gender}</p>
        }

        <p className='font-medium'>DOB: </p>
        {
          isEdit ?
            <input className='bg-gray-100 max-w-28' type="date" onChange={(e) => setuserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
            : <p className='text-gray-400'>{userData.dob}</p>
        }
      </div>
      <div>

      </div>

      <div className='mt-10  mb-4 '>
        {
          isEdit ?
            <button className='border border-green-50 bg-green-500 px-8 py-2 rounded-full  hover:bg-green-600 text-white transition-all ' onClick={updateUserProfile}>Save Information</button>
            :
            <button className='border px-8 py-2 rounded-full border-blue-50  bg-blue-500 hover:bg-blue-600 text-white transition-all' onClick={() => setisEdit(true)}>Edit</button>
        }
      </div>
    </div>

  )
}

export default Myprofile