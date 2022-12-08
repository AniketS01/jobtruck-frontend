import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { JobCard } from '../components/JobCard';
import { UserAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const FilteredJobs = () => {
	const [jobs, setJobs] = useState([]);
	const [FilteredJobs, setFilteredJobs] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = UserAuth();
	const { city } = useParams();

	const filterJobs = () => {
		setFilteredJobs(
			jobs.filter((job) => job.address.toLowerCase().includes(city))
		);
	};

	useEffect(() => {
		const getJobs = async () => {
			setLoading(true);
			const data = await getDocs(collection(db, 'jobs'));

			setJobs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			setLoading(false);
		};
		getJobs();
	}, [user?.email]);

	useEffect(() => {
		filterJobs();
	}, [jobs]);

	if (loading && FilteredJobs.length === 0) {
		return (
			<div class='flex justify-center items-center'>
				<div
					class='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
					role='status'>
					<span class='visually-hidden'>Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<div className='mt-5'>
			{console.log(FilteredJobs.length)}
			{FilteredJobs.length > 0 ? (
				<div class='p-3 md:p-7 grid grid-cols-2 md:grid-cols-5 gap-7'>
					{FilteredJobs.map((j) => (
						<JobCard data={j} />
					))}
				</div>
			) : (
				<div>
					<div class='p-3 md:p-7 grid grid-cols-2 md:grid-cols-5 gap-7'>
						No jobs in this city
					</div>
				</div>
			)}
		</div>
	);
};

export default FilteredJobs;
