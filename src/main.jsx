import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import App from './App.jsx'
import TechPage from './pages/techdetails.jsx'
import ProjectsPage from './pages/projects.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/tech" element={<TechPage />} />\
				<Route path="/projects" element={<ProjectsPage />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)