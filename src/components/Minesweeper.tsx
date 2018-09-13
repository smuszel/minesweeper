import { Component, h } from 'preact';
import { Array2D } from '../tools/Array2D';

interface P {
    minefield: Array2D<boolean>;
}

export class Minesweeper extends Component<P, any> {

    state = {
        revealed: [] as any[]
    }
    
    renderTile = (tile, index) => {
        const revealed = this.state.revealed.includes(index);
        const cls = revealed ? 'revealed' : 'hidden';
        const handle = ev => this.setState({ revealed: [...this.state.revealed, index] });

        return (
            <div onClick={handle} class={cls}>{`${tile}`}</div>
        );
    }

    render() {
        const board = this.props.minefield.items.map(this.renderTile);
        console.log(this.props.minefield.items)

        return (
            <div>
                minefield:
                {board}
            </div>
        );
    }
}