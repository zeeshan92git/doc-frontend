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

    <div className='pb-16 pt-8 lg:pt-16 grid lg:grid-cols-12 gap-8 lg:gap-12'>

      {/* Avatar */}
      <div className='lg:col-span-4 reveal'>
        {
          isEdit ?
          <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-48 h-48 rounded-full object-cover border border-[var(--rule)] bg-[var(--sage-2)]' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-10 absolute bottom-4 right-4' src={image ? '' : 'https://res.cloudinary.com/dophfzeep/image/upload/v1744635339/image_r666sk.png'} alt="" />
            </div>
            <input onChange={(e)=>{setimage(e.target.files[0])}} type="file" id="image" hidden />
          </label>
          :
          <img className='w-48 h-48 rounded-full object-cover border border-[var(--rule)] bg-[var(--sage-2)]' src={userData.image} alt="profile_img" />
        }
      </div>

      <div className='lg:col-span-8 flex flex-col gap-8 max-w-2xl reveal' style={{ '--i': 1 }}>
        {
          isEdit ?
            <input className='input input-title' type="text" placeholder='edit your name...' onChange={e => setuserData(prev => ({ ...prev, name: e.target.value }))} />
            : <h1 className='t-h1'>{userData.name}</h1>
        }

        <div>
          <p className='label mb-4'>Contact information</p>

          <dl className='dl'>
            <dt>Email id</dt>
            <dd className='text-[var(--moss)] break-all'>{userData.email}</dd>
            <dt>Phone</dt>
            {
              isEdit ? <dd><input className='input input-soft max-w-56' type="text" placeholder='edit your phone no... ' onChange={e => setuserData(prev => ({ ...prev, phone: e.target.value }))} /></dd>
                : <dd className='data'>{userData.phone}</dd>
            }
            <dt>Address</dt>
            {isEdit ? (
              <dd className='flex flex-col gap-2'>
                <input
                  className='input input-soft max-w-56'
                  type="text"
                  placeholder='Line 1'
                  value={userData.address?.line1 || ''}
                  onChange={e => setuserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))}
                />
                <input
                  className='input input-soft max-w-56'
                  type="text"
                  placeholder='Line 2'
                  value={userData.address?.line2 || ''}
                  onChange={e => setuserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))}
                />
              </dd>
            ) : (
              <dd className='muted'>
                {userData.address?.line1}, {userData.address?.line2}
              </dd>
            )}
          </dl>
        </div>

        <div>
          <p className='label mb-4'>Basic information</p>
          <dl className='dl'>
            <dt>Gender</dt>
            {
              isEdit ?
                <dd><select className='select input-soft max-w-32' onChange={(e) => setuserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select></dd>
                : <dd className='muted'>{userData.gender}</dd>
            }

            <dt>DOB</dt>
            {
              isEdit ?
                <dd><input className='input input-soft max-w-40' type="date" onChange={(e) => setuserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} /></dd>
                : <dd className='data'>{userData.dob}</dd>
            }
          </dl>
        </div>

        <div>
          {
            isEdit ?
              <button className='btn btn-solid' onClick={updateUserProfile}>Save information</button>
              :
              <button className='btn' onClick={() => setisEdit(true)}>Edit</button>
          }
        </div>
      </div>
    </div>

  )
}

export default Myprofile
