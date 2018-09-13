import { h, Component } from 'preact';
import { ConfigurationModal } from './components/ConfigurationModal';
import './App.scss';
import { Array2D } from './tools/Array2D';
import { uniquelyRepeatedMap } from './tools/random';
import { Minesweeper } from './components/Minesweeper';

const defEdge = 4
const bombs = 5;
const xs = new Array2D<boolean>(defEdge, defEdge);

xs.items = xs.items.map(_ => false);
xs.items = uniquelyRepeatedMap(x => true)(xs.items)(bombs);
console.log(xs);

class App extends Component {

    state = {
        minefield: xs
    }

    render() {
        console.log(this.state);
        
        return (
            <div>
                <Minesweeper minefield={this.state.minefield}></Minesweeper>
                {/* <ConfigurationModal minefield={this.state.minefield}></ConfigurationModal> */}
            </div>
        );
    }
}
    
export default App;
    