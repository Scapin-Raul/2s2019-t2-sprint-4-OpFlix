/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Navegacao from './src/index'

console.disableYellowBox = true; //DESABILITA OS CONSOLE COISO

// AppRegistry.registerComponent(appName, () => Drawer);
AppRegistry.registerComponent(appName, () => Navegacao);
