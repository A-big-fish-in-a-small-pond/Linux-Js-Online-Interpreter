import styled, { keyframes } from "styled-components";

const Spin = keyframes`
  from   {  -webkit-transform: rotate(0deg); }
  to   {  -webkit-transform: rotate(360deg); }
`;

const MyLoading = styled.div`
    position: absolute;
    width: 100%;
    height: calc(100% + 130px);
    top: 0;
    left: 0;
    z-index: 10000;
    background: rgba(51, 51, 51, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .spin {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        border: dashed 2px white;
        animation: ${Spin} 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s infinite;
    }

    .ment {
        margin-top: 30px;
    }
`;

export default function LoadingComponent() {
    return (
        <MyLoading>
            <div className="spin"></div>
            <div className="ment">서버와 연결 중 입니다.</div>
        </MyLoading>
    );
}
