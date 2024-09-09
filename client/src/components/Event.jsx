import {FaLocationArrow ,FaBriefcase, FaCalendarAlt} from 'react-icons/fa';
import {Link, Form} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Event';
import EventInfo from './EventInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Event = ({_id, name, description, location, date, eventHost, eventStatus, createdAt}) => {
    const formatedDate = day(createdAt).format('MMM do, YYYY');

    return (
    <Wrapper>
        <header>
            <div className="main-icon">{name.charAt(0)}</div>
            <div className="info">
                <h5>{name}</h5>
                <p>{description.length > 50 ? `${description.substring(0,50)}...` : description}</p>
            </div>
        </header>
        <div className="content">
            <div className="content-center">
                <EventInfo icon={<FaLocationArrow />} text={location}/>
                <EventInfo icon={<FaCalendarAlt />} text={day(date).format('MM/DD/YYYY')}/>
                <EventInfo icon={<FaBriefcase />} text={eventHost}/>
                <div className={`status ${eventStatus}`}>{eventStatus}</div>
            </div>
            <footer className='actions'>
            <Link to={`/dashboard/edit-event/${_id}`} className='btn edit-btn'>Edit</Link>
            <Form method='post' action={`/dashboard/delete-event/${_id}`}>
                <button type='submit' className='btn delete-btn'>Delete</button>
            </Form>
            </footer>
        </div>
    </Wrapper>)
}

export default Event;