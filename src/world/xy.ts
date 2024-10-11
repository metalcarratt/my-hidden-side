export type xy = {
    x: number;
    y: number;
};

export const eqXy = (xy1: xy, xy2: xy) => 
    xy1.x === xy2.x && xy1.y === xy2.y;
