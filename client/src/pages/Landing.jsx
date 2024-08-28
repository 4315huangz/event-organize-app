import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import {Logo} from "../components";


const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Welcome to <span>Eventify</span> - Your Ultimate Group Event Planner!</h1>
          <p>
            Whether you're organizing a camping trip, a weekend getaway, or just a simple
            get-together, Eventify is here to make sure everything goes off without a hitch. 
            Simply create an event, and everyone invited can log in to contribute. No more 
            endless group chats or confusing spreadsheets — everything is neatly organized 
            in one place. Join Eventify today and start planning your next adventure
            with ease and confidence. Your group events, made simple.
          </p>
          <Link to="/register" className="btn register-link">Register</Link>
          <Link to="/login" className="btn">Login Page</Link>
        </div>
        <img src={main} alt="event organizer" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
