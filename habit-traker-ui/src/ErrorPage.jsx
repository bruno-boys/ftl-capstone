import React from "react";
import Header from "./partials/Header";

export default function ErrorPage() {
	return (
		<div className='flex flex-col min-h-screen overflow-hidden'>
			<Header />
			<main className='flex-grow'>
				<section className='bg-gradient-to-b from-gray-100 to-white'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
							<div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
								<h1 className='h2' style={{ fontSize: "150px" }}>
									404
								</h1>
								<h2 className='h1'>Uh-Oh, Looks like this Page Does Not Exist. Navigate Back to HabitTraker!</h2>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
