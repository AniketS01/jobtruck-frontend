import React, { useRef } from 'react';
import Heroimg from '../images/hero.jpg';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
	const searchRef = useRef();
	const navigate = useNavigate();

	return (
		<div className='w-full h-screen relative'>
			<img className='w-full h-full object-cover' src={Heroimg}></img>
			<div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
			<div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4'>
				<h1 className='font-bold text-2xl md:text-3xl py-4'>
					Welcome to jobtruck!
				</h1>
				<form className='flex justify-center items-center max-w-[700px] mx-auto w-full p-1 rounded-md h-[40px]'>
					<button
						onClick={(e) => navigate('/jobs')}
						class='bg-green-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded mr-11'>
						Search job
					</button>
					<button
						onClick={(e) => navigate('/dashboard')}
						class='bg-green-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded'>
						post a Job
					</button>
				</form>
			</div>
		</div>
	);
};

export default Hero;
