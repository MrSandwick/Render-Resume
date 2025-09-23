import React from 'react'
import StarsCanvas from '../components/home/contact/starscanvas'
import ContactsCard from '../components/home/contact/contactcard'
import BoomCanvas from '../components/home/contact/boomcanvas'

export default function ContactSection() {
	return (
		<section id="contact" className="relative isolate">
			<StarsCanvas />
			<div
				className="relative z-10 max-w-5xl mx-auto px-4 py-12
				grid grid-cols-1 md:[grid-template-columns:0.9fr_1.1fr] gap-6
				items-center
				[&>*]:min-w-0
				[&>*:first-child]:order-2 [&>*:last-child]:order-1
				md:[&>*:first-child]:order-1 md:[&>*:last-child]:order-2"
			>
				<ContactsCard />
				<BoomCanvas />
			</div>
		</section>
	)
}
