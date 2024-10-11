import { xy } from "./xy";
import styles from './world.module.scss';
import { useContext, useState } from "react";
import { Colour } from "./colour";
import { StateContext } from "../state-context";

export enum Direction {
    Up,
    Down
}

export type SpotlightState = {
    colour: Colour,
    setColour: React.Dispatch<React.SetStateAction<Colour>>
}

export const useSpotlightState = (): SpotlightState=> {
    const [colour, setColour] = useState<Colour>(Colour.Blue);
    return {colour, setColour};
}

const spotlight = [
    [0,0,2,2,2,0,0],
    [0,2,2,2,2,2,0],
    [2,2,3,3,3,2,2],
    [2,2,3,4,3,2,2],
    [2,2,3,3,3,2,2],
    [0,2,2,2,2,2,0],
    [0,0,2,2,2,0,0]
];

export const checkSpotlight = (at: xy, hoverAt: xy) => {

    const x = 3 - (hoverAt.x - at.x);
    const y = 3 - (hoverAt.y - at.y);

    const s = spotlight[y]?.[x];

    switch (s) {
        case 4:
            return styles.hover1;
        case 3:
            return styles.hover2;
        case 2:
            return styles.hover3;
    }

    return '';
}

export const useSpotlight = (at: xy, hoverAt?: xy) => {
    const spotlightState = useContext(StateContext).spotlight;
    if (!spotlightState) throw 'error';
    // console.log('update use spotlight');

    const bg = hoverAt ? checkSpotlight(at, hoverAt) : '';

    const cycleColour = () => {
        if (spotlightState.colour === Colour.Blue) {
            spotlightState.setColour(Colour.Yellow);
        } else {
            spotlightState.setColour(Colour.Blue);
        }
    }

    return {bg, colour: spotlightState.colour, cycleColour};
}

const newColour = (c: Colour, d: Direction) => {
    switch (c) {
        case Colour.Yellow:
            return d === Direction.Down ? Colour.Blue : Colour.Green;
        case Colour.Blue:
            return d === Direction.Down ? Colour.Red : Colour.Yellow;
        case Colour.Red:
            return d === Direction.Down ? Colour.Green : Colour.Blue;
        case Colour.Green:
            return d === Direction.Down ? Colour.Yellow : Colour.Red;
    }
}

export const useGlobalSpotlight = () => {
    const spotlightState = useContext(StateContext).spotlight;
    if (!spotlightState) throw 'error';

    const cycleColour = (d: Direction) => {
        // console.log('cycle colour');
        spotlightState.setColour(newColour(spotlightState.colour, d));
    }

    return {cycleColour, colour: spotlightState.colour};
}