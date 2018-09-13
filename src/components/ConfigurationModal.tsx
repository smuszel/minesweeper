import { Component, h } from 'preact';

export class ConfigurationModal extends Component<{ minefield: string }, any> {
    
    render() {
        console.log(this.props);

        return (
            <input value={this.props.minefield} type="text"/>
        );
    }
}