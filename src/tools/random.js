import { range } from './array';

export const shuffle = (xs) => {
    for (let i = xs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [xs[i], xs[j]] = [xs[j], xs[i]];
    }

    return xs;
}

const uniqueIndexes = (len) => (n) => {
    return shuffle(range(0)(len)).slice(0, n);
}

export const uniquelyRepeatedMap = f => xs => (n) => {
    const ixs = uniqueIndexes(xs.length)(n);

    return xs.map((x, ix) => ixs.includes(ix) ? f(x) : x);
}

