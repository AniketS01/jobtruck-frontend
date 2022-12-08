import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { JobCard } from '../components/JobCard';
import { UserAuth } from '../context/AuthContext';
import Navbar2 from '../components/Navbar2';

const Jobs = () => {
	const [jobs, setJobs] = useState([]);

	const { user } = UserAuth();

	useEffect(() => {
		const getJobs = async () => {
			const data = await getDocs(collection(db, 'jobs'));

			setJobs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getJobs();
	}, [user?.email]);

	return (
		<>
			<div className='mt-5'>
				<div class='p-3 md:p-7 grid grid-cols-2 md:grid-cols-5 gap-7'>
					{jobs.map((data) => (
						<JobCard data={data} />
					))}
				</div>
			</div>
		</>
	);
};

export default Jobs;
