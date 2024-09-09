import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({params}) => {
    try {
        await axios.delete(`/api/v1/events/${params.id}`);
        toast.success('Delete the event successfully!')
        return redirect('/dashboard/all-events');
    } catch (error) {
        toast.error(error?.response?.data);
        return error;
    }
};

