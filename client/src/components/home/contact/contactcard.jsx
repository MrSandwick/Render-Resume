// src/components/contact/ContactsCard.jsx
import React from 'react'
import { CONTACTS } from '../../../db/contactData'

export default function ContactsCard() {
	// keep only socials in case DB still has Email/Resume
	const items = CONTACTS.filter(c =>
		!['resume','email'].includes((c.label||'').toLowerCase())
	)

	return (
		<div className="max-w-md bg-white/5 backdrop-blur rounded-2xl p-4 md:p-5 ring-1 ring-white/10 shadow-lg">
			<h2 className="text-xl font-semibold tracking-tight">Connect</h2>
			<p className="text-white/70 mt-1 mb-3 text-sm">
				Find me on these platforms.
			</p>

			<div className="lg:overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				<ul className="flex flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-3 w-full lg:w-max">
					{items.map((c) => (
						<li key={c.label} className="m-0 min-w-0">
							<a
								className="group flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/40 whitespace-nowrap"
								href={c.href}
								target="_blank"
								rel="noreferrer noopener"
								aria-label={c.aria}
							>
								<span className="inline-block w-4 text-center shrink-0" aria-hidden>{c.icon}</span>
								<span className="font-medium text-sm truncate max-w-[10rem] sm:max-w-none">{c.text}</span>
							</a>
						</li>
					))}
				</ul>
			</div>



		</div>
	)
}
