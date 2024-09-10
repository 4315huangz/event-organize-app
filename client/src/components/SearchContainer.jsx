import React from 'react'
import FormRow from './FormRow';
import { Form } from 'react-router-dom';
import FormRowSelect from './FormRowSelect';
import { EVENT_SORT_BY, EVENT_STATUS } from '../../../utils/constants';
import Wrapper from '../assets/wrappers/SearchContainer';

const SearchContainer = () => {
  return (
    <Wrapper>
    <Form className='form'>
        <FormRow name='name' labelText='event name'> </FormRow>
        <FormRow name='location' labelText='event location'></FormRow>
        <FormRowSelect name='eventStatus' labelText='Event Status' defaultValue={EVENT_STATUS.SCHEDULED} list={Object.values(EVENT_STATUS)}></FormRowSelect>
        <FormRowSelect name='sort' labelText='Sort' defaultValue={EVENT_SORT_BY.NEWEST_FIRST} list={Object.values(EVENT_SORT_BY)}></FormRowSelect>
        <button className='btn' name='reset'>
            Reset Search Values
        </button>
    </Form>
    </Wrapper>
  )
}

export default SearchContainer