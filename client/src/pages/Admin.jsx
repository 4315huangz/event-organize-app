import {FaUsers, FaRegListAlt} from 'react-icons/fa';
import {useLoaderData, redirect} from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';
import {toast} from 'react-toastify';
import { StatItem } from '../components';
import axios from "axios";

export const loader = async () => {
    try {
        const response = await axios.get('/api/v1/users/admin/app-status');
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data);
        return redirect('/dashboard');
    }
}
const Admin = () => {
    const {users, events} = useLoaderData();
    
    return <Wrapper>
        <StatItem title = 'total users' count = {users} icon = {<FaUsers />} ></StatItem>
        <StatItem title = 'total events' count = {events} icon = {<FaRegListAlt />}></StatItem>
    </Wrapper>;
};

export default Admin;