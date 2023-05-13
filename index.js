/**
 * @format
 */
require('node-libs-react-native/globals.js');
import {AppRegistry} from 'react-native';
import './shim';
import App from './App';
import axios from 'axios';

import {name as appName} from './app.json';

//axios.defaults.baseURL = 'https://drab-cyan-fossa-kilt.cyclic.app';
// axios.defaults.baseURL = 'http://localhost:420';
axios.defaults.baseURL = 'http://192.168.0.110:420';
// axios.defaults.baseURL = 'http://10.135.8.173:420';

AppRegistry.registerComponent(appName, () => App);
