import { Component, h } from 'preact';

export class ConfigurationModal extends Component<any, any> {
    
    render() {
        console.log(this.props);

        return (
            <input value={this.props.minefield} type="text"/>
        );
    }
}