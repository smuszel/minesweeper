import { h, Component } from 'preact';
import { Board } from './components/Board';
import { constructArray2D, neighbouringIndexes } from './tools/Array2D';
import { range } from './tools/array';
import './App.scss';

const edgeX = 5;
const edgeY = 6;
const bombs = 3;
const xs = constructArray2D(edgeX, edgeY, false);
const indexes = range(0)(xs.length);

const bombed = shuffle([].concat(indexes)).slice(0, bombs);

class App extends Component {

    state = {
        indexes: 
        bombed: bombed as any[],
        revealed: [] as any[],
        flagged: [] as any[],
        gameState: 'running'
    }

    render() {
        console.log(this.props.children);

        return (
            <div
                class="app"
                gameState={this.state.gameState}
            >
                <Board
                    active={this.state.gameState === 'running'}
                    bombRevealed={() => this.gameState = 'lost'}
                    cleared={() => this.gameState = 'win'}
                    bombed={this.state.bombed}
                    revealed={this.state.revealed}
                    flagged={this.state.flagged}
                ></Board>
                <button onClick={() => this.gameState = 'running'}>start</button>
                {/* <ConfigurationModal minefield={this.state.minefield}></ConfigurationModal> */}
            </div>
        );
    }

    set gameState(gameState) {
        this.setState({
            ...this.state,
            gameState
        });
    }
}
    
export default App;
    