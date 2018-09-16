import { Component, h } from 'preact';
import { neighbouringIndexes } from '../tools/Array2D';
import { Tile } from './Tile';
import { toggle, flatten } from '../tools/array';

export class Board extends Component<any, any> {

    rippled = [] as any[];

    state = {
        revealed: [] as any[],
        flagged: [] as any
    }

    handlers = ix => ({
        reveal: () => {
            const hasBomb = this.props.minefield[ix];
            const landRevealed = this.landRevealed[ix];

            if (hasBomb) {
                this.props.bombRevealed();
            }

            return this.setState({
                ...this.state,
                revealed: [...this.state.revealed, ...landRevealed]
            });
        },

        toggleFlag: () => {
            const flagged = toggle(this.state.flagged, ix);
            this.setState({ ...this.state, flagged });
        }
    })

    get landRevealed() {
        const f = (hasBomb_, index_) => {
            let rippled = [] as any;

            const g = (hasBomb, index) => {
                const blank = this.adjacentBombs[index] === 0 && !hasBomb;
                const notRippled = !rippled.includes(index);
                rippled.push(index);
            
                if (blank && notRippled) {
                    const ixs = neighbouringIndexes(this.props.minefield)(index)
                        .filter(ix => !this.rippled.includes(ix))
                        .filter(ix => !hasBomb)
                        .map(ix => {
                            if (this.adjacentBombs[ix]) {
                                rippled.push(ix);
                            }
    
                            return g(this.props.minefield[ix], ix)
                        });
                        
                    const r = flatten(ixs);
                        
                    return r
                } else {
                    const rr = [index]
    
                    return rr;
                }
            }

            return g(hasBomb_, index_);
        }

        const r = this.props.minefield.map((hb, ix) => [ix, ...f(hb, ix)])

        return r;
    }

    componentDidUpdate() {
        if (this.onlyBombsToReveal && this.props.active) {
            this.props.cleared();
        }
    }

    render() {        
        return (<div
            class="board"
            edgeX={this.props.minefield.edgeX}
            edgeY={this.props.minefield.edgeY}
        >
            {this.tiles.map((tile, ix) => <Tile {...this.handlers(ix)} {...tile}></Tile>)}
        </div>);
    }

    get tiles() {
        return this.props.minefield
            .map((t, ix) => ({
                revealed: this.state.revealed.includes(ix),
                flagged: this.state.flagged.includes(ix),
                hasBomb: t,
                adjacentBombs: this.adjacentBombs[ix],
                landRevealed: this.landRevealed[ix],
                active: this.props.active
            }))
    }
        
    get adjacentBombs() {
        const countAdjacentBombs = (index) => {
            const ixs = neighbouringIndexes(this.props.minefield)(index);
            const bombs = ixs.map(ix => this.props.minefield[ix]);
            const n = bombs.reduce((a, x) => a + x, 0);
    
            return n;
        }

        return this.props.minefield.map((_, ix) => countAdjacentBombs(ix));
    }

    get onlyBombsToReveal() {
        return this.props.minefield
            .filter((x, ix) => !this.state.revealed.includes(ix))
            .every(x => x);
    }
}