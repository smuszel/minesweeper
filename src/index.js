import { render, h } from 'preact';
import App from './App';
import './index.scss';

const root = document.createElement('div');
document.body.appendChild(root);
render(<App />, root);
