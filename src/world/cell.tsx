import { Critter, useCritters } from "./critters";
import { useHover } from "./hover";
import { useSpotlight } from "./spotlight";
import { eqXy, xy } from "./xy";
import styles from './world.module.scss';
import { Colour } from "./colour";

const getCritterClass = (critter?: Critter) => {
    switch(critter?.colour) {
        case Colour.Yellow:
            return styles.yellow;
        case Colour.Blue:
            return styles.blue;
        case Colour.Green:
            return styles.green;
        case Colour.Red:
            return styles.red;
    }
    return '';
}

export const Cell = ({at}: { at: xy }) => {

    const {critters} = useCritters();
    const { hover, hoverAt } = useHover();
    const { bg, colour } = useSpotlight(at, hoverAt);

    const critter = critters.find(critter => eqXy(critter.at, at));
    
    // const bg = hoverAt ? checkSpotlight(at, hoverAt) : '';

    const critterClass = getCritterClass(critter);

    return (
        <span className={`${styles.cell} ${bg} ${colour}`} onMouseEnter={() => hover(at)}>
            {critter && bg && critter.colour === colour && <span className={critterClass}>'o'</span>}
        </span>
    );
}