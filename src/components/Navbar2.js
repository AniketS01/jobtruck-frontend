import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar2 = () => {
	const searchRef = useRef();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/jobs/${searchRef.current.value}`);
		window.location.reload();
	};

	return (
		<nav className='sticky top-0'>
			<form onSubmit={handleSubmit}>
				<div class='flex m-3 p-3'>
					<label
						for='search-dropdown'
						class='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
						Your Email
					</label>
					<button
						class='flex-shrink-0 z-10 inline-flex items-center py-2 px-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600'
						type='button'>
						All categories
						<svg
							aria-hidden='true'
							class='w-4 h-4 ml-1'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fill-rule='evenodd'
								d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
								clip-rule='evenodd'></path>
						</svg>
					</button>

					<div class='relative w-full'>
						<input
							type='search'
							ref={searchRef}
							id='search-dropdown'
							class='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
							placeholder='Search Mockups, Logos, Design Templates...'
							required
						/>
						<button
							type='submit'
							class='absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-green-700 rounded-r-lg border hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							<svg
								aria-hidden='true'
								class='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
							</svg>
							<span class='sr-only'>Search</span>
						</button>
					</div>
				</div>
			</form>
		</nav>
	);
};

export default Navbar2;
