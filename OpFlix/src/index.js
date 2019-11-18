import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import MainScreen from './pages/Main';
import LoginScreen from './pages/Login';
import ProfileScreen from './pages/Profile'
import CadastroScreen from './pages/Cadastro'


const MainNavigator = createBottomTabNavigator({
  Main: {
    screen: MainScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
},
  {
    initialRouteName: 'Main',
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      inactiveBackgroundColor: '#eeeeee',
      activeBackgroundColor: '#dddddd',
    }

  }
);

const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen, path: './pages/Login' },
  Cadastro: { screen: CadastroScreen, path: './pages/Cadastro' }
},
  {
    initialRouteName: 'Login',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    }
  }
);


export default createAppContainer(
  createSwitchNavigator(
    {
      MainNavigator,
      AuthStack
    }, {
      initialRouteName: 'AuthStack',
    },
  )
);