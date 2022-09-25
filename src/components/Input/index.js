import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default function Input({
	placeholder = 'Nome do input',
	type = null,
	showPassWord = false,
	handleOnChange = null,
	value = '',
	keyBoard,
}) {
	return (
		<TextInput
			style={styles.input}
			placeholder={placeholder}
			textContentType={type}
			secureTextEntry={showPassWord}
			onChangeText={handleOnChange}
			value={value}
			keyboardType={keyBoard}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		borderBottomWidth: 1,
		height: 80,
		textAlign: 'center',
		width: 300,
	},
})
