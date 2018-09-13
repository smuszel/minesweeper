import { range } from './array';

const shuffle = (xs: any[]) => {
    for (let i = xs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [xs[i], xs[j]] = [xs[j], xs[i]];
    }

    return xs;
}

const index = (xs: any[]) => {
    return Math.floor(Math.random() * (xs.length));
}

const uniqueIndexes = (len) => (n: number) => {
    return shuffle(range(0)(len)).slice(0, n);
}

export const uniquelyRepeatedMap = f => (xs: any[]) => (n: number) => {
    const ixs = uniqueIndexes(xs.length)(n);

    return xs.map((x, ix) => ixs.includes(ix) ? f(x) : x);
}

