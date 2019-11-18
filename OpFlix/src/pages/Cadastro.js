// import React, { Component } from 'react';
// import { StyleSheet, View, Text, AsyncStorage, Image, TextInput, TouchableOpacity, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker'

// class Cadastro extends Component {
//     static navigationOptions = {
//         title: 'Cadastro',
//         headerStyle: {
//             backgroundColor: '#000000',
//         },
//         headerTintColor: '#ffffff',
//         headerTitleStyle: {
//             fontWeight: 'bold',
//             color: '#7c21eb',
//             alignSelf: 'center',
//             fontSize: 25
//         },
//     };


//     constructor() {
//         super();
//         this.state = {
//             nome: null,
//             email: null,
//             senha: null,
//             datanascimento: null,
//             imagem: null
//         }

//     }



//    

//     render() {
//         return (
//             <View>

//                 <TextInput placeholder="Nome" value={this.state.nome}
//                     onChangeText={nome => this.setState({ nome })}
//                 />
//                 <TextInput placeholder="Email" value={this.state.email}
//                     onChangeText={email => this.setState({ email })}
//                 />
//                 <TextInput placeholder="Senha" value={this.state.senha}
//                     onChangeText={senha => this.setState({ senha })}
//                 />

//                 <DatePicker
//                     date={this.state.datanascimento}
//                     mode="date"
//                     showIcon="false"
//                     placeholder="Data"
//                     format="DD-MM-YYYY"
//                     minDate="08-07-1994"
//                     maxDate="01-01-2100"
//                     confirmBtnText="Confirmar"
//                     cancelBtnText="Cancelar"

//                     customStyles={{
//                         dateIcon: {
//                             position: 'absolute',
//                             left: 0,
//                             top: 4,
//                             marginLeft: 0
//                         },
//                         dateInput: {
//                             marginLeft: 36
//                         }
//                     }}

//                     onDateChange={datanascimento => this.setState({ datanascimento })}
//                 />

//                 <Picker
//                     // note
//                     // mode="dropdown"
//                     style={{ width: 120 }}
//                     // onValueChange={this.onValueChange.bind(this)}
//                     selectedValue={this.state.imagem}>
//                     <Picker.item label="Imagem" value="0" />

//                     <Picker.item label='aa'>
//                         <Image source={require('../assets/img/icons/dog.png')} />
//                     </Picker.item>

//                 </Picker>

//                 <TouchableOpacity onPress={() => this._cadastrar()}>
//                     <Text>Cadastrar</Text>
//                 </TouchableOpacity>

//             </View>
//         )
//     }
// }

// export default Cadastro;


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView, TextInput, Picker
} from 'react-native';

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

        this.state = {
            nome: null,
            email: null,
            senha: null,
            datanascimento: null,
            imagem: null
        }

    }


    _cadastrar = () => {

        let usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            datanascimento: this.state.datanascimento,
            imagem: this.state.imagem
        };

        console.warn(usuario)
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput placeholder="Nome" value={this.state.nome}
                    onChangeText={nome => this.setState({ nome })}
                />
                <TextInput placeholder="Email" value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput placeholder="Senha" value={this.state.senha}
                    onChangeText={senha => this.setState({ senha })}
                />

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
                </View>

                <TouchableOpacity onPress={() => this._cadastrar()}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>

            </View >
        );
    }



    _dropdown_2_renderButtonText(rowData) {
        const { name } = rowData;
        this.setState({ imagem: rowData })
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
    container: {
        flex: 1,
    },
    dropdown_2: {
        alignSelf: 'flex-end',
        width: 200,
        // marginTop: 32,
        right: 8,
        borderWidth: 0,
        borderRadius: 3,
        backgroundColor: 'cornflowerblue',
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
