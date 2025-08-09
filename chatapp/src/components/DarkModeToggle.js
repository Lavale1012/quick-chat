import React, { useState, useEffect } from "react";
import { LuMoonStar } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for dark mode preference at the OS level
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-3 dark:bg-gray-900 bg-gray-200 hover:bg-gray-300 rounded-md dark:text-white dark:hover:bg-gray-800 transition duration-300"
    >
      {darkMode ? <MdOutlineWbSunny /> : <LuMoonStar />}
    </button>
  );
};

export default DarkModeToggle;
