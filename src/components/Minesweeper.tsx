import { Component, h } from 'preact';
import { neighbouringIndexes } from '../tools/Array2D';
import { Tile } from './Tile';
import { toggle, range } from '../tools/array';
import { shuffle } from '../tools/random';

export class Minesweeper extends Component<any, any> {

    revealBatch = [] as any;

    initializeState = () => ({
        bombed: shuffle(this.indexes).slice(0, this.props.bombs),
        revealed: [] as any[],
        flagged: [] as any[]
    })

    state = this.initializeState();

    reveal(ix) {
        const tile = this.tiles[ix];
        if (tile.hasBomb) {
            this.props.lost();
        }

        if (tile.getAdjacentBombs() === 0) {
            this.revealBatch.push(ix);

            tile.getNeighbours().forEach((n) => {
                !this.revealBatch.includes(n.index) && this.reveal(n.index);
            });
        }

        return this.setState(state => ({
            ...state,
            revealed: [...state.revealed, ix]
        }));
    }

    toggleFlag(ix) {
        const flagged = toggle(this.state.flagged, ix);
        this.setState({ ...this.state, flagged });
    }

    componentWillReceiveProps(incomingProps) {
        if (this.props.gameState !== 'running' && incomingProps.gameState === 'running') {
            this.setState(this.initializeState());
            this.revealBatch = [];
        }
    }

    componentDidUpdate() {
        if (this.onlyBombsToReveal && this.props.active) {
            this.props.won();
        }
    }

    render() {        
        return (<div
            class="board"
            edgeX={this.props.edgeX}
            edgeY={this.props.edgeY}
        >
            {this.tiles.map((tile, ix) => <Tile {...tile}></Tile>)}
        </div>);
    }

    get indexes() {
        return range(0)(this.props.edgeX * this.props.edgeY);
    }

    get tiles() {
        const f = neighbouringIndexes(this.props.edgeX)(this.props.edgeY);

        return this.indexes
            .map(index => ({
                index,
                revealed: this.state.revealed.includes(index),
                flagged: this.state.flagged.includes(index),
                hasBomb: this.state.bombed.includes(index),
                active: this.props.active,

                reveal: () => this.reveal(index),
                toggleFlag: () => this.toggleFlag(index),

                getAdjacentBombs: () => f(index).map(ix => this.tiles[ix])
                    .reduce((a, n) => n.hasBomb ? a + 1 : a, 0),
                
                getNeighbours: () => f(index).map(ix => this.tiles[ix])
            }));
    }

    get onlyBombsToReveal() {
        return this.indexes
            .filter((ix) => !this.state.revealed.includes(ix))
            .every(ix => this.state.bombed.includes(ix));
    }
}