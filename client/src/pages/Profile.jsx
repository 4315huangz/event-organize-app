import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useNavigation, Form, useOutletContext } from 'react-router-dom';
import { toast} from 'react-toastify';
import { FormRow } from '../components';
import axios from 'axios';

export const action = async ({request}) => {
    const formData = await request.formData();
    const file = formData.get('avatar');
    if(file && file.size > 500000) {
        toast.error('Image size too large');
        return null;
    }
    try {
        await axios.patch('/api/v1/users/update-user', formData);
        toast.success('Your account is updated succssfully!')
        return null;
    } catch (error) {
        toast.error(error?.response?.data);
        return error;
    }
}

const Profile = () => {
    const {user} = useOutletContext();
    const {name, lastName, email} = user;
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return <Wrapper>
        <Form method='post' className='form' encType='multipart/form-data'>
            <h4 className='form-title'> profile</h4>
            <div className='form-center'>
                <div className='form-row'>
                    <label htmlFor='avatar' className='form-label'>
                        Select an image file (max 0.5 MB)
                    </label>
                    <input type='file' id='avatar' name='avatar' className='form-input' accept='image/*'/>
                </div>
                <FormRow type = 'text' name='name' defaultValue={name} labelText='first name'></FormRow>
                <FormRow type = 'text' name='lastName' defaultValue={lastName} labelText='last name'></FormRow>
                <FormRow type = 'text' name='email' defaultValue={email} labelText='email'></FormRow>
            </div>
            <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>
                {isSubmitting? 'Submitting...' : 'Submit'}
            </button>
        </Form>
    </Wrapper>
};

export default Profile;