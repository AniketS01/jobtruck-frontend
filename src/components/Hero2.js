import React from 'react';
import heroimg from '../images/hero.png';
import { useNavigate } from 'react-router-dom';

const Hero2 = () => {
	const navigate = useNavigate();

	return (
		<section class='text-gray-600 body-font'>
			<div class='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
				<div class='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
					<h1 class='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
						Welcome to <br class='hidden lg:inline-block' />
						JOBTRUCK
					</h1>
					<p class='mb-8 leading-relaxed'>
						jobtruck is a free platform to find nearby jobs in retail stores,
						restaurents, cafes, healthcare etc.
					</p>
					<div class='flex justify-center'>
						<button
							class='inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg'
							onClick={(e) => navigate('/jobs')}>
							Search job
						</button>
						<button
							class='ml-4 inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg'
							onClick={(e) => navigate('/dashboard')}>
							Post Job
						</button>
					</div>
				</div>
				<div class='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
					<img
						class='object-cover object-center rounded'
						alt='hero'
						src={heroimg}
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero2;
