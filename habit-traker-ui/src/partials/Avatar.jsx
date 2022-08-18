import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ImageAvatars({ handleLogout }) {
	const navigate = useNavigate();
	const ITEM_HEIGHT = 48;
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const options = ["Profile", "Buddies", "Sign Out"];

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Menu
				id='long-menu'
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				}}>
				<MenuItem sx={{ color: "#338CF5" }} onClick={() => navigate("/user-profile")}>
					Profile
				</MenuItem>
				<MenuItem sx={{ color: "#338CF5" }} onClick={() => navigate("/buddy-link")}>
					Buddies
				</MenuItem>
				<MenuItem onClick={handleLogout}>Sign Out</MenuItem>
			</Menu>
			<Stack direction='row' spacing={2} onClick={handleClick}>
				<Avatar alt='HabitTraker User' src='' />
			</Stack>
		</div>
	);
}
