import { h, Component } from 'preact';

export class Tile extends Component {
    
    handle = ev => {
        if (this.props.active) {
            if (ev.button === 0 && !this.props.flagged && !this.props.revealed) {
                this.props.reveal();
            } else if (ev.button === 2 && !this.props.revealed) {
                ev.preventDefault();
                this.props.toggleFlag();
            }
        }
    }

    render() {
        return (
            <div
                class="tile"
                onContextMenu={ev => ev.preventDefault()}
                onMouseDown={this.handle}
                flagged={this.props.flagged}
                revealed={this.props.revealed}
                hasBomb={this.props.hasBomb}
            ><span
                adjacentBombs={this.adjacentBombs}
            ></span></div>
        )
    }

    get adjacentBombs() {
        return this.props.getAdjacentBombs();
    }

    get neighbours() {
        return this.props.getNeighbours();
    }
}