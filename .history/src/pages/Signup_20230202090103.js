import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const isOrgRef = useRef();
  const { signUp } = UserAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(!loading);
      const res = await signUp(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      await addDoc(collection(db, 'users'), {
        name: res.user.displayName,
        email: res.user.email,
        createdAt: Timestamp.now(),
        dp: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
        isOrg: isOrgRef.current.checked,
        jobs: [],
      });
      navigate('/');
      setLoading(!loading);
      toast.success('Success!');
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      toast.error('failed!');
    }
  };

  return (
    <section class=' dark:bg-gray-900'>
      <div class='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <p className='text-3xl text-gray-800 font-bold'>
          <span className='text-green-500'>JOB</span>TRUCK
        </p>
        <div class='w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div class='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 class='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Register your account
            </h1>
            <form class='space-y-4 md:space-y-6' action='#'>
              <div>
                <label
                  for='text'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your Username
                </label>
                <input
                  type='text'
                  ref={nameRef}
                  name='text'
                  id='text'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='username'
                  required=''
                />
              </div>
              <div>
                <label
                  for='email'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  ref={emailRef}
                  name='email'
                  id='email'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  required=''
                />
              </div>
              <div>
                <label
                  for='password'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  ref={passwordRef}
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required=''
                />
              </div>

              <div class='flex items-center justify-between'>
                <Link
                  to={{ pathname: '/forgotpassword' }}
                  class='font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-400'
                >
                  forgot password
                </Link>
              </div>
              <div class='flex items-center justify-center'>
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
                    Register
                  </button>
                )}
              </div>
              <p class='text-sm font-light text-gray-500 dark:text-gray-400 underline'>
                Already have an account?{' '}
                <Link
                  to={{ pathname: '/signin' }}
                  class='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
