import React from 'react';
import Wrapper from '../assets/wrappers/EventInfo';

const EventInfo = ({icon, text}) => {
  return (
    <Wrapper>
        <span className='event-icon'>{icon}</span>
        <span className='event-text'>{text}</span>
    </Wrapper>
  )
}

export default EventInfo