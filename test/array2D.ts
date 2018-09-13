/* tslint:disable */
import { neighbours, Array2D, index } from '../src/tools/Array2D';
import * as test from 'tape';

const xs = new Array2D(5, 10);
xs.items = xs.items.map((x, ix) => ix);

test('array 2D', t => {
    t.plan(4);

    const ix = index(xs)([1, 1]);
    const n1 = neighbours(xs)([0, 0]);
    const arr = xs.lift();
    const n2 = neighbours(xs)([2, 2]);

    t.assert(n1.length === 3);
    t.assert(n2.length === 8);
    t.assert(ix === 6);
    t.assert(arr.length === xs.edgeY);
});

