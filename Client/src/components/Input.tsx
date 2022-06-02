import styled from "styled-components";

export const StyledInput = styled.input`
    width: 100%;
    height: 50px;

    padding: 10px 15px;
    border: none;
    box-sizing: border-box;

    font-size: 15px;

    background-color: #e8f0fe;
    &::placeholder {
        opacity: 0.5;
    }
`;
