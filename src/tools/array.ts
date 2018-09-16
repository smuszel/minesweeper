export const range = (start = 0) => end => {
    return Array(end - start).fill(undefined).map((_, ix) => ix + start);
}

export const toggle = (xs, y) => {
    if (xs.includes(y)) {
        return xs.filter(x => x !== y);
    } else {
        return [...xs, y]
    }
}

export const flatten = (xs) => {
    const h = (flat, toFlatten) => flat.concat(Array.isArray(toFlatten)
        ? flatten(toFlatten)
        : toFlatten
    );

    return xs.reduce(h, []);
}