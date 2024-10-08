import styled from "styled-components";

const Wrapper = styled.article`
    form h5{
        margin-bottom: 2rem;
    }
    .form-center {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        column-gap: 2.5rem;
        row-gap: 2rem;
        @media (min-width: 800px) {
            grid-template-columns: 1fr 1fr;
        }
    }
   
`

export default Wrapper;