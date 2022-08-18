import React from "react";
import { useState } from "react";
import apiClient from "../services/apiClient";
import Header from "../partials/Header";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function BuddyLink() {
	const [isProcessing, setIsProcessing] = useState(null);
	const [errors, setErrors] = useState("");
	const [link, setLink] = useState();
	const [copied, setCopied] = useState();

	const generateLink = async (event) => {
		setIsProcessing(true);
		setErrors(null);

		const { data, error } = await apiClient.generateURLId();
		if (error) {
			setErrors(error);
		}
		if (data?.url) {
			setLink(data.url);
		}
		setIsProcessing(false);
	};

	return (
		<div className='flex flex-col min-h-screen overflow-hidden'>
			{/*  Site header */}
			<Header />
			{/*  Page content */}
			<main className='flex-grow'>
				<section className='bg-gradient-to-b from-gray-100 to-white'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
							{/* Page header */}

							{/* Form */}
							<div className='max-w-sm mx-auto'>
								<div className='max-w-3xl mx-auto text-center pb-12 md:pb-20' style={{ paddingBottom: "2rem" }}>
									<h1 className='h1 mb-4'>Everything is better with a friend!</h1>
									{!errors ? (
										<p className='text-xl text-gray-600'>Generate a link below to send to your friend and track each other's progress.</p>
									) : (
										<p className='text-xl text-gray-600' style={{ color: "red" }}>
											You are already matched with a Buddy. If you wish to connect with a new buddy, remove your current Buddy.
										</p>
									)}
								</div>
								<form>
									{copied == true && link ? (
										<div style={{ display: "flex", justifyContent: "flex-end" }}>
											<p style={{ color: "green", fontSize: "12px" }}>Link Copied</p>
										</div>
									) : (
										<></>
									)}
									<div className='copy-link' style={{ display: "flex", flexWrap: "wrap" }}>
										<CopyToClipboard text={link}>
											<button
												className='btn text-white bg-gray-600 hover:bg-gray-700 w-half'
												style={{ maxHeight: "50px", width: "20%" }}
												onClick={(event) => {
													event.preventDefault();
													if (link) {
														setCopied(true);
													}
												}}>
												Copy
											</button>
										</CopyToClipboard>
										<div className='flex flex-wrap -mx-3 mb-4' style={{ flexGrow: 1 }}>
											<div className='w-full px-3'>
												<input id='link' type='text' className='form-input w-full text-gray-800' value={link} style={{ color: "gray" }} required />
											</div>
										</div>
									</div>
									<div className='flex flex-wrap -mx-3 mt-6' style={{ marginTop: "0px" }}>
										<div className='w-full px-3'>
											<button className='btn text-white bg-blue-600 hover:bg-blue-700 w-full' disabled={isProcessing} onClick={generateLink}>
												{isProcessing ? "Loading..." : "Generate link"}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
