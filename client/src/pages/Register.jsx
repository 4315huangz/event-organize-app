import {Form, redirect, useNavigation, Link} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPageAndLoginPage";
import {Logo, FormRow} from "../components";
import axios from 'axios';
import {toast} from 'react-toastify';

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await axios.post('/api/v1/auth/register', data);
        toast.success('Registration successful!')
        return redirect('/login');
    } catch (error) {
        toast.error(error?.response?.data);
        console.log(error);
        return error;
    }
};

const Register = () => {
    const navigation = useNavigation();
    console.log(navigation);
    const isSumitting = navigation.state === 'submitting';
    return <Wrapper>
        <Form className="form" method="post">
            <Logo />
            <h4>Register</h4>
            <FormRow name="name"  labelText="first name" type="text" />
            <FormRow name="lastName" labelText="last Name" type="text" />
            <FormRow name="email" labelText="email" type="email" />
            <FormRow name="password" labelText="passwrod"  type="password" />
            <button type="submit" className="btn btn-block" disabled={isSumitting} >
                {isSumitting? 'Submitting...' : 'Submit'}
            </button>
            <p>Already a member? 
                <Link to="/login" className="member-btn">Login</Link>
            </p>
        </Form>
    </Wrapper>
};

export default Register;