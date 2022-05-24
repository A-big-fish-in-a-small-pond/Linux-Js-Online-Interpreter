import styled, { css } from "styled-components";

interface Props {
    size?: string;
}

export const StyledButton = styled.button<Props>`
    ${(props: any) => {
        return props.size === "small"
            ? css`
                  width: 100px;
                  height: 30px;
                  font-size: 15px;
              `
            : css`
                  width: 200px;
                  height: 50px;
                  font-size: 18px;
              `;
    }}

    border: none;
    border-radius: 30px;

    font-weight: bold;

    background-color: #6a75ca;
    color: white;

    cursor: pointer;
    opacity: 0.5;

    transition: all 1s;

    &:hover {
        opacity: 1;
    }
`;
