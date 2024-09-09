import React from "react";
import Event from "./Event";
import Wrapper from "../assets/wrappers/EventsContainer";
import { useAllEventsContext } from "../pages/AllEvents";

const EventsContainer = () => {
  const { data } = useAllEventsContext();
  const { events } = data;

  if (events.length === 0) {
    return (
      <Wrapper>
        <h2>No event to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="events">
        {events.map((event) => {
          return <Event key={event._id} {...event}/>;
        })}
      </div>
    </Wrapper>
  );
};

export default EventsContainer;
