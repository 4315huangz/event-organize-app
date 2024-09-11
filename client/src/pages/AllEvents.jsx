import axios from "axios";
import { EventsContainer, SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { toast } from "react-toastify";


export const loader = async ({request}) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries()
    ]);
    
    try {
        const {data} = await axios.get('/api/v1/events', {
            params
        });
        return {data, searchParams: {...params}};
    } catch (error) {
        toast.error(error?.response?.data);
        return error;
    }
}
const AllEventsContext = createContext();
const AllEvents = () => {
    const {data, searchParams} = useLoaderData();

    return <AllEventsContext.Provider value={{data, searchParams}}>
        <SearchContainer />
        <EventsContainer />
    </AllEventsContext.Provider>;
};

export const useAllEventsContext = () => useContext(AllEventsContext);
export default AllEvents;