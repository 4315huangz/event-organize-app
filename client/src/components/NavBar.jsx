import Wrapper from "../assets/wrappers/NavBar";
import {FaAlignLeft} from "react-icons/fa";
import {useDashboardContext} from "../pages";
import {LogoutContainer, Logo, ThemeToggle} from "../components";

const NavBar= () => {
  const {toggleSidebar} = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
};
export default NavBar