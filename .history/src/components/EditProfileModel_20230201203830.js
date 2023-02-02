import axios from 'axios';
import { doc } from 'firebase/firestore';
import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { UserJob } from '../context/JobContext';
import { db } from '../firebase';
import _ from 'lodash';
import FormData from 'form-data';
import { FcUpload } from 'react-icons/fc';
import { UserProfile } from '../context/ProfileContext';

const EditProfileModel = ({ currentUser }) => {
  const [jobForm, setJobform] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameP, setNameP] = useState(currentUser.name);
  const [phoneNo, setPhoneNo] = useState(currentUser.phoneNo);
  const { editProfile } = UserProfile();

  const [data, setData] = useState({
    name: '',
    image: '',
  });

  const handleChange = (name) => (e) => {
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(!loading);
      await editProfile(currentUser.id, nameP, phoneNo, data);
      // await updateDoc(userId, {
      //   jobs: arrayUnion({
      //     name: currentUser.name,
      //     title: jobTitleRef.current.value,
      //     type: jobTypeRef.current.value,
      //     location: jobLocationRef.current.value,
      //     timing: jobTimingRef.current.value,
      //     salary: jobSalaryRef.current.value,
      //     skill: jobSkillsRef.current.value,
      //     phoneNo: descriptionRef.current.value,
      //     description: descriptionRef.current.value,
      //     createAt: Timestamp.now(),
      //   }),
      // });

      setLoading(false);
      setJobform(false);
    } catch (error) {
      setLoading(false);
      toast.error('failed');
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className='flex justify-center'>
        <button
          type='button'
          class='inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          data-bs-toggle='modal'
          data-bs-target='#exampleModalScrollable'
          onClick={(e) => setJobform(true)}
        >
          Edit Profile
        </button>
      </div>
      {jobForm && (
        <div class='modal fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto z-40 bg-black bg-opacity-75'>
          <div class='modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none'>
            <div class='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
              <div class='modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
                <h5
                  class='text-xl font-medium leading-normal text-gray-800'
                  id='exampleModalScrollableLabel'
                >
                  Edit Profile
                </h5>
                <button
                  type='button'
                  class='btn-close box-content w-4 h-4 p-1 text-black  rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={(e) => setJobform(!jobForm)}
                ></button>
              </div>
              <div class='modal-body relative p-4'>
                <form onSubmit={handleSubmit}>
                  <div class='relative z-0 mb-6 w-full group flex justify-center'>
                    <img
                      className='rounded-full'
                      width={130}
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThwItIeKDyzzjk9XyEuF6oXf1Z8F-HAH6XSJUy6hM6wQ&s'
                    />
                    <div className='absolute bottom-0 bg-gray-300 bg-opacity-75 hover:bg-green-300'>
                      <label>
                        <FcUpload size={50} />
                        <input
                          type='file'
                          className='hidden'
                          onChange={handleChange('image')}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label></label>
                  </div>
                  <div class='relative z-0 mb-6 w-full group'>
                    <input
                      type='text'
                      class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      value={nameP}
                      onChange={(e) => setNameP(e.target.value)}
                    />
                    <label
                      for='floating_last_name'
                      class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Name
                    </label>
                  </div>
                  <div class='relative z-0 mb-6 w-full group'>
                    <input
                      type='text'
                      name='floating_password'
                      id='floating_password'
                      class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      value={currentUser.email}
                      disabled
                    />
                    <label
                      for='floating_password'
                      class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      email
                    </label>
                  </div>
                  <div class='relative z-0 mb-6 w-full group'>
                    <input
                      type='text'
                      onChange={(e) => setPhoneNo(e.target.value)}
                      name='repeat_password'
                      id='floating_repeat_password'
                      class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      value={currentUser.phoneNo}
                    />
                    <label
                      for='floating_repeat_password'
                      class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Phone no.
                    </label>
                  </div>
                </form>
              </div>
              <div class='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md'>
                <div class='flex items-center justify-center w-full'>
                  {loading ? (
                    <button
                      type='button'
                      class='w-full flex justify-center items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-green-500 rounded-md shadow cursor-not-allowed hover:bg-green-400'
                      disabled=''
                    >
                      <svg
                        class='w-5 h-5 mr-3 -ml-1 text-white animate-spin'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          class='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          stroke-width='4'
                        ></circle>
                        <path
                          class='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Loading...
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={handleSubmit}
                      class='w-full flex justify-center items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-green-500 rounded-md shadow  hover:bg-green-400'
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModel;

//job post
//job time
//salary
//description
//city
//address
//contact
//upload

//post
//salry
//timing
