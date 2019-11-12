import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Drawer, Container, Header, Content,Button } from 'native-base';


class SideBar extends Component {
    render(){
        
        return (
                <View>
                        <Text>
                            
                           AESFAWFAFASFASFSA
                        </Text>
                </View>
               );
    } 
};

export default class App extends Component {
  closeDrawer = () => {
      this.drawer._root.close()
  };
  openDrawer = () => {
      this.drawer._root.open()
  };    
  render() {
    return (
        <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <Container>
        <Header>
            <Container style={{flexDirection: 'row'}}>
                    <Icon onPress={() => this.openDrawer()} name="bars" size={30} color="#fff" />
            </Container>
        </Header>


        <Text>asfsafafasf</Text> 
         
        </Container>
      </Drawer>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  
});