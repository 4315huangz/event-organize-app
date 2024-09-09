import React from 'react'
import FormRow from './FormRow';
import { Form } from 'react-router-dom';
import FormRowSelect from './FormRowSelect';
import { EVENT_SORT_BY } from '../../../utils/constants';

const SearchContainer = () => {
  return (
    <Form className='form'>
        
        <FormRow name='seach' labelText='Search'> </FormRow>
        <FormRow name='location' labelText='Location'></FormRow>
        <FormRow name='hostEmail' labelText='Hoster Email'></FormRow>
        <FormRow name='eventStatus' labelText='Event Status'></FormRow>
        <FormRowSelect name='sort' labelText='Sort' defaultValue={EVENT_SORT_BY.NEWEST_FIRST} list={Object.values(EVENT_SORT_BY)}></FormRowSelect>
        <button name='reset'>
            Reset Search Values
        </button>
    </Form>

  )
}

export default SearchContainer