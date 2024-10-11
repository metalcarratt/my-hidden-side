import { useContext, useState } from "react";
import { StateContext } from "../state-context";
import { xy } from "./xy";

export type HoverState = {
    hoverAt: xy | undefined,
    setHoverAt: React.Dispatch<React.SetStateAction<xy | undefined>>
}

export const useHoverState = (): HoverState=> {
    const [hoverAt, setHoverAt] = useState<xy | undefined>();
    return {hoverAt, setHoverAt};
}

export const useHover = () => {
    const hoverState = useContext(StateContext).hover;
    if (!hoverState) throw 'error';

    const hover = (at: xy) => {
        // console.log(`${x}, ${y}`);
        hoverState.setHoverAt(at);
    }

    return { hoverAt: hoverState.hoverAt, hover };
}