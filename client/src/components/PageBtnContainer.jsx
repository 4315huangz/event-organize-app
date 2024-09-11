import React from 'react'
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useAllEventsContext } from '../pages/AllEvents';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {HiChevronDoubleLeft,HiChevronDoubleRight} from 'react-icons/hi';

const PageBtnContainer = () => {
    const {data:{numOfPages, currentPage}} = useAllEventsContext();
    const pages = Array.from({length: numOfPages}, (_, index) => {
        return index + 1;
    });
    const {searchFromUrl, pathname} = useLocation();
    const navigate = useNavigate();

    const handlePageChange = (pageNum) => {
        const newSearchParam = new URLSearchParams(searchFromUrl);
        newSearchParam.set('page', pageNum);
        navigate(`${pathname}?${newSearchParam.toString()}`);
    }

    const addPageButton = (pageNum, isActive) => {
        return (<button 
            className={`btn page-btn ${isActive && 'active'}`}
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}>
                {pageNum}
            </button>);
    }

    const renderPageButtons = () => {
        const pageButtons = [];
        pageButtons.push(
            addPageButton(1, currentPage === 1)
        );
        //dots
        if(currentPage > 2) {
            pageButtons.push(<span className='page-btn dots' key='dots-1'>..</span>)
        }
        if(currentPage !== 1 && currentPage !== numOfPages){
            pageButtons.push(
                addPageButton(currentPage, true)
            );
        }
        if(currentPage < numOfPages -1 ) {
            pageButtons.push(<span className='page-btn dots' key='dots+1'>..</span>)
        }
    
        pageButtons.push(
            addPageButton(numOfPages, currentPage === numOfPages)
        );
        return pageButtons;
    }
  return (
    <Wrapper>
        <button className='btn prev-btn' onClick={() => {
            let prevPage = currentPage - 1;
            if(prevPage < 1) prevPage = numOfPages;
            handlePageChange(prevPage);
        }}>
            <HiChevronDoubleLeft/>
            prev
        </button>
        <div className='btn-container'>
        { renderPageButtons() }
        </div>
        <button className='btn next-btn' onClick={() => {
            let nextPage = currentPage + 1;
            if(nextPage > numOfPages) nextPage = 1;
            handlePageChange(nextPage);
        }}>
            <HiChevronDoubleRight/>
            next
        </button>
    </Wrapper>
  )
}

export default PageBtnContainer