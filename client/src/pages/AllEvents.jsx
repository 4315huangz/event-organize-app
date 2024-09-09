import axios from "axios";
import { EventsContainer, SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { toast } from "react-toastify";


export const loader = async () => {
    try {
        const {data} = await axios.get('/api/v1/events');
        return {data};
    } catch (error) {
        toast.error(error?.response?.data);
        return error;
    }
}
const AllEventsContext = createContext();
const AllEvents = () => {
    const {data} = useLoaderData();

    return <AllEventsContext.Provider value={{data}}>
        <SearchContainer />
        <EventsContainer />
    </AllEventsContext.Provider>;
};

export const useAllEventsContext = () => useContext(AllEventsContext);
export default AllEvents;