export const constructArray2D = (edgeX, edgeY, fill?) => {
    const items = Array(edgeX * edgeY).fill(fill);

    return decorate(edgeX, edgeY, items);
}

const decorate = (edgeX, edgeY, items) => {
    const _items = [].concat(items);

    Reflect.defineProperty(items, 'edgeX', {
        value: edgeX
    });

    Reflect.defineProperty(items, 'edgeY', {
        value: edgeY
    });

    Reflect.defineProperty(items, 'map', {
        value: f => decorate(edgeX, edgeY, _items.map(f))
    });

    return items;
}

const neigbouringCoords = xs => ([x, y]) => [
    [x + 1, y],
    [x + 1, y + 1],
    [x + 1, y - 1],

    [x - 1, y],
    [x - 1, y + 1],
    [x - 1, y - 1],

    [x, y + 1],
    [x, y - 1],
    //@ts-ignore
].filter(c => isCoordValid(xs)(c));

const isCoordValid = xs => ([x, y]) => {
    return x > -1 && x < xs.edgeX && y > -1 && y < xs.edgeY;
}

const indexToCoord = xs => ix => {
    const x = ix % xs.edgeX;
    const y = Math.floor(ix / xs.edgeX);

    return [x, y] as [number, number];
}

const coordToIndex = xs => ([x, y]) => {
    return xs.edgeX * y + x;
}

export const neighbouringIndexes = xs => ix => {
    const c = indexToCoord(xs)(ix);
    const cs = neigbouringCoords(xs)(c);
    const indexes = cs.map(coordToIndex(xs));

    return indexes;
}