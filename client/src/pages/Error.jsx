import { useRouteError, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
    const error = useRouteError();
    if(error.status === 404) {
        return (<Wrapper>
            <div>
            <img src={img} alt="error" />
            <h3>Ohh! Page Not Found</h3>
            <p>We can't seem to find the page you are looking for</p>
            <Link to="/dashboard">Back Home</Link>
            </div>
        </Wrapper>);
    }
    return (<Wrapper>
        <div>
            <h3>not 404</h3>
        </div>
    </Wrapper>);
};

export default Error;