import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({name='Name button', handleOnPress=null}) {
 return (
    <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text style={styles.textButton}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 22,
        backgroundColor: '#8000ff',
        borderRadius: 10,
        padding: 20,
    },
    textButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500'
    }
})