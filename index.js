/**
 * @format
 */
require('node-libs-react-native/globals.js');
import {AppRegistry} from 'react-native';
import './shim';
import App from './App';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
