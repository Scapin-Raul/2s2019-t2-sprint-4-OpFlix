import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, TextInput, Switch, KeyboardAvoidingView, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8'];
const DEMO_OPTIONS_2 = [
    { "name": "Cat" },
    { "name": "Cow" },
    { "name": "Dog" },
    { "name": "Fish" },
    { "name": "Fox" },
    { "name": "Lion" },
    { "name": "Panda" },
    { "name": "Wolf" },
];

class Demo extends Component {

    static navigationOptions = {
        title: 'Cadastro',
        headerStyle: {
            backgroundColor: '#000000',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#7c21eb',
            alignSelf: 'center',
            fontSize: 25
        },
    };

    constructor(props) {
        super(props);
        this.toggleSwitch = this.toggleSwitch.bind(this);

        this.state = {
            nome: null,
            email: null,
            senha: null,
            datanascimento: null,
            imagem: null,
            mensagemErro: '',
            showPassword: true,
        }

    }


    toggleSwitch() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    _cadastrar = async () => {

        let usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            datanascimento: this.state.datanascimento,
            imagem: this.state.imagem
        };

        console.warn(usuario)

        await fetch('http://192.168.4.93:5000/api/Usuarios/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha,
                datanascimento: this.state.datanascimento,
                imagem: this.state.imagem
            })
        })
            .then(resposta => {
                if (resposta.status == 200) {
                    // this.setState({ mensagemErro: 'Sucesso' });
                    this.props.navigation.navigate("Login");

                }
                else {
                    this.setState({ mensagemErro: 'Ocorreu um erro' })

                }

            })
            .catch(erro => console.warn('AAAAA' + erro))
    }

    _renderizarImagem = () => {
        let icon = "";

        switch (this.state.imagem) {
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
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                >

                <ScrollView>
                    <Text style={styles.titulo}>Cadastre-se para ter acesso a todas as funções do nosso App! :D</Text>

                    <Text style={styles.mensagemErro}>{this.state.mensagemErro}</Text>

                    <Image style={styles.imagem} source={this._renderizarImagem()} />

                    <TextInput placeholder="Nome" value={this.state.nome} style={styles.input}
                        onChangeText={nome => this.setState({ nome })}
                    />
                    <TextInput placeholder="Email" value={this.state.email} style={styles.input}
                        onChangeText={email => this.setState({ email })}
                    />
                    <View>
                        <TextInput placeholder="Senha" value={this.state.senha} style={styles.input}
                            password={true}
                            secureTextEntry={true}
                            onChangeText={senha => this.setState({ senha })}
                            secureTextEntry={this.state.showPassword}
                        />
                        <Switch
                            style={styles.switch}
                            onValueChange={this.toggleSwitch}
                            value={!this.state.showPassword}
                        />
                    </View>

                    <DatePicker
                        date={this.state.datanascimento}
                        mode="date"
                        showIcon="false"
                        placeholder="Data"
                        format="DD-MM-YYYY"
                        minDate="08-07-1994"
                        maxDate="01-01-2100"
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"

                        style={styles.input}
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

                        onDateChange={datanascimento => this.setState({ datanascimento })}
                    />

                    <View>
                        <ModalDropdown ref="dropdown_2"
                            style={styles.dropdown_2}
                            textStyle={styles.dropdown_2_text}
                            dropdownStyle={styles.dropdown_2_dropdown}
                            defaultValue='Selecione um icone'
                            options={DEMO_OPTIONS_2}
                            renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                            renderRow={this._dropdown_2_renderRow.bind(this)}
                            renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                        />
                        <Text style={{ fontSize: 12.5, textAlign: 'center' }}>Icons made by Freepik</Text>
                    </View>

                    <TouchableOpacity onPress={() => this._cadastrar()} style={styles.buttonStyle}>
                        <Text style={styles.textoBotao}>Cadastrar</Text>
                    </TouchableOpacity>

                </ScrollView>

            </KeyboardAvoidingView>
        );
    }


    _dropdown_2_renderButtonText(rowData) {
        const { name } = rowData;
        this.setState({ imagem: rowData.name })
        return `${name}`;
    }

    _dropdown_2_renderRow(rowData, rowID, highlighted) {
        let name = rowData.name.toLowerCase();
        let icon = "";

        switch (name) {
            case 'dog':
                icon = require('../assets/img/icons/dog.png')
                break;

            case 'cat':
                icon = require('../assets/img/icons/cat.png')
                break;

            case 'cow':
                icon = require('../assets/img/icons/cow.png')
                break;

            case 'fish':
                icon = require('../assets/img/icons/fish.png')
                break;

            case 'fox':
                icon = require('../assets/img/icons/fox.png')
                break;

            case 'lion':
                icon = require('../assets/img/icons/lion.png')
                break;

            case 'panda':
                icon = require('../assets/img/icons/panda.png')
                break;

            case 'wolf':
                icon = require('../assets/img/icons/wolf.png')
                break;
        }

        let evenRow = rowID % 2;
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={[styles.dropdown_2_row, { backgroundColor: evenRow ? 'lemonchiffon' : 'white' }]}>
                    <Image style={styles.dropdown_2_image}
                        mode='stretch'
                        source={icon}
                    />
                    <Text style={[styles.dropdown_2_row_text, highlighted && { color: 'mediumaquamarine' }]}>
                        {`${rowData.name}`}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID == DEMO_OPTIONS_1.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.dropdown_2_separator}
            key={key}
        />);
    }
}

const styles = StyleSheet.create({
    mensagemErro: {
        color: 'red',
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 3,
        marginTop: 2,
    },
    switch: {
        position: 'absolute',
        top: '27.5%',
        left: '75%'
    },
    input: {
        margin: 7.5,
        height: 50,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#380f6b',
        width: '75%',
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
    titulo: {
        fontSize: 20,
        marginTop: 15,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#F2EC91',
        height: '100%',
        flex: 1,
    },
    buttonStyle: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#7c1cec',
        marginTop: 15,
        width: '75%',
        alignSelf: 'center',
    },
    textoBotao: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    imagem: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        // marginTop: 5,
        // marginBottom: 5,
        backgroundColor: '#ebe821',

        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#380f6b',
    },

    dropdown_2: {
        alignSelf: 'flex-end',
        width: 200,
        right: 8,
        borderWidth: 0,
        borderRadius: 3,
        backgroundColor: '#7c1cec',
        alignSelf: 'center'
    },
    dropdown_2_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_2_dropdown: {
        width: 200,
        height: 300,
        borderColor: 'cornflowerblue',
        borderWidth: 2,
        borderRadius: 3,
    },
    dropdown_2_row: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
    dropdown_2_image: {
        marginLeft: 4,
        width: 40,
        height: 40,
    },
    dropdown_2_row_text: {
        marginHorizontal: 4,
        alignSelf: 'center',
        fontSize: 16,
        color: '#000000',
        textAlignVertical: 'center',
    },
    dropdown_2_separator: {
        height: 2,
        backgroundColor: 'cornflowerblue',
    },
});

AppRegistry.registerComponent('Demo', () => Demo);
export default Demo;
