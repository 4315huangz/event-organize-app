import {Link} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPageAndLoginPage";
import {Logo, FormRow} from "../components";


const Login = () => {
    return <Wrapper>
    <form className="form">
        <Logo />
        <h4>Log in</h4>
        <FormRow name={"Email"} defaultValue={"john@abc.com"} type={"email"} />
        <FormRow name={"Password"} defaultValue={"abc@123"} type={"password"} />
        <button type="submit" className="btn btn-block">Login</button>
        <button type="button" className="btn btn-block">Explore the app</button>
        <p>Not a member yet? 
            <Link to="/register" className="member-btn">Register</Link>
        </p>
    </form>

    </Wrapper>
};

export default Login;