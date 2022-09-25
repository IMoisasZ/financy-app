import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Header from '../../components/Header/index'
import Balance from '../../components/Balance'
import Moviments from '../../components/Moviments'
import Actions from '../../components/Actions'
import database from '../../connection'
import { ref, child, get } from 'firebase/database'
import userAuth from '../../Service/Login'
import Modal from '../../components/Modal'
import { getAuth, signOut } from 'firebase/auth'

export default function Home({ navigation }) {
	// usestate
	const [userName, setUserName] = useState('')
	const [list, setList] = useState([])
	const [userLoged, setUserLoged] = useState('')
	const [showModal, setShowModal] = useState(false)

	// instance database
	const dbRef = ref(database.connectDatabase())

	// verify user loged
	const userAuthLogin = () => {
		const user = userAuth.userAuth()
		if (!user) {
			return navigation.navigate('Login')
		}
		setUserLoged(user)
		return user
	}

	// get the name of user
	async function getUserName(userId) {
		await get(child(dbRef, `financy/${userId}/userName`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					setUserName(snapshot.val())
				} else {
					console.log('No data available')
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	// get all movimentation about user
	async function getData(userId) {
		await get(child(dbRef, `financy/${userId}/data`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val()
					const newData = []
					for (let key in data) {
						newData.push({
							id: key,
							date: data[key].date,
							label: data[key].label,
							type: data[key].type,
							value: data[key].value,
						})
					}
					setList(newData)
				} else {
					console.log('No data available')
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	// log out
	const auth = getAuth()
	const logOut = () => {
		signOut(auth)
			.then(() => {
				alert('Log out efetuado com sucesso!')
				navigation.navigate('Login')
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const execute = () => {
		const userId = userAuthLogin()
		getUserName(userId)
		getData(userId)
	}

	// getting the information abou data and user
	useEffect(() => {
		execute()
	}, [])

	return (
		<View style={styles.container}>
			<Header
				name={userName}
				showButton={true}
				handlePress={logOut}
			/>
			<Balance
				saldo='9.259,90'
				gastos='-527,00'
			/>
			<Actions
				handleReleases={() =>
					navigation.navigate('Releases', { userName, userLoged })
				}
			/>
			<Text style={styles.title}>Ùltimas movimentações</Text>
			<FlatList
				style={styles.list}
				data={list}
				keyExtractor={(item) => String(item.id)}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <Moviments data={item} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fafafa',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginHorizontal: 14,
	},
	list: {
		marginHorizontal: 14,
	},
})
