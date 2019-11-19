import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, Image, } from 'react-native';
import { Drawer, Container, Header, Content, Button } from 'native-base';


import jwt from 'jwt-decode'

class Profile extends Component {

  static navigationOptions = {
    tabBarIcon: () => (<Image style={({width: 40, height: 40, tintColor: 'white'})} source={require('../assets/img/user-icon.png')} />)
  
  };


  constructor() {
    super();
    this.state = {
      token: '',
      idUser: 0,
      emailUser: '',
      nomeUser: '',
      dataNascimentoUser: '',
      imagemUser: '',

    }
  }

  componentDidMount() {
    this._buscarDadosDoUsuario();

  }

  _buscarDadosDoUsuario = async () => {
    try {
      const tokenDoStorage = await AsyncStorage.getItem('@opflix:token');

      if (tokenDoStorage != null) {
        this.setState({ token: tokenDoStorage });
        // console.warn(jwt(tokenDoStorage).email)
        this.setState({ emailUser: jwt(tokenDoStorage).email });
        this.setState({ idUser: jwt(tokenDoStorage).jti })

        // console.warn(this.state.token, this.state.idUser,this.state.emailUser)

        await fetch('http://192.168.4.203:5000/api/Usuarios/Buscar', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + this.state.token
          }
        })
          .then(resposta => resposta.json())
          .then(data => this.setState({ dataNascimentoUser: data.dataNascimento, imagemUser: data.imagem, nomeUser: data.nome }))
          .catch(erro => console.warn(erro));
        console.warn(this.state.dataNascimentoUser, this.state.imagemUser);

      };
    } catch (error) { }
  }

  _getParsedDate = (date) => {
    try {
      date = String(date).split('T');
      var days = String(date[0]).split('-');
      return [days[2].toString() + '/' + days[1].toString() + '/' + days[0].toString()];

    } catch (error) {
      return date
    }
  }

  _renderizarImagem = () => {
    let icon = "";

    switch (this.state.imagemUser) {
      case 'Dog':
        icon = require('../assets/img/icons/dog.png')
        console.warn(icon, 'dog');
        break;

      case 'Cat':
        icon = require('../assets/img/icons/cat.png')
        console.warn(icon, 'cat');
        break;

      case 'Cow':
        icon = require('../assets/img/icons/cow.png')
        console.warn(icon, 'cow');
        break;

      case 'Fish':
        icon = require('../assets/img/icons/fish.png')
        console.warn(icon, 'fish');
        break;

      case 'Fox':
        icon = require('../assets/img/icons/fox.png')
        console.warn(icon, 'fox');
        break;

      case 'Lion':
        icon = require('../assets/img/icons/lion.png')
        console.warn(icon, 'lion');
        break;

      case 'Panda':
        icon = require('../assets/img/icons/panda.png')
        console.warn(icon, 'panda');
        break;

      case 'Wolf':
        icon = require('../assets/img/icons/wolf.png')
        console.warn(icon, 'wolf');
        break;

      default:
        icon = require('../assets/img/user-icon.png')
        console.warn(icon, 'default');
        break;
    }

    console.warn(icon);
    return icon;
  }




  render() {
    return (
      <View style={styles.content}>

        <Header style={styles.headerA}>
          <Image
            source={require('../assets/img/kkkkkkkkkkkkkklogo.png')}
            style={styles.logo}
          />
        </Header>
        <Text style={styles.titulo}>{this.state.nomeUser}</Text>
        <Image style={styles.imagem} source={this._renderizarImagem()} />

        <Text style={styles.text}>Email: {this.state.emailUser}</Text>
        <Text style={styles.text}>Data de Nascimento: {this._getParsedDate(this.state.dataNascimentoUser)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#F2EC91',
    height: '100%'
  },

  titulo: {
    fontSize: 35,
    marginTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 10
  },
  imagem: {
    width: 125,
    height: 125,
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: '#ebe821',

    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#380f6b',
  },
  header: {
    backgroundColor: "#000000",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerA: {
    margin: 0,
    padding: 0,
    backgroundColor: 'black',
    width: '100%',
    height: 100
  },
  logo: {
    marginTop: 7,
    // marginRight: 92,
  },

});


export default Profile;