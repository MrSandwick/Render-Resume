// tabs indentation
import React from 'react'
import StarsCanvas from '../components/home/contact/starscanvas'
import ContactsCard from '../components/home/contact/contactcard'
import ConCanvas from '../components/home/contact/concanvas'
import EmailFormCard from '../components/home/contact/emailcard'

export default function ContactSection() {
	return (
		<section id="contact" className="relative isolate">
			<StarsCanvas />
			<div
				className="relative z-10 max-w-5xl mx-auto px-4 py-12
				grid grid-cols-1 md:[grid-template-columns:0.9fr_1.1fr] gap-6
				items-center justify-items-center
				[&>*]:min-w-0
				[&>*:first-child]:order-2 [&>*:last-child]:order-1
				md:[&>*:first-child]:order-1 md:[&>*:last-child]:order-2"
			>
				<div className="flex gap-6 flex-col-reverse [&>*]:min-w-0">
					<EmailFormCard />
					<ContactsCard />
				</div>

				{/* Responsive ConCanvas: grows with viewport, with sensible bounds */}
				<ConCanvas className="w-full min-h-[300px] h-[44vh] sm:h-[52vh] md:h-[60vh] lg:h-[68vh] xl:h-[72vh] max-h-[80vh]" />
				{/* Alt (aspect-ratio approach):
				<ConCanvas className="w-full aspect-[4/3] md:aspect-[16/10]" />
				*/}
			</div>
		</section>
	)
}
