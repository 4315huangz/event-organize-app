import { Outlet } from "react-router-dom";
import {SmallSidebar, BigSidebar, NavBar} from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";

const DashboardContext = createContext();

const DashboardLayout = () => {
    const user = {name: "john"};
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
        console.log("logout user");
    };


    return <DashboardContext.Provider value={{user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar,logutUser}}>
    <Wrapper>
        <main className="dashboard">
            <SmallSidebar />
            <BigSidebar />
            <div>
                <NavBar />
                <div className="dashboard-page">
                    <Outlet />
                </div>
            </div>
        </main>
    </Wrapper>
    </DashboardContext.Provider>;
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;