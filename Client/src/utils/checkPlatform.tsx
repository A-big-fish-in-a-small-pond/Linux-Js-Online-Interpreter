import { useMediaQuery } from "react-responsive";

export const Mobile: any = ({ children }: any) => {
    let isMobile = IsMobile();
    return <>{isMobile && children}</>;
};

export const PC: any = ({ children }: any) => {
    const isPC = IsPC();
    return <>{isPC && children}</>;
};

export const IsMobile = function (): boolean {
    return useMediaQuery({ query: "(max-width:767px)" });
};

export const IsPC = function (): boolean {
    return useMediaQuery({ query: "(min-width:768px)" });
};
