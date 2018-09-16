const neigbouringCoords = edgeX => edgeY => ([x, y]) => [
    [x + 1, y],
    [x + 1, y + 1],
    [x + 1, y - 1],

    [x - 1, y],
    [x - 1, y + 1],
    [x - 1, y - 1],

    [x, y + 1],
    [x, y - 1],
    //@ts-ignore
].filter(c => isCoordValid(edgeX)(edgeY)(c));

const isCoordValid = edgeX => edgeY => ([x, y]) => {
    return x > -1 && x < edgeX && y > -1 && y < edgeY;
}

const indexToCoord = edgeX => ix => {
    const x = ix % edgeX;
    const y = Math.floor(ix / edgeX);

    return [x, y] as [number, number];
}

const coordToIndex = edgeX => ([x, y]) => {
    return edgeX * y + x;
}

export const neighbouringIndexes = edgeX => edgeY => ix => {
    const c = indexToCoord(edgeX)(ix);
    const cs = neigbouringCoords(edgeX)(edgeY)(c);
    const indexes = cs.map(coordToIndex(edgeX));

    return indexes;
}