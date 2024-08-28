import React from "react";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillMoonFill className="toggle-icon" />
      ) : (
        <BsFillSunFill />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
