import React, { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";
import "./Features.css";

function Features() {
	const [tab, setTab] = useState(1);
	const tabs = useRef(null);
	const delay = 3000;

	const heightFix = () => {
		if (tabs.current.children[tab]) {
			tabs.current.style.height = tabs.current.children[tab - 1].offsetHeight + "px";
		}
	};

	const slideshow = () => {
		let currentTab;
		if (tab === 1 || tab === 2) {
			currentTab = tab + 1;
		} else {
			currentTab = 1;
		}
		setTimeout(() => setTab(currentTab), delay);
	};

	useEffect(() => {
		heightFix();
		slideshow();
	}, [tab]);

	return (
		<section className='relative'>
			{/* Section background (needs .relative class on parent and next sibling elements) */}
			<div className='absolute inset-0 bg-gray-100 pointer-events-none mb-16' aria-hidden='true'></div>
			<div className='absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2'></div>

			<div className='relative max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-12 md:pt-20'>
					{/* Section header */}
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-16' id='image-slider-container'>
						<h1 className='h2 mb-4'>Reach your Goals</h1>
						<p className='text-xl text-gray-600'>
							Whether you are trying to start a new habit or end a bad one, we have the tools for you to be your best self!
						</p>
					</div>

					{/* Section content */}
					<div id='md-grid' className='md:grid md:grid-cols-12 md:gap-6'>
						{/* Content */}
						<div
							className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6'
							data-aos='fade-right'
							style={{ minWidth: "62vw" }}>
							{/* Tabs items */}
							<div
								className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1'
								data-aos='zoom-y-out'
								ref={tabs}>
								<div id='slideshow-wrapper' className='relative flex flex-col text-center'>
									<div className='tab-grid'>
										{/* Item 1 */}
										<Transition
											show={tab === 1}
											appear={true}
											className='w-full'
											enter='transition ease-in-out duration-700 transform order-first'
											enterStart='opacity-0 translate-x-16'
											enterEnd='opacity-100 translate-x-0'
											leave='transition ease-in-out duration-300 transform absolute'
											leaveStart='opacity-100 translate-x-0'
											leaveEnd='opacity-0-translate-x-16'>
											<div className='relative inline-flex flex-col'>
												<img
													className='md:max-w-none mx-auto rounded'
													src={
														"https://directory.yogagreenbook.com/wp-content/uploads/2017/07/19807349_10102704721638334_1563892779_o-e1499440594825.jpg"
													}
													width='700'
													height='462'
													alt='Features bg'
												/>
											</div>
										</Transition>
										{/* Item 2 */}
										<Transition
											show={tab === 2}
											appear={true}
											className='w-full'
											enter='transition ease-in-out duration-700 transform order-first'
											enterStart='opacity-0 translate-x-16'
											enterEnd='opacity-100 translate-x-0'
											leave='transition ease-in-out duration-300 transform absolute'
											leaveStart='opacity-100 translate-x-0'
											leaveEnd='opacity-0 -translate-x-16'>
											<div className='relative inline-flex flex-col'>
												<img
													className='md:max-w-none mx-auto rounded'
													src={
														"https://media.istockphoto.com/photos/focused-millennial-african-student-making-notes-while-studying-in-picture-id962315354?k=20&m=962315354&s=612x612&w=0&h=f3AlDnr-qHz4L2QyxZP3-49fordK2jtC7L8-J-lOw7U="
													}
													width='700'
													height='462'
													alt='Features bg'
												/>
											</div>
										</Transition>
										{/* Item 3 */}
										<Transition
											show={tab === 3}
											appear={true}
											className='w-full'
											enter='transition ease-in-out duration-700 transform order-first'
											enterStart='opacity-0 translate-x-16'
											enterEnd='opacity-100 translate-x-0'
											leave='transition ease-in-out duration-300 transform absolute'
											leaveStart='opacity-100 translate-x-0'
											leaveEnd='opacity-0 -translate-x-16'>
											<div className='relative inline-flex flex-col'>
												<img
													className='md:max-w-none mx-auto rounded'
													src={
														"https://media.istockphoto.com/photos/happy-african-american-family-preparing-healthy-food-in-the-kitchen-picture-id1306001320?k=20&m=1306001320&s=612x612&w=0&h=X5ysL9kU3gvoGNhChtPafW_D-AI2-1LHDA8ZQB7SlDY="
													}
													width='700'
													height='462'
													alt='Features bg'
												/>
											</div>
										</Transition>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Features;
