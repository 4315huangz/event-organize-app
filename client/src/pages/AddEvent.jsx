import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { EVENT_STATUS } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import FormRowSelect from "../components/FormRowSelect";

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    if( data.participants === "") {
         data.participants = [];
    } else {
        data.participants = data.participants.split(',').map(email => email.trim());
    }
    console.log(data)

    try {
        await axios.post('/api/v1/events', data);
        toast.success('Event is added successfull');
        return redirect('/dashboard/all-events');
    } catch (error) {
        toast.error(error?.response?.data);
        return error;
    }
}

const AddEvent = () => {
    const navigation = useNavigation();
    const {user} = useOutletContext();
    const isSumitting = navigation.state === 'submitting';
    return(
    <Wrapper>
        <Form method='post' className = 'form'>
            <h4 className="form-title">Add event</h4>
            <div className="form-center">
            <FormRow type='text' name='name' ></FormRow>
            <FormRow type='text' name='description' labelText='Event description'></FormRow>
            <FormRow type='text' name='location' labelText='Event location' ></FormRow>
            <FormRow type='text' name='date' labelText='Event date' placeholder='MM/DD/YYYY' ></FormRow>
            <FormRow type='text' name='eventHost' labelText='Hoster name' ></FormRow>
            <FormRow
                    type='text'
                    name='participants'
                    labelText='Participants (separate emails with commas)'
                    placeholder='e.g. alice@gmail.com, bob@gmail.com'
            />
            <FormRowSelect 
                name='eventStatus' 
                labelText='Event Status' 
                defaultValue={EVENT_STATUS.SCHEDULED} 
                list = {Object.values(EVENT_STATUS)}>
            </FormRowSelect>

            <button type="submit" className="btn btn-block form-btn" disabled={isSumitting}>
                {isSumitting? "Submitting..." : "Submit"}
            </button>
            </div>
        </Form>
    </Wrapper>);
};

export default AddEvent;