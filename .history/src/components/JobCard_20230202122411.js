import React, { useState, useRef } from 'react';
import JobViewModal from './JobViewModal';
import {
  HiOutlineCurrencyRupee,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import { UserJob } from '../context/JobContext';
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

export const JobCard = ({ data, showdelete }) => {
  const { deleteJob, editJob } = UserJob();
  const [showEditModal, setShowEditModel] = useState(false);
  const [jobTitle, setJobTitle] = useState(data.title);
  const [jobPhoneNo, setJobPhoneNo] = useState(data.phone);
  const [jobType, setJobType] = useState(data.type);
  const [jobLocation, setJobLocation] = useState(data.address);
  const [startTime, setStartTime] = useState(data.startTime);
  const [endTime, setEndTime] = useState(data.endTime);
  const [salary, setSalary] = useState(data.salary);
  const [skills, setSkills] = useState(data.skills);
  const [description, setDescription] = useState(data.description);
  const [idata, setIData] = useState({
    name: '',
    image: '',
  });

  const handleChange = (name) => (e) => {
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    setIData({ ...data, [name]: value });
  };

  const handleUpdate = () => {
    editJob(
      data.id,
      jobTitle,
      jobType,
      jobLocation,
      startTime,
      endTime,
      salary,
      skills,
      jobPhoneNo,
      description,
      idata
    );
  };

  return (
    <div>
      {/* <div className="flex items-center mt-10 shadow-lg bg-white m-4 md:ml-[15%] md:mr-[15%] p-4">
        <div>
          <Avatar name={`${data.name}`} round={true} size={70} />
        </div>
        <div className="ml-10">
          <h3 className="font-bold text-xl text-green-700">{data.name}</h3>
          <h2 className="font-bold text-lg">{data.title}</h2>
          <p className="text-gray-700">
            2d ago . {data.type} . {data.address}
          </p>
        </div>
        <div className="md:flex items-center justify-end ml-auto text-teal-700">
          <p className="font-bold m-3 bg-teal-100 rounded-xl p-1">
            {data.skills}
          </p>
        </div>
        <div>
          <JobViewModal data={data} />
        </div>
      </div> */}
      {showEditModal && (
        <div class='modal fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto z-40 bg-black bg-opacity-75'>
          {console.log(idata)}
          <div class='modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none'>
            <div class='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
              <div class='modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
                <h5
                  class='text-xl font-medium leading-normal text-gray-800'
                  id='exampleModalScrollableLabel'
                >
                  Edit
                </h5>
                <button
                  type='button'
                  class='btn-close box-content w-4 h-4 p-1 text-black  rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={(e) => setShowEditModel(!showEditModal)}
                ></button>
              </div>
              <div class='modal-body relative p-4'>
                <form>
                  <div class='relative z-0 mb-6 w-full group'>
                    <input
                      type='text'
                      onChange={(e) => setJobTitle(e.target.value)}
                      class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required=''
                      value={jobTitle}
                    />
                    <label class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                      Job post
                    </label>
                  </div>
                  <div class='grid md:grid-cols-2 md:gap-6'>
                    <div class='relative z-0 mb-6 w-full group'>
                      <div className='flex'>
                        <input
                          type='text'
                          onChange={(e) => setStartTime(e.target.value)}
                          class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                          placeholder=' '
                          required=''
                          value={startTime}
                        />
                        <select
                          id='countries'
                          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                          <option selected>AM</option>
                          <option value='US'>PM</option>
                        </select>
                      </div>
                      <label
                        for='floating_first_name'
                        class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      >
                        Job start time
                      </label>
                    </div>
                    <div class='relative z-0 mb-6 w-full group'>
                      <div className='flex'>
                        <input
                          type='text'
                          onChange={(e) => setEndTime(e.target.value)}
                          class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                          placeholder=' '
                          required=''
                          value={endTime}
                        />
                        <select
                          id='countries'
                          class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                          <option selected>PM</option>
                          <option value='US'>AM</option>
                        </select>
                      </div>
                      <label
                        for='floating_last_name'
                        class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      >
                        Job end time
                      </label>
                    </div>
                  </div>
                  <div class='relative z-0 mb-6 w-full group'>
                    <input
                      type='text'
                      onChange={(e) => setSalary(e.target.value)}
                      class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required=''
                      value={salary}
                    />
                    <label
                      for='floating_last_name'
                      class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      salary
                    </label>
                  </div>
                  <div class='relative z-0 mb-6 w-full group'>
                    <input
                      type='text'
                      onChange={(e) => setJobType(e.target.value)}
                      name='floating_password'
                      id='floating_password'
                      class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required=''
                      value={jobType}
                    />
                    <label
                      for='floating_password'
                      class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Job type
                    </label>
                  </div>
                  <div class='relative z-0 mb-6 w-full group'>
                    <input
                      type='text'
                      onChange={(e) => setJobLocation(e.target.value)}
                      name='repeat_password'
                      id='floating_repeat_password'
                      class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required=''
                      value={jobLocation}
                    />
                    <label
                      for='floating_repeat_password'
                      class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Address
                    </label>
                  </div>
                  <div class='grid md:grid-cols-2 md:gap-6'>
                    <div class='relative z-0 mb-6 w-full group'>
                      <input
                        type='tel'
                        onChange={(e) => setJobPhoneNo(e.target.value)}
                        pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                        name='floating_phone'
                        id='floating_phone'
                        class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        required=''
                        value={jobPhoneNo}
                      />
                      <label
                        for='floating_phone'
                        class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      >
                        Phone number (123-456-7890)
                      </label>
                    </div>

                    <div class='relative z-0 mb-6 w-full group'>
                      <input
                        type='text'
                        onChange={(e) => setSkills(e.target.value)}
                        class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        required=''
                        value={skills}
                      />
                      <label
                        for='floating_company'
                        class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                      >
                        Skills
                      </label>
                    </div>
                  </div>
                  <div class='relative z-0 mb-6 w-full group'>
                    <input
                      type='text'
                      onChange={(e) => setDescription(e.target.value)}
                      name='repeat_password'
                      id='floating_repeat_password'
                      class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required=''
                      value={description}
                    />
                    <label
                      for='floating_repeat_password'
                      class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Job Description
                    </label>
                  </div>
                  <div>
                    <label
                      class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      for='file_input'
                    >
                      Upload file
                    </label>
                    <input
                      class='block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                      aria-describedby='file_input_help'
                      id='file_input'
                      type='file'
                      onChange={handleChange('image')}
                    />
                    <p
                      class='mt-1 text-sm text-gray-500 dark:text-gray-300'
                      id='file_input_help'
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                </form>
              </div>
              <div class='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md'>
                <button
                  type='button'
                  class='inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out'
                  data-bs-dismiss='modal'
                  onClick={(e) => setShowEditModel(!showEditModal)}
                >
                  Close
                </button>
                <button
                  type='button'
                  onClick={(e) => handleUpdate()}
                  class='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1'
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='w-[160px] {"h-[260px]"} md:h-auto  md:w-[350px] rounded overflow-hidden shadow-lg'>
        <img
          class='w-full h-[120px] md:h-[180px] object-cover'
          src={data.imageUrl}
          alt='Mountain'
        />
        <div class='px-2 md:px-6 py-4'>
          <div class='font-bold text-lg  md:text-xl mb-1'>
            {data && <JobViewModal data={data} />}
          </div>
          <div className='text-sm md:text-lg text-gray-600'>{data.name}</div>
          <hr class='border-green-300 w-[100%] mt-2 mb-2'></hr>
          <div className='flex items-center'>
            <div>
              <HiOutlineCurrencyRupee className='text-green-400 text-xl' />
            </div>
            <div className='text-sm md:text-lg'>{data.salary}</div>
          </div>

          <div className='flex  md:items-center'>
            <div>
              <HiOutlineLocationMarker size={20} />
            </div>
            <div className='text-sm md:text-lg mb-1 text-ellipsis overflow-hidden ...'>
              {data.address}
            </div>
          </div>
          <div className='flex'>
            <div>
              {showdelete && (
                <button
                  class='bg-none hover:bg-red-200 font-bold py-1 px-2 rounded-full'
                  onClick={(e) => deleteJob(data.id)}
                >
                  <MdDeleteOutline size={25} color={'red'} />
                </button>
              )}
            </div>
            <div className='ml-2'>
              {showdelete && (
                <button
                  class='bg-none hover:bg-green-700 font-bold py-1 px-2 rounded-full'
                  onClick={(e) => setShowEditModel(!showEditModal)}
                >
                  <FiEdit size={22} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
