import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import JobPostModal from '../components/JobPostModal';
import EditProfileModel from '../components/EditProfileModel';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { JobCard } from '../components/JobCard';
import { UserJob } from '../context/JobContext';

const Dashboard = () => {
  const { user } = UserAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [postedJobs, setPostedjobs] = useState();

  const q = query(
    collection(db, 'users'),
    where('email', '==', `${user.email}`)
  );

  const j = query(
    collection(db, 'jobs'),
    where('email', '==', `${user.email}`)
  );

  useEffect(() => {
    const use = {};
    onSnapshot(q, (snap) => {
      snap.docs.forEach((doc) => {
        setCurrentUser({
          email: doc.data().email,
          name: doc.data().name,
          id: doc.id,
          isOrg: doc.data().isOrg,
          phoneNo: doc.data().phoneNo,
          jobs: doc.data().jobs,
        });
      });
    });
  }, [user?.email]);

  useEffect(() => {
    const postjobs = async () => {
      const data = await getDocs(j);
      setPostedjobs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    postjobs();
  }, [user?.email]);

  return (
    <div>
      <br />
      {currentUser && currentUser.email ? (
        // <div>
        //   <h1 className="text-center">{currentUser.email}</h1>
        //   {currentUser.isOrg ? (
        //     <div>
        //       {console.log(currentUser.id)}
        //       <JobPostModal currentUser={currentUser} />
        //     </div>
        //   ) : (
        //     <div>hello</div>
        //   )}
        // </div>

        <section class='pt-16 bg-blueGray-50'>
          <div class='w-full lg:w-4/12 px-4 mx-auto'>
            <div class='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16'>
              <div class='px-6'>
                <div class='flex flex-wrap justify-center'>
                  <div class='w-full px-2 flex justify-center'>
                    <div class='relative'>
                      <Avatar
                        name={currentUser?.name}
                        round={true}
                        size={100}
                      />
                    </div>
                  </div>
                </div>
                <div class='text-center mt-12'>
                  <h3 class='text-xl font-semibold leading-normal mb-2 text-blueGray-700'>
                    {currentUser?.name}
                  </h3>
                  <div class='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold'>
                    <i class='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400'></i>
                    Email: {currentUser?.email}
                  </div>

                  <div class='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold'>
                    <i class='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400'></i>
                    phoneNo: {currentUser?.phoneNo}
                  </div>
                </div>
                <div>
                  <EditProfileModel.js />
                </div>
                <div>
                  <JobPostModal currentUser={currentUser} />
                </div>
                <br />
                <br />
              </div>
            </div>
          </div>
          <div className='p-7 font-bold text-lg md:text-1xl'>Jobs posted</div>
          <div>
            {postedJobs ? (
              <div class='p-3 md:p-7 grid grid-cols-2 md:grid-cols-5 gap-7'>
                {postedJobs.map((data) => (
                  <JobCard data={data} showdelete={true} />
                ))}
              </div>
            ) : (
              <div>no jobs posted yet</div>
            )}
          </div>
        </section>
      ) : (
        <div role='status' className='text-center'>
          <svg
            aria-hidden='true'
            className='text-center mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span class='sr-only'>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

//name
//address
//title
//time
//salary
//skills required
