import React from "react";
import Event from "./Event";
import Wrapper from "../assets/wrappers/EventsContainer";
import { useAllEventsContext } from "../pages/AllEvents";
import PageBtnContainer from "./PageBtnContainer";

const EventsContainer = () => {
  const { data } = useAllEventsContext();
  const { events, totalEvents, numOfPages } = data;

  if (events.length === 0) {
    return (
      <Wrapper>
        <h2>No event to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>{totalEvents} event{events.length > 1 && 's'} found</h5>
      <div className="events">
        {events.map((event) => {
          return <Event key={event._id} {...event}/>;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer></PageBtnContainer>}
    </Wrapper>
  );
};

export default EventsContainer;
