import React, { useRef } from 'react';
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await signUp(
				nameRef.current.value,
				emailRef.current.value,
				passwordRef.current.value
			);
			await addDoc(collection(db, 'users'), {
				name: res.user.displayName,
				email: res.user.email,
				createdAt: Timestamp.now(),
				isOrg: isOrgRef.current.checked,
				jobs: [],
			});
			navigate('/');
			toast.success('Success!');
		} catch (err) {
			console.log(err.message);
			toast.error('failed!');
		}
	};

	return (
		<section class='bg-gray-50 dark:bg-gray-900'>
			<div class='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-gray-800'>
				<p className='text-3xl text-white font-bold'>
					<span className='text-green-500'>JOB</span>TRUCK
				</p>
				<div class='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div class='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 class='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Register your account
						</h1>
						<form class='space-y-4 md:space-y-6' action='#'>
							<div>
								<label
									for='text'
									class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
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
									class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
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
									class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
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
								<div class='flex items-start'>
									<div class='flex items-center h-5'>
										<input
											id='remember'
											ref={isOrgRef}
											aria-describedby='remember'
											type='checkbox'
											class='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
											required=''
										/>
									</div>
									<div class='ml-3 text-sm'>
										<label
											for='remember'
											class='text-gray-500 dark:text-gray-300'>
											Are you a employer?
										</label>
									</div>
								</div>
							</div>
							<button
								type='submit'
								onClick={handleSubmit}
								class='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-gray-800'>
								Sign in
							</button>
							<p class='text-sm font-light text-gray-500 dark:text-gray-400'>
								Already have an account?{' '}
								<Link
									to={{ pathname: '/signin' }}
									class='font-medium text-primary-600 hover:underline dark:text-primary-500'>
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
