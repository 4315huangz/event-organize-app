import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/EditEvent";
import { redirect, useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify';
import { EVENT_STATUS } from "../../../utils/constants";
import { useNavigation } from "react-router-dom";
import { Form } from "react-router-dom";
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);


export const loader = async ({params}) => {
    try {
        const {data} = await axios.get(`/api/v1/events/${params.id}`);
        return data;
    } catch (error) {
        toast.error(error?.response?.data);
        return redirect('/dashboard/all-events');
    }
}

export const action = async ({request, params}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    if( data.participants === "") {
        data.participants = [];
   } else {
       data.participants = data.participants.split(',').map(email => email.trim());
   }
    
    try {
        await axios.patch(`/api/v1/events/${params.id}`, data);
        toast.success("Event updated successfully!");
        return redirect('/dashboard/all-events');
    } catch (error) {
        toast.error(error?.response?.data);
        console.log(error);
        return error;
    }
}
const EditEvent = () => {
    const {event} = useLoaderData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return <Wrapper>
        <Form method="post" className="form">
            <h4 className="form-title">Edit Event</h4>
            <div className="form-center">
                <FormRow type='text' labelText='event name' name='name' defaultValue={event.name}></FormRow>
                <FormRow type='text' labelText='event description' name='description' defaultValue={event.description}></FormRow>
                <FormRow type='text' labelText='event location' name='location' defaultValue={event.location}></FormRow>
                <FormRow type='text' labelText='event date in MM/DD/YYYY' name='date' defaultValue={day(event.date).format('MM/DD/YYYY')}></FormRow>
                <FormRow type='text' labelText='Hoster name' name='eventHost' defaultValue={event.eventHost}></FormRow>
                <FormRow
                    type='text'
                    name='participants'
                    labelText='Participants (separate emails with commas)'
                />
                <FormRowSelect 
                    name='eventStatus' 
                    labelText='event status' 
                    defaultValue={event.eventStatus} 
                    list={Object.values(EVENT_STATUS)}>
                </FormRowSelect>
                <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
                    {isSubmitting? "Submitting..." : "Submit"}
                </button>
            </div>
        </Form>
    </Wrapper>
};

export default EditEvent;