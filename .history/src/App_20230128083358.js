import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import Jobs from './pages/Jobs';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import { JobContextProvider } from './context/JobContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import FilteredJobs from './pages/FilteredJobs';
import { motion } from 'framer-motion';

const App = () => {
	return (
		<AuthContextProvider>
			<JobContextProvider>
				<Navbar />

				<Routes>
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route path='/jobs/:city' element={<FilteredJobs />} />
					<Route path='/jobs' element={<Jobs />} />
					<Route path='/' element={<Home />} />
					<Route path='/signin' element={<SignIn />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/forgotpassword' element={<ForgotPassword />} />
				</Routes>
				<ToastContainer />
				<Footer />
			</JobContextProvider>
		</AuthContextProvider>
	);
};

export default App;
