import React, {Component} from 'react';
import {  StyleSheet, View, Text, Image, Button, } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class Main extends Component{
  
    constructor(){
        super();
        this.state = {
            listaPlataformas: [],
            listaLancamento: [],
        };
    }

    componentDidMount(){
      this._buscarCategorias();
      this._buscarTitulosPadrao();
    }

    _buscarCategorias = async ()=>{ 
        await fetch('http://192.168.4.203:5000/api/Plataformas')
        .then(response => response.json())
        .then(data => this.setState({listaPlataformas: data}))
        .catch(error => console.warn(error));
        // console.warn(this.state.listaPlataformas);
    }
    
    _getParsedDate = (date) =>{
        date = String(date).split('T');
        var days = String(date[0]).split('-');
        return [days[2].toString() +'/'+ days[1].toString()+'/'+ days[0].toString()];
    }

    _buscarTitulosPadrao = async () =>{
        await fetch('http://192.168.4.203:5000/api/Titulos')
        .then(response => response.json())
        .then(data => this.setState({listaLancamento : data}))
        .catch(error => console.warn(error));
        // console.warn(this.state.listaLancamento);
    }
    

    render(){
        return(
            <View style={styles.background}>
                <View style={styles.header}>
                    <Button
                    title='<-'
                    style={{length: 25, height: 25}}
                    onClick={ this.props.navigation.navigate('DrawerOpen')}/>
                    <Text>Filtrar aqui</Text>
                    
                    

                    <Image
                    source={require('../assets/img/kkkkkkkkkkkkkklogo.png')}
                    style={styles.logo}
                    />
                </View>

                <Text style={styles.chamadaMain}>Confira os últimos lançamentos do mundo cinematográfico!</Text>


                
                <FlatList
                data={this.state.listaLancamento}
                keyExtractor={item => item.idTitulo}
                renderItem={({item}) => (
                    <View style={styles.separador}>
                        <Text style={styles.titulo}>{item.nome}</Text>
                        <Text>Sinopse: {item.sinopse}</Text>
                        <Text>Duração: {item.duracao}</Text>
                        <Text>Plataforma: {item.plataforma}</Text>
                        <Text>Categoria: {item.categoria}</Text>
                        <Text>Classificação: {item.classificacao}</Text>
                        <Text>Data de Lançamento: {this._getParsedDate(item.dataLancamento)}</Text>

                    </View>
                )}
                />

            </View>
        
        )
    }
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: "#F2EC91",
    },
    header:{
        backgroundColor: "#000000",
        justifyContent: 'center',
        alignItems: 'center',
    },
    chamadaMain:{
        fontSize: 27.5,
        textAlign: "center",
        marginBottom: 10,
        marginTop: 15,
    },
    logo:{
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    
    titulo:{
        fontSize: 20,
        marginBottom:2,
        marginLeft: 20,
    },
    separador:{
        borderColor:'black',
        borderBottomWidth:1,
        borderTopWidth:1,
        backgroundColor: "#F9F9C9",
        marginBottom: 10,
        padding: 15
    }

  });

export default Main;