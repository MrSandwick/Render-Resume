import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App.jsx'
import GlobalLoader from './components/comm/loader.jsx'
import './index.css'

const TechPage = lazy(() => import('./pages/techdetails.jsx'))
const ProjectsPage = lazy(() => import('./pages/projectspage.jsx'))

// Single loader at the root, keyed by route so it remounts on every navigation.
// This gives every page — including lazy-loaded ones — the same animated loader,
// covering both the chunk-download phase and the drei asset-loading phase.
function AppShell() {
	const { pathname } = useLocation()
	return (
		<>
			<GlobalLoader key={pathname} />
			<Suspense fallback={<div className="w-full min-h-screen bg-black" />}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/tech" element={<TechPage />} />
					<Route path="/projects" element={<ProjectsPage />} />
				</Routes>
			</Suspense>
		</>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppShell />
		</BrowserRouter>
	</React.StrictMode>
)
