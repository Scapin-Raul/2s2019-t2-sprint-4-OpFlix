import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage, Image, Switch } from 'react-native';

class Login extends Component {

    static navigationOptions = {
        header: null,
    };


    constructor(props) {
        super(props);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state = {
            email: 'ra@gmail.com',
            senha: '123456',
            // email: '',
            // senha: '',
            mensagemErro: '',
            showPassword: true,
        }
    }

    componentWillMount(){
        this._verificacao();
    }
    
    _verificacao = async() => {
        if(await AsyncStorage.getItem('@opflix:token') != null){
            this.props.navigation.navigate("Main");
        }
    }

    toggleSwitch() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    _realizarLogin = async () => {
        // console.warn(this.state.email + ' - ' + this.state.senha)
        await fetch('http://192.168.4.203:5000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha
            })
        })
            .then(resposta => resposta.json())
            .then(data => this._irParaHome(data.token))
            .catch(erro => console.warn('AAAAA' + erro))
    }

    _irParaHome = async (tokenRecebido) => {
        if (tokenRecebido != null) {
            try {
                await AsyncStorage.setItem('@opflix:token', tokenRecebido);
                this.props.navigation.navigate("Main");

            } catch (error) {

            }
        } else {
            this.setState({ mensagemErro: "Email ou senha inválidos, tente novamente." })
        }
    }

    _redirecionarCadastro = () => {
        this.props.navigation.navigate("Cadastro");
    }

    render() {
        return (
            <View style={styles.content}>
                <Image
                    source={require('../assets/img/kkkkkkkkkkkkkklogo.png')}
                    style={styles.logo}
                />
                <View style={styles.inputs}>
                    <Text style={styles.titulo}>Login</Text>
                    <Text style={styles.mensagemErro}>{this.state.mensagemErro}</Text>
                    <TextInput placeholder="Email" value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        style={styles.conteudo}
                    />

                    <View>
                        <TextInput placeholder="Senha"
                            onChangeText={senha => this.setState({ senha })}
                            style={styles.conteudo}
                            password={true}
                            secureTextEntry={this.state.showPassword}
                        />
                        <Switch
                            style={styles.switch}
                            onValueChange={this.toggleSwitch}
                            value={!this.state.showPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={this._realizarLogin}
                    // style={styles.conteudo}
                    >
                        <Text style={styles.textoBotao}>Login</Text>
                    </TouchableOpacity>

                    <Text onPress={this._redirecionarCadastro} style={styles.cadastro} >Não tem conta? <Text style={styles.sublinhado}> Cadastre-se agora </Text> </Text>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    switch: {
        position: 'absolute',
        bottom: 10,
        left: '85%'
    },
    cadastro: {
        marginTop: 5,
        fontSize: 15,
        alignSelf: 'center',
    },
    sublinhado: {
        textDecorationLine: 'underline',
    },
    logo: {
        marginTop: 7,
        alignSelf: 'center',
        marginBottom: 20
    },
    titulo: {
        fontSize: 35,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
    mensagemErro: {
        color: 'red',
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 15,
    },
    content: {
        backgroundColor: '#f3f394',
        height: '100%'
    },
    inputs: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#ebe821',
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#380f6b',
    },
    buttonStyle: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#7c1cec',
        marginTop: 15,
        marginBottom: 15,

    },
    textoBotao: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,

    },
    conteudo: {
        marginTop: 15,
        backgroundColor: 'white'
    }
});

export default Login;