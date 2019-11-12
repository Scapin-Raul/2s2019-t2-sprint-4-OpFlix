import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator,StackViewTransitionConfigs } from 'react-navigation-stack';

import MainScreen from './pages/Main';
import LoginScreen from './pages/Login';


// const AuthStack = createStackNavigator({
//     Login: {screen: LoginScreen, path: './pages/Login'},
//     Main: {screen: MainScreen, path: './pages/Main'},
//     },
//     {initialRouteName: 'Login'});

const AuthStack = createStackNavigator({
    Login: {screen: LoginScreen, path: './pages/Login'},
    Main: {screen: MainScreen, path: './pages/Main'},
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        mode: 'modal',
        defaultNavigationOptions: {
          gesturesEnabled: false,
        }
        }
        );



export default createAppContainer(AuthStack);