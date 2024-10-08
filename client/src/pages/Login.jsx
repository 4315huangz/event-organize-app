import {Form, redirect, useNavigation, Link, useNavigate} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPageAndLoginPage";
import {Logo, FormRow} from "../components";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await axios.post('/api/v1/auth/login', data);
        toast.success("Login Successful")
        return redirect('/dashboard');
    } catch (error) {
        toast.error(error?.response?.data);
        return error;
    }
}

const Login = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const navigate = useNavigate();
    const loginDemoUser = async () => {
        const data = {
            email: 'test@test.com',
            password: 'secret123'
        }
        try {
            await axios.post('/api/v1/auth/login', data);
            toast.success('Take a test drive!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error?.response?.data);
        }
    }
    return <Wrapper>
    <Form className="form" method="post">
        <Logo />
        <h4>Log in</h4>
        <FormRow name="email"  type="email" />
        <FormRow name="password"  type="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
            {isSubmitting? "Logging" : "Login"}
        </button>
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>Explore the app</button>
        <p>Not a member yet? 
            <Link to="/register" className="member-btn">Register</Link>
        </p>
    </Form>

    </Wrapper>
};

export default Login;