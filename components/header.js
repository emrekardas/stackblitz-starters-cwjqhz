import React, { useState } from 'react';
import { FaEyeSlash, FaBell } from 'react-icons/fa';

const Header = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="top-bar">
      <div className="icon visible" onClick={handleSidebarToggle}>
        <FaEyeSlash />
      </div>
      <div className="icon bell">
        <FaBell />
      </div>
    </div>
  );
};

export default Header;
