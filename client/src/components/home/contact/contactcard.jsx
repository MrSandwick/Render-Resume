import React from 'react'
import { CONTACTS } from '../../../db/contactData'

export default function ContactsCard() {
	return (
		<div className="bg-white/5 backdrop-blur rounded-2xl p-6 md:p-8 ring-1 ring-white/10 shadow-lg">
			<h2 className="text-3xl font-semibold tracking-tight">Let’s connect</h2>
			<p className="text-white/70 mt-2 mb-6">
				Have a role, project, or idea you want to explore? Reach out via email or connect with me on the platforms below.
			</p>
			<address className="not-italic">
				<ul className="space-y-3">
					{CONTACTS.map((c) => (
						<li key={c.label}>
							<a
								className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/40"
								href={c.href}
								target="_blank"
								rel="noreferrer noopener"
								aria-label={c.aria}
							>
								<span className="inline-block w-5 text-center" aria-hidden>{c.icon}</span>
								<span className="font-medium">{c.text}</span>
								<span className="opacity-0 group-hover:opacity-60 ml-auto text-xs" aria-hidden>open</span>
							</a>
						</li>
					))}
				</ul>
			</address>
		</div>
	)
}
