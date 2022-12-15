import React, { useState } from 'react';
import { Navigator, useNavigate, useLocation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FcBusinessman } from 'react-icons/fc';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import Navbar2 from './Navbar2';

const Navbar = () => {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const [nav, setNav] = useState(false);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<div>
			<div className='flex w-full justify-between  p-2 md:p-2 items-center z-10 text-black dark:bg-white shadow-lg'>
				<p className='text-lg md:text-3xl font-bold'>
					<span className='text-green-500'>JOB</span>
					<span className='text-gray-600'>TRUCK</span>
				</p>
				{user?.email ? (
					<>
						{' '}
						<ul className='hidden md:flex text-blue-900'>
							<li onClick={(e) => navigate('/')}>Home</li>
							<li onClick={(e) => navigate('/jobs')}>Jobs</li>
							<li onClick={(e) => navigate('/dashboard')}>account</li>
							<li onClick={logOut}>signOut</li>
						</ul>
						<div onClick={handleNav} className='md:hidden z-10'>
							{nav ? (
								<AiOutlineClose size={20} />
							) : (
								<HiOutlineMenuAlt4 size={20} />
							)}
						</div>
						<div
							onClick={handleNav}
							className={
								nav
									? 'absolute left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col z-40'
									: 'absolute left-[-100%]'
							}>
							<ul>
								<h1 className='text-2xl font-bold text-black'>
									<span className='text-green-500'>JOB</span>
									<span className='text-blue-900'>TRUCK</span>
								</h1>
								<li
									className='border-b text-blue-900'
									onClick={(e) => navigate('/')}>
									Home
								</li>
								<li
									className='border-b text-blue-900'
									onClick={(e) => navigate('/jobs')}>
									Jobs
								</li>
								<li
									className='text-blue-900'
									onClick={(e) => navigate('/dashboard')}>
									account
								</li>
								<li className='text-blue-900' onClick={logOut}>
									signOut
								</li>
							</ul>
						</div>
					</>
				) : (
					<>
						<ul>
							<li>
								<button
									onClick={(e) => navigate('/signup')}
									class='bg-green-500 hover:bg-blue-700 text-white md:text-lg text-sm py-1 px-3 rounded'>
									Register
								</button>
							</li>
						</ul>
					</>
				)}

				{/* {user?.email ? (
        <div className="flex items-center">
          <button className="cursor-pointer pr-4">
            <Avatar
              name={user?.displayName ? `${user?.displayName}` : "user"}
              round={true}
              size={40}
              onClick={(e) => navigate("/dashboard")}
            />
          </button>
          <button
            className="bg-green-500 text-white cursor-pointer px-5 py-2 rounded"
            onClick={logOut}
          >
            signOut
          </button>
        </div>
      ) : (
        <div>
          <button
            className="text-white pr-4 cursor-pointer"
            onClick={(e) => navigate("/signin")}
          >
            signin
          </button>
          <button
            className="bg-green-500 text-white cursor-pointer px-5 py-2 rounded"
            onClick={(e) => navigate("/signup")}
          >
            signup
          </button>
        </div>
      )} */}
			</div>
			<div>{location.pathname.includes('jobs') && <Navbar2 />}</div>
		</div>
	);
};

export default Navbar;
