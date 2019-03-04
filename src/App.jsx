import { h, Component } from 'preact';
import { Minesweeper } from './components/Minesweeper';
import './App.scss';

class App extends Component {

    state = {
        gameState: 'running',
        edgeX: 5,
        edgeY: 6,
        bombs: 2,
    }

    render() {
        return (
            <div
                class="app"
                gameState={this.state.gameState}
            >
                <Minesweeper
                    active={this.state.gameState === 'running'}
                    lost={() => this.gameState = 'lost'}
                    won={() => this.gameState = 'won'}
                    {...this.state}
                ></Minesweeper>
                <button onClick={() => this.gameState = 'running'}><span></span></button>
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
    