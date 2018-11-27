/**
 * @author Vitor Silva - https://github.com/VitorCodes
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    bar: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    text: {
        fontSize: 14,
        textAlign: 'center'
    },

    min: {
        textAlign: 'center',
        fontWeight: 'bold',
    },

    max: {
        textAlign: 'center',
        fontWeight: 'bold',
    },

    valueContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },

    valueOuterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    valueInnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    value: {
        textAlign: 'center',
        fontWeight: 'bold',
    },

    touchableArea: {
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'transparent',
    },  
});