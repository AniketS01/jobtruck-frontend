import React, { useState } from 'react';
import { GoLocation } from 'react-icons/go';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en-IN';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const JobViewModal = ({ data, show, setShow }) => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  TimeAgo.addLocale(en);
  const timeago = new TimeAgo('en-IN');

  return (
    <div>
      <button
        type='button'
        class='bg-none text-xl rounded text-green-600'
        data-bs-toggle='modal'
        data-bs-target='#exampleModalScrollable'
      >
        {data.title}
      </button>
      {show && (
        <div
          id='defaultModal'
          tabindex='-1'
          aria-hidden='true'
          class='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full bg-black bg-opacity-75'
        >
          <div class='relative p-4 w-full md:w-[60%] left-0 md:left-[16%] top-0 md:top-[20%] h-full md:h-auto'>
            <div class=' top-30 relative bg-white rounded-lg shadow dark:bg-gray-700'>
              <div class='flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600'>
                <div className='flex flex-col'>
                  <h3 class='text-xl font-semibold text-gray-900 dark:text-white'>
                    {data.title}
                  </h3>
                  <p class='text-base leading-relaxed text-gray-500 dark:text-gray-400 mt-2'>
                    {data.name}
                  </p>
                </div>
                <button
                  type='button'
                  onClick={(e) => setShow(false)}
                  class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-toggle='defaultModal'
                >
                  <svg
                    aria-hidden='true'
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span class='sr-only'>Close modal</span>
                </button>
              </div>

              <div class='p-6 space-y-6'>
                <p class='flex text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                  <GoLocation fontSize={20} />
                  {data.address}
                </p>
                <div className='flex flex-row'>
                  <div className='flex flex-col'>
                    <p className='text-base text-gray-500'>Job type</p>
                    <p className='text-base mt-1'>{data.type}</p>
                  </div>
                  <div className='flex flex-col ml-9'>
                    <p className='flex flex-row items-center text-base text-gray-500'>
                      <HiOutlineCurrencyRupee size={20} />
                      Salary
                    </p>
                    <p className='text-base mt-1'>{data.salary} /-</p>
                  </div>
                  <div className='flex flex-col ml-9'>
                    <p className='flex flex-row items-center text-base text-gray-500'>
                      Skills required
                    </p>
                    <p className='text-base mt-1'>{data.skills}</p>
                  </div>
                </div>
                <div>
                  <p class='flex text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                    Posted on
                  </p>
                  <p className='text-base'>
                    {toString(data.postedOn)}
                    {console.log(
                      timeago.format(data.postedOn.seconds - 60 * 1000)
                    )}
                  </p>
                </div>
                <div>
                  <p class='text-base'>About Job</p>
                  <p class='flex text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                    {data.description}
                  </p>
                </div>
              </div>

              {/* <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Apply
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobViewModal;
