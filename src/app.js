import Layer from './components/layer/layer.js';
import './css/common.css';
import './styles/style.css';

const App = function(){
    var dom =document.getElementById('app');
    var layer = new Layer();

    dom.innerHtml=layer.tpl;
}

console.log(12345);

new App();