// import { DrawerItems, createDrawerNavigator } from 'react-navigation-drawer';
// import React, {Component} from 'react';
// import LoginScreen from './Login'
// import MainScreen from './Main'
// import {  StyleSheet, View, Text, Image, Button, } from 'react-native';



// class MyHomeScreen extends React.Component {
//     static navigationOptions = {
//       drawerLabel: 'Home',
//       drawerIcon: ({ tintColor }) => (
//         <Text>home</Text>
//       ),
//     };
  
//     render() {
//       return (
//         <Button
//           onPress={() => this.props.navigation.navigate('Notifications')}
//           title="Go to notifications"
//         />
//       );
//     }
//   }
  
//   class MyNotificationsScreen extends React.Component {
//     static navigationOptions = {
//       drawerLabel: 'Login',
//       drawerIcon: ({ tintColor }) => (
//         <Text>LOGIN</Text>
//       ),
//     };
  
//     render() {
//       return (
//         <Button
//           onPress={() => this.props.navigation.goBack()}
//           title="Go back home"
//         />
//       );
//     }
//   }
  
//   const styles = StyleSheet.create({
//     icon: {
//       width: 24,
//       height: 24,
//     },
//   });
  
//   const MyDrawerNavigator = createDrawerNavigator({
//     Home: {
//       screen: MainScreen,
//     },
//     Login: {
//       screen: LoginScreen,
//     },
//   });
  
//   const MyApp = createAppContainer(MyDrawerNavigator);



// import HomeComponent from './Main';
// import LoginComponent from './Login';


// import React, {Component} from 'react';
// import {  StyleSheet, View, Text, Image, Button, } from 'react-native';
// import { Container, Content, Header, Left, Body, Icon} from 'native-base';
// import { DrawerItems, createDrawerNavigator } from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons'

// const MyNavigator = createDrawerNavigator({
//     Home: HomeComponent,
//     Login: LoginComponent
// })

// export default class HomeComponent extends Component{
//     render(){
//         return(
//             <Container>
//                 <Content contentContainerStyle={{
//                     flex:1,
//                     alignItens:'center',
//                     justifyContent:'center'
//                 }}>
//                     <Text>this is the home</Text>
//                 </Content>
//             </Container>
//         )
//     }
// }