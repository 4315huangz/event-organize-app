import {Link} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPageAndLoginPage";
import {Logo, FormRow} from "../components";

const Register = () => {
    return <Wrapper>
        <form className="form">
            <Logo />
            <h4>Register</h4>
            <FormRow name={"First Name"} defaultValue={"John"} type={"text"} />
            <FormRow name={"Last Name"} defaultValue={"White"} type={"text"} />
            <FormRow name={"Email"} defaultValue={"john@abc.com"} type={"email"} />
            <FormRow name={"Password"} defaultValue={"abc@123"} type={"password"} />
            <button type="submit" className="btn btn-block">Submit</button>
            <p>Already a member? 
                <Link to="/login" className="member-btn">Login</Link>
            </p>
        </form>
    </Wrapper>
};

export default Register;