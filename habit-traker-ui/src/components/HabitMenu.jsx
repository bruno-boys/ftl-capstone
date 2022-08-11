import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  'Log',
  'Edit',
  'Delete'
];

const ITEM_HEIGHT = 48;

export default function LongMenu({ deleteHabit, updateLog, setVideoModalOpen  }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const habitFeatures = (option) => {
    console.log("option =",option)
    if (option == "Delete") {return deleteHabit}
  }


  const openEditHabitForm = (e) => {
    handleClose();
    e.preventDefault();
    e.stopPropagation(); 
    setVideoModalOpen(true)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem  name={option} key={option} selected={option === 'Pyxis'} 
          onClick={
            option == "Delete" ? 
            deleteHabit
            :
            option == "Log" ? 
            updateLog 
            :
            openEditHabitForm
          }>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
