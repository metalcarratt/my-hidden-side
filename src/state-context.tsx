import { createContext } from "react";
import { CrittersState, useCrittersState } from "./world/critters";
import { HoverState, useHoverState } from "./world/hover";
import { SpotlightState, useSpotlightState } from "./world/spotlight";

type State = {
    critters?: CrittersState;
    hover?: HoverState;
    spotlight?: SpotlightState;
}

export const StateContext = createContext<State>({});

export const StateProvider = ({children}: React.PropsWithChildren) => {
    const critters = useCrittersState();
    const hover = useHoverState();
    const spotlight = useSpotlightState();

    const value = {
        critters,
        hover,
        spotlight
    }
    return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

