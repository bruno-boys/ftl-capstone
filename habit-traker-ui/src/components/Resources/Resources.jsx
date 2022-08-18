import "../Resources/Resources.css";

export default function Resources() {
	const resources = [
		{
			category: "Time Management",
			content: [
				{
					title: "Top 10 Benefits of Time Management",
					link: "https://lucemiconsulting.co.uk/benefits-of-time-management/#:~:text=Effective time management increases your,achieve greater focus and prioritisation.",
				},
				{
					title: "10 Reasons Why Time Management is Important",
					link: "https://www.brainbridge.be/en/news/10-reasons-why-time-management-is-important",
				},
				{
					title: "What is Time Management",
					link: "https://www.brainbridge.be/en/news/10-reasons-why-time-management-is-important",
				},
				{
					title: "The Importance of Time Management: Tips for Boosting Your Productivity",
					link: "https://www.freshbooks.com/hub/productivity/importance-of-time-management#:~:text=Time%20management%20helps%20you%20prioritize,of%20a%20fast%20approaching%20deadline",
				},
				{
					title: "How To Manage Your Time More Effectively, (according to a machine)",
					link: "https://www.youtube.com/watch?v=iDbdXTMnOmE",
				},
			],
		},
		{
			category: "Productivity",
			content: [
				{
					title: "The Productivity Protocol for Success",
					link: "https://medium.com/@danielortiz6810/the-productivity-protocols-for-success-8dfd3abf458b",
				},
				{
					title: "Why is Productivity Important",
					link: "https://www.bls.gov/k12/productivity-101/content/why-is-productivity-important/home.htm#:~:text=With%20growth%20in%20productivity%2C%20an,as%20policymakers%20and%20government%20statisticians",
				},
				{
					title: "A Method to x100 your Productivity",
					link: "https://www.youtube.com/watch?v=cshVfS2LXm0",
				},
				{
					title: "50 Ways to Increase Productivity and Achieve More in Less Time",
					link: "https://www.lifehack.org/articles/featured/50-ways-to-increase-your-productivity.html",
				},
				{
					title: "Top strategies for increasing business productivity",
					link: "https://slack.com/blog/collaboration/top-strategies-improving-business-productivity",
				},
			],
		},

		{
			category: "Benefits of Habits",
			content: [
				{
					title: "10 incredible resources to help you create positive habits",

					link: "https://www.goalcast.com/complete-habit-guide-10-incredible-resources-help-create-new-positive-habits/](https://www.goalcast.com/complete-habit-guide-10-incredible-resources-help-create-new-positive-habits",
				},
				{
					title: "9 Best Habit Books to Read in 2022",

					link: "https://teambuilding.com/blog/habit-books](https://teambuilding.com/blog/habit-books",
				},
				{
					title: "Why and How to Track Your Habits",

					link: "https://jamesclear.com/habit-tracker](https://jamesclear.com/habit-tracker",
				},
				{
					title: "Benefits of Using a Habit Tracker",

					link: "https://www.cutelittlepaper.com/habit-tracker-benefits/](https://www.cutelittlepaper.com/habit-tracker-benefits",
				},
				{
					title: "The Science of Habits ",

					link: "https://www.cutelittlepaper.com/habit-tracker-benefits/](https://www.cutelittlepaper.com/habit-tracker-benefits",
				},
			],
		},
		{
			category: "Exercise",
			content: [
				{
					title: "Benefits of Physical Activity ",

					link: "https://www.cdc.gov/physicalactivity/basics/pa-health/index.htm#:~:text=Being physically active can improve,activity gain some health benefits](https://www.cdc.gov/physicalactivity/basics/pa-health/index.htm#:~:text=Being%20physically%20active%20can%20improve,activity%20gain%20some%20health%20benefits",
				},
				{
					title: "Wendy Suzuki: The Brain-Changing Benefits of Exercise",

					link: "https://www.youtube.com/watch?v=BHY0FxzoKZE&t=1s](https://www.youtube.com/watch?v=BHY0FxzoKZE&t=1s",
				},
				{
					title: "The Top 10 Benefits of Regular Exercise ",

					link: "https://www.healthline.com/nutrition/10-benefits-of-exercise](https://www.healthline.com/nutrition/10-benefits-of-exercise",
				},
				{
					title: "Exercise: What’s In It For You",

					link: "https://www.webmd.com/fitness-exercise/ss/slideshow-exercise](https://www.webmd.com/fitness-exercise/ss/slideshow-exercise",
				},
				{
					title: "How Exercise Changes Your Body After a Day, a Week, a Month, a Year",

					link: "https://www.smh.com.au/lifestyle/health-and-wellness/how-exercise-changes-your-body-after-a-day-a-week-a-month-20201106-p56c9y.html](https://www.smh.com.au/lifestyle/health-and-wellness/how-exercise-changes-your-body-after-a-day-a-week-a-month-20201106-p56c9y.html",
				},
			],
		},
	];
	return (
		<div className='flex flex-col min-h-screen overflow-hidden'>
			{/*  Page content */}
			<main className='flex-grow'>
				<section className='bg-gradient-to-b from-gray-100 to-white'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
							<div>
								{" "}
								<h1 className='resource-text'>Resources</h1>
								{resources.map((resource) => {
									return <ResourceCard resource={resource} />;
								})}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

function ResourceCard({ resource }) {
	return (
		<div className='collapsible'>
			<div className='header'>{resource.category}</div>
			<div className='content'>
				{resource.content.map((resource) => {
					return (
						<div className='resource-links'>
							<a href={resource.link}> {resource.title}</a>
							<br />
						</div>
					);
				})}
			</div>
		</div>
	);
}
