import { useContext, useReducer } from "react";
import { Colour } from "./colour"
import { eqXy, xy } from "./xy"
import { StateContext } from "../state-context";

export type Critter = {
    at: xy,
    colour: Colour
}

export const initCritters = () => [
    {
        at: {x: 5, y: 7},
        colour: Colour.Yellow
    },
    {
        at: {x: 10, y: 10},
        colour: Colour.Blue
    },
    {
        at: {x: 0, y: 9},
        colour: Colour.Green
    },
    {
        at: {x: 15, y: 25},
        colour: Colour.Red
    }
];

export type CrittersState = {
    critters: { critters: Critter[], killed: number},
    critterDispatch: React.Dispatch<{type: string, at?: xy, colour?: Colour}>
}

const reducer = (state: {critters: Critter[], killed: number}, action: {type: string, at?: xy, colour?: Colour}) => {
    const { critters, killed } = state;
    const { type, at, colour } = action;

    if (type === 'kill' && at && colour) {
        if (critters.find(critter => eqXy(critter.at, at) && critter.colour === colour)) {
            const remainingCritters = at && critters.filter(critter => !eqXy(critter.at, at));
            console.log('kill critter, remaining critters: ' + remainingCritters.length);
            return {critters: remainingCritters, killed: killed + 1};
        }
    }

    if (type === 'move') {
// console.log('moving critters');
        // const critters = [...crittersState.critters];
        for (const critter of critters) {
            const directions = [
                { x: critter.at.x - 1, y: critter.at.y },
                { x: critter.at.x + 1, y: critter.at.y },
                { x: critter.at.x, y: critter.at.y - 1 },
                { x: critter.at.x, y: critter.at.y + 1 }
            ];
            // console.log('directions');
            // console.log(directions);
            const canGo = directions.filter(direction => 
                direction.x >= 0 && direction.x < 30 && direction.y >= 0 && direction.y < 30 // && !crittersAt(direction)
            );
            // console.log('canGo');
            // console.log(canGo);

            const r = Math.floor(Math.random() * canGo.length);
            // console.log('r', r);
            const chosen = canGo[r];
            // console.log(`chosen: ${chosen}`);
            if (chosen) {
                critter.at = chosen;
            }
        }
        // console.log(critters);
        return {critters, killed};
    }

    return {critters, killed};
}

export const useCrittersState = (): CrittersState=> {
    // const [critters, setCritters] = useState(initCritters());
    const [critters, critterDispatch] = useReducer(reducer, {critters: initCritters(), killed: 0});
    // const [killedCritters, setKilledCritters] = useState(0);
    return {critters, critterDispatch};
}

export const useCritters = () => {
    const crittersState = useContext(StateContext).critters;
    if (!crittersState) throw 'error';

    const crittersAt = (at: xy): Critter[] => {
        return crittersState.critters.critters.filter(critter => eqXy(critter.at, at));
    }

    const killCritter = (at: xy, colour: Colour) => {
        crittersState.critterDispatch({ type: 'kill', at, colour});
    }

    const moveCritters = () => {
        crittersState.critterDispatch({ type: 'move'});
    }

    return {
        critters: crittersState.critters.critters,
        crittersAt,
        moveCritters,
        killCritter,
        killedCritters: crittersState.critters.killed };
}