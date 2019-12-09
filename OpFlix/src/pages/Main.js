import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Picker, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import { Drawer, Container, Header, Content, Button } from 'native-base';

class Main extends Component {
    static navigationOptions = {
        tabBarIcon: () => (<Image style={({ width: 40, height: 40, tintColor: 'white' })} source={require('../assets/img/home-icon.png')} />)
    };

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    constructor() {
        super();
        this.state = {
            listaLancamentosCopia: [],
            // quando clicar no resetar, o valor de listaLancamento vai receber a copia
            listaPlataformas: [],
            listaLancamento: [],
            listaCategorias: [],
            plataformaSelecionada: '',
            categoriaSelecionada: '',
            dataSelecionada: '',
            mensagemErro: '',
        };
    }

    componentDidMount() {
        this._buscarTitulosPadrao();
        this._buscarPlataformas();
        this._buscarCategorias();
    }

    _buscarCategorias = async () => {
        await fetch('http://192.168.4.93:5000/api/Categorias/', {
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
        await fetch('http://192.168.4.93:5000/api/Plataformas')
            .then(response => response.json())
            .then(data => this.setState({ listaPlataformas: data }))
            .catch(error => console.warn(error));
    }

    _getParsedDate = (date) => {
        date = String(date).split('T');
        var days = String(date[0]).split('-');
        return [days[2].toString() + '/' + days[1].toString() + '/' + days[0].toString()];
    }

    _buscarTitulosPadrao = async () => {
        await fetch('http://192.168.4.93:5000/api/Titulos')
            .then(response => response.json())
            .then(data => this.setState({ listaLancamentosCopia: data }))
            .catch(error => console.warn(error));

        this.setState({ listaLancamento: this.state.listaLancamentosCopia })
        this.setState({ mensagemErro: '' })
    }

    _filtrarPlataforma = async (itemValue) => {
        if (itemValue != 0) {
            await this.setState({ listaLancamento: this.state.listaLancamentosCopia })
            this.setState({ plataformaSelecionada: itemValue })

            var listaLancamentoFiltrado = [];
            this.state.listaLancamento.forEach(e => {
                if (e.plataforma == itemValue) listaLancamentoFiltrado.push(e);
            });
            this.setState({ listaLancamento: listaLancamentoFiltrado });

            if (listaLancamentoFiltrado.length)
                this.setState({ mensagemErro: '' })
            else
                this.setState({ mensagemErro: 'Não há titulos neste filtro.' })
        } else {
            this.setState({ plataformaSelecionada: itemValue })
            this.setState({ listaLancamento: this.state.listaLancamentosCopia })
            this.setState({ mensagemErro: '' })
        }
    }

    _filtrarCategoria = async (itemValue) => {
        if (itemValue != 0) {
            await this.setState({ listaLancamento: this.state.listaLancamentosCopia })
            this.setState({ categoriaSelecionada: itemValue })

            var listaLancamentoFiltrado = [];
            this.state.listaLancamento.forEach(e => {
                if (e.categoria == itemValue) listaLancamentoFiltrado.push(e);
            });
            this.setState({ listaLancamento: listaLancamentoFiltrado });

            if (listaLancamentoFiltrado.length)
                this.setState({ mensagemErro: '' })
            else
                this.setState({ mensagemErro: 'Não há titulos neste filtro.' })

        } else {
            this.setState({ categoriaSelecionada: itemValue })
            this.setState({ listaLancamento: this.state.listaLancamentosCopia })
            this.setState({ mensagemErro: '' })
        }
    }

    _buscarPorData = async (date) => {
        console.warn(date, this.state.dataSelecionada);

        await fetch('http://192.168.4.93:5000/api/Titulos/data/' + this.state.dataSelecionada)
            .then(response => response.json())
            .then(data => {
                this.setState({ listaLancamento: data })
                if (data.length)
                    this.setState({ mensagemErro: '' })
                else
                    this.setState({ mensagemErro: 'Não há titulos neste filtro.' })
            })
            .catch(error => console.log(error));
    }

    _deslogar = async () => {
        await AsyncStorage.removeItem('@opflix:token');
        this.props.navigation.navigate("Login");
    }

    _resetar = async () => {
        this.setState({ listaLancamento: this.state.listaLancamentosCopia });
        this.setState({ plataformaSelecionada: 0 });
        this.setState({ categoriaSelecionada: 0 });
        this.setState({ dataSelecionada: null });
    }


    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={
                    <View style={styles.SideBarView}>
                        <Text style={styles.tituloDrawer}>Escolha um filtro kkk</Text>

                        <TouchableOpacity style={styles.resetarBotao} onPress={() => this._resetar()}>
                            <Text style={styles.resetarTexto}>Resetar</Text>
                        </TouchableOpacity>

                        <Picker style={styles.pickers} selectedValue={this.state.plataformaSelecionada} onValueChange={(itemValue) => this._filtrarPlataforma(itemValue)}>
                            <Picker.item label="Plataforma" value="0" />
                            {this.state.listaPlataformas.map(e => {
                                return (<Picker.item label={e.nome} value={e.nome} />
                                )
                            })}
                        </Picker>

                        <Picker style={styles.pickers} selectedValue={this.state.categoriaSelecionada} onValueChange={(itemValue) => this._filtrarCategoria(itemValue)}>
                            <Picker.item label="Categoria" value="0" />
                            {this.state.listaCategorias.map(e => {
                                return (<Picker.item label={e.nome} value={e.nome} />
                                )
                            })}
                        </Picker>

                        <DatePicker
                            style={styles.dataPicker}
                            date={this.state.dataSelecionada}
                            mode="date"
                            showIcon="false"
                            placeholder="Data"
                            format="DD-MM-YYYY"
                            minDate="08-07-1994"
                            maxDate="01-01-2100"
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"

                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}

                            onDateChange={(date) => { this.setState({ dataSelecionada: date }); this._buscarPorData(date); }}
                        />

                    </View>}

                onClose={() => this.closeDrawer()}>
                <Container>
                    <Header style={styles.headerA}>
                        <Container style={styles.header}>
                            <TouchableOpacity
                                onPress={() => this.openDrawer()}
                                transparent
                            >
                                <Image
                                    source={require('../assets/img/2.png')}
                                    style={styles.botao}
                                />
                            </TouchableOpacity>
                            <Image
                                source={require('../assets/img/kkkkkkkkkkkkkklogo.png')}
                                style={styles.logo}
                            />
                            <TouchableOpacity
                                onPress={() => this._deslogar()}
                                transparent
                            >
                                <Image
                                    source={require('../assets/img/logout_icon.png')}
                                    style={styles.botao}
                                />
                            </TouchableOpacity>

                        </Container>
                    </Header>

                    <ScrollView style={styles.background}>

                        <Text style={styles.chamadaMain}>Confira os últimos lançamentos do mundo cinematográfico!</Text>
                        <Text style={styles.mensagemErro}>{this.state.mensagemErro}</Text>

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

                    </ScrollView>
                </Container>
            </Drawer>
        );
    }
}


const styles = StyleSheet.create({
    tituloDrawer: {
        margin: 15,
        color: '#ffffff',
        fontSize: 25,
        alignSelf: 'center'
    },
    resetarBotao: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 15,
        paddingRight: 15,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
    resetarTexto: {

        color: '#000000',
        fontSize: 15,
    },
    pickers: {
        backgroundColor: '#ffffffdd',
        width: '65%',
        alignSelf: 'center',
        marginTop: 10
    },
    dataPicker: {
        width: '65%',
        alignSelf: 'center',
        marginTop: 10
        // backgroundColor : '#ffffffdd'
    },
    logo: {
        marginTop: 7,
        // marginRight: 92,
    },
    mensagemErro: {
        color: 'red',
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 15,
    },
    background: {
        backgroundColor: "#F2EC91",
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
    },
    botao: {
        marginTop: 45,
        width: 50,
        height: 50
    },
    headerA: {
        margin: 0,
        padding: 0,
        backgroundColor: 'black',
        width: '100%',
        height: 100
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
        backgroundColor: '#380f6bdd',
        color: '#ffffff'
    },
    Drawer: {
        color: '#7c21eb',
    }

});

export default Main; 