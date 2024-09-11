import React from "react";
import FormRow from "./FormRow";
import { Form, Link } from "react-router-dom";
import FormRowSelect from "./FormRowSelect";
import { EVENT_SORT_BY, EVENT_STATUS } from "../../../utils/constants";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useAllEventsContext } from "../pages/AllEvents";


const SearchContainer = () => {
  const {searchParams} = useAllEventsContext();
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <FormRow name="name" labelText="event name" defaultValue={searchParams.name}></FormRow>
          <FormRow name="location" labelText="event location" defaultValue={searchParams.location}></FormRow>
          <FormRowSelect
            name="eventStatus"
            labelText="Event Status"
            defaultValue={searchParams.eventStatus}
            list={["All", ...Object.values(EVENT_STATUS)]}
          ></FormRowSelect>
          <FormRowSelect
            name="sort"
            labelText="Sort"
            defaultValue={searchParams.sort}
            list={Object.values(EVENT_SORT_BY)}
          ></FormRowSelect>
          <Link to='/dashboard/all-events' className="btn form-btn delete-btn">Reset Search Values</Link>
          <button type='submit' className="btn form-btn delete-btn">
          submit
        </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
