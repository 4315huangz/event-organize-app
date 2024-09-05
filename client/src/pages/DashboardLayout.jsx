import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import {SmallSidebar, BigSidebar, NavBar} from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

export const loader = async () => {
    try {
        const {data} = await axios.get('/api/v1/users/current-user');
        return data;
    } catch (error) {
        return redirect('/');
    }
}

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
    const {userWithoutPW} = useLoaderData();
    const navigate = useNavigate();

    const user = userWithoutPW;
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setDarkTheme] = useState(checkDefaultTheme());

    const toggleDarkTheme = () => {
        const newTheme = !isDarkTheme;
        setDarkTheme(newTheme);
        document.body.classList.toggle('dark-theme', newTheme);
        localStorage.setItem('darkTheme', newTheme);
    };
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const logutUser = async () => {
        navigate('/');
        await axios.get('/api/v1/auth/logout');
        toast.success('Logging out...');
    };


    return <DashboardContext.Provider value={{user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar,logutUser}}>
    <Wrapper>
        <main className="dashboard">
            <SmallSidebar />
            <BigSidebar />
            <div>
                <NavBar />
                <div className="dashboard-page">
                    <Outlet context={{user}}/>
                </div>
            </div>
        </main>
    </Wrapper>
    </DashboardContext.Provider>;
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;