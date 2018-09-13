export class Array2D<T> {
    items: T[];
    edgeX: number;
    edgeY: number;

    constructor(
        edgeX: number,
        edgeY: number
    ) {
        this.edgeX = edgeX;
        this.edgeY = edgeY;
        //@ts-ignore
        this.items = Array(edgeX * edgeY).fill(null);
    }

    lift() {
        //@ts-ignore
        const arr = [] as [T[]];

        this.items.reduce((a, x) => {
            if (a.length === this.edgeX - 1) {
                arr.push([...a, x]);

                return [];
            } else {
                return [...a, x];
            }
        }, []);

        return arr;
    }

    [Symbol.iterator]() {
        return this.items;
    }
}

const neigbouringCoords = ([x, y]: Coords) => [
    [x + 1, y],
    [x + 1, y + 1],
    [x + 1, y - 1],

    [x - 1, y],
    [x - 1, y + 1],
    [x - 1, y - 1],

    [x, y + 1],
    [x, y - 1],
];

export const index = <T>(xs: Array2D<T>) => ([x, y]: Coords) => {
    const coordsInside = exists(xs)([x, y]);

    if (coordsInside) {
        return xs.items[x + y * xs.edgeX];
    }
}

export const exists = <T>(xs: Array2D<T>) => ([x, y]: Coords) => {
    return x > -1 && x < xs.edgeX && y > -1 && y < xs.edgeY;
}

export const neighbours = <T>(xs: Array2D<T>) => (c: Coords) =>
    neigbouringCoords(c).map(index(xs)).filter(x => x !== undefined);