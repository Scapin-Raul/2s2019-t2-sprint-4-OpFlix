import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Picker, AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Drawer, Container, Header, Content, Button } from 'native-base';

class Main extends Component {
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    constructor() {
        super();
        this.state = {
            listaPlataformas: [],
            listaLancamento: [],
            listaCategorias: [],
            plataformaSelecionada: '',
            categoriaSelecionada: ''
        };
    }

    componentDidMount() {
        this._buscarTitulosPadrao();
        this._buscarPlataformas();
        this._buscarCategorias();
    }

    _buscarCategorias = async () => {
        await fetch('http://192.168.4.203:5000/api/Categorias/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": "Bearer " + await AsyncStorage.getItem('@opflix:token')
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaCategorias: data }))
            .catch(erro => console.warn(erro));
        console.warn(this.state.listaCategorias);
    }

    _buscarPlataformas = async () => {
        await fetch('http://192.168.4.203:5000/api/Plataformas')
            .then(response => response.json())
            .then(data => this.setState({ listaPlataformas: data }))
            .catch(error => console.warn(error));
        // console.warn(this.state.listaPlataformas);
    }

    _getParsedDate = (date) => {
        date = String(date).split('T');
        var days = String(date[0]).split('-');
        return [days[2].toString() + '/' + days[1].toString() + '/' + days[0].toString()];
    }

    _buscarTitulosPadrao = async () => {
        await fetch('http://192.168.4.203:5000/api/Titulos')
            .then(response => response.json())
            .then(data => this.setState({ listaLancamento: data }))
            .catch(error => console.warn(error));
    }

    _filtrarPlataforma = async (itemValue) => {
        if (itemValue != 0) {
            this._buscarTitulosPadrao;
            this.setState({ plataformaSelecionada: itemValue })

            var listaLancamentoFiltrado = [];
            this.state.listaLancamento.forEach(e => {
                if (e.plataforma == itemValue) listaLancamentoFiltrado.push(e);
            });
            this.setState({ listaLancamento: listaLancamentoFiltrado });
        } else {
            this.setState({ plataformaSelecionada: itemValue })
            this._buscarTitulosPadrao;
            let listaLancamentos = []
            await fetch('http://192.168.4.203:5000/api/Titulos')
                .then(response => response.json())
                .then(data => listaLancamentos = data)
                .catch(error => console.warn(error));

            this.setState({ listaLancamento: listaLancamentos });
        }
    }

    _filtrarCategoria = async (itemValue) => {
        if (itemValue != 0) {
            this._buscarTitulosPadrao;
            this.setState({ categoriaSelecionada: itemValue })

            var listaLancamentoFiltrado = [];
            this.state.listaLancamento.forEach(e => {
                if (e.categoria == itemValue) listaLancamentoFiltrado.push(e);
            });
            this.setState({ listaLancamento: listaLancamentoFiltrado });
        } else {
            this.setState({ categoriaSelecionada: itemValue })
            this._buscarTitulosPadrao;
            let listaLancamentos = []
            await fetch('http://192.168.4.203:5000/api/Titulos')
                .then(response => response.json())
                .then(data => listaLancamentos = data)
                .catch(error => console.warn(error));

            this.setState({ listaLancamento: listaLancamentos });
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={
                    <View style={styles.SideBarView}>
                        <Text>

                            Escolha um filtro kkk
                                </Text>
                        <Picker selectedValue={this.state.plataformaSelecionada} onValueChange={(itemValue) => this._filtrarPlataforma(itemValue)}>
                            <Picker.item label="Plataforma" value="0" />
                            {this.state.listaPlataformas.map(e => {
                                return (<Picker.item label={e.nome} value={e.nome} />
                                )
                            })}
                        </Picker>

                        <Picker selectedValue={this.state.categoriaSelecionada} onValueChange={(itemValue) => this._filtrarCategoria(itemValue)}>
                            <Picker.item label="Categoria" value="0" />
                            {this.state.listaCategorias.map(e => {
                                return (<Picker.item label={e.nome} value={e.nome} />
                                )
                            })}
                        </Picker>
                    </View>}

                onClose={() => this.closeDrawer()}>
                <Container>
                    <Header style={styles.headerA}>
                        <Container style={styles.header}>
                            {/* <Text style={styles.Drawer} onPress={() => this.openDrawer()}>Filtros</Text> */}
                            <Button
                                onPress={() => this.openDrawer()}
                                transparent
                            >

                            <Image
                                source={require('../assets/img/2.png')}
                                style={styles.botao}
                                    />
                            </Button>
                            <Image
                                source={require('../assets/img/kkkkkkkkkkkkkklogo.png')}
                                style={styles.logo}
                            />
                        </Container>
                    </Header>

                    <View style={styles.background}>

                        <Text style={styles.chamadaMain}>Confira os últimos lançamentos do mundo cinematográfico!</Text>

                        <FlatList
                            data={this.state.listaLancamento}
                            keyExtractor={item => item.idTitulo}
                            renderItem={({ item }) => (
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
                </Container>
            </Drawer>
        );
    }
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: "#F2EC91",
    },
    botao:{
        marginTop: 45,
        width:50,
        height:50
    },  
    headerA: {
        width:'100%',
        height: 100,
        // paddingLeft: 70,
        // marginRight: 30,
        // marginLeft: -0,

    },
    header: {
        backgroundColor: "#000000",
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chamadaMain: {
        fontSize: 27.5,
        textAlign: "center",
        marginBottom: 10,
        marginTop: 15,
    },
    titulo: {
        fontSize: 20,
        marginBottom: 2,
        marginLeft: 20,
    },
    separador: {
        borderColor: 'black',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        backgroundColor: "#F9F9C9",
        marginBottom: 10,
        padding: 15
    },
    SideBarView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    Drawer:{
        color: '#7c21eb', 
        // marginLeft: 30
    }

});

export default Main; 