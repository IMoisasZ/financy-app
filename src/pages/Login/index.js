/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import connectDatabase from '../../connection/'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Header from '../../components/Header'

connectDatabase.connectDb()

const auth = getAuth()

export default function Login({ navigation }) {
	const [email, setEmail] = useState('moisas@gmail.com')
	const [password, setPassword] = useState('123456')

	const handleLogin = () => {
		try {
			if (!email) {
				return alert('E-mail não informado!')
			}
			if (!password) {
				return alert('Senha não informada!')
			}
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user
					navigation.navigate('Home', { user })
					return user
					// ...
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
				})
		} catch (error) {
			alert('error')
		}
	}

	return (
		<View style={styles.container}>
			<Header
				name='Login'
				showButton={false}
			/>
			<View style={styles.content}>
				<Text style={styles.title}>MizP FINANCY</Text>
				<Input
					placeholder='E-mail'
					type='emailAddress'
					handleOnChange={(e) => setEmail(e.valueOf())}
					value={email}
				/>
				<Input
					placeholder='Senha'
					showPassWord={true}
					type='password'
					handleOnChange={(e) => setPassword(e.valueOf())}
					value={password}
				/>
				<Button
					name='Entrar'
					handleOnPress={handleLogin}
				/>
				<View style={styles.othersButtonView}>
					<TouchableOpacity
						style={styles.othersButton}
						onPress={() => navigation.navigate('User')}>
						<View style={styles.viewButton}>
							<FontAwesome
								name='plus-circle'
								color='#8000ff'
								size={50}
							/>
							<Text style={styles.textOthersButton}>Cadastre-se</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={styles.othersButton}>
						<View style={styles.viewButton}>
							<FontAwesome
								name='key'
								color='#8000ff'
								size={50}
							/>
							<Text style={styles.textOthersButton}>Esqueceu a senha</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 30,
		fontWeight: '500',
		marginVertical: 22,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 14,
	},
	input: {
		borderBottomWidth: 1,
		height: 80,
		textAlign: 'center',
		width: 300,
	},
	othersButton: {
		marginHorizontal: 50,
	},
	viewButton: {
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	textOthersButton: {
		fontWeight: 'bold',
	},
	othersButtonView: {
		flexDirection: 'row',
	},
})
