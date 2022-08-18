import React from "react";
import { Chart } from "react-google-charts";

export const options = {
	title: "Habit Progress",
	is3D: true,
	slices: { 0: { color: "#0070f4" }, 1: { color: "#CCCCCC" }, 2: { color: "blue" } },
};

export default function PieChart({ completed, missed }) {
	const number = 20;
	const data = [
		["Habit Progress (Completed/ Missed)", "Number Completed/ Missed"],
		["Completed", completed],
		["Missed", missed],
	];
	return completed + missed == 0 ? (
		<div> There are no data to display</div>
	) : (
		<Chart chartType='PieChart' data={data} options={options} width={"540px"} height={"510px"} />
	);
}
