/* tslint:disable */
import { constructArray2D } from '../src/tools/Array2D';
import * as test from 'tape';

const xs = constructArray2D(5, 5).map((x, ix) => ix);

test('array 2D', t => {
    t.plan(4);

});

