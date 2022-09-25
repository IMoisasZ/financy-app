import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DatePicker from '../../components/DatePicker'
import { FontAwesome } from '@expo/vector-icons'
import ServiceMovimentation from '../../Service/Movimentation'
import { max } from 'react-native-reanimated'
// import getDataStorage from '../../Utils/asyncStorage'
// import setDataStorage from '../../Utils/asyncStorage'

const schema = yup.object({
	description: yup.string().required('Informe uma descrição para o lançamento'),
	value: yup.number().required('Informe o valor referente ao lançamento'),
})
export default function Releases({ navigation, route }) {
	// useState
	const [type, setType] = useState('Receita')
	const [date, setDate] = useState(new Date())
	const [newId, setNewId] = useState()

	// get the username to page home
	const { userName, userLoged } = route.params

	// control forms with hookform
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	// number of itens on the database
	const newIdFunction = async () => {
		const response = await ServiceMovimentation.getMovimentation(userLoged)
		setNewId(response)
	}

	newIdFunction()

	// function for add a new movimentation
	const handleAdd = (data) => {
		const newData = {
			date: `${date.getDate()}/${
				date.getMonth() + 1 < 10
					? `0${date.getMonth() + 1}`
					: date.getMonth() + 1
			}/${date.getFullYear()}`.toString(),
			id: newId,
			label: data.description,
			type: type === 'Receita' ? 1 : 0,
			value: data.value,
		}
		try {
			ServiceMovimentation.includeMovimentation(newData, userLoged)
			navigation.navigate('Home')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<Header
				name={userName}
				showButton={true}
			/>
			<View style={styles.content}>
				<Text style={styles.title}>Lançamentos</Text>
				<View style={styles.containerType}>
					<View
						style={
							type === 'Receita'
								? [styles.viewType, styles.selected]
								: styles.viewType
						}>
						<TouchableOpacity
							style={styles.plus}
							onPress={() => setType('Receita')}>
							<FontAwesome
								name='plus'
								size={50}
								color='green'
							/>
							<Text style={styles.textBtnTypes}>Receita</Text>
						</TouchableOpacity>
					</View>
					<View
						style={
							type === 'Despesa'
								? [styles.viewType, styles.selected]
								: styles.viewType
						}>
						<TouchableOpacity
							style={styles.minus}
							onPress={() => setType('Despesa')}>
							<FontAwesome
								name='minus'
								size={50}
								color='red'
							/>
							<Text style={styles.textBtnTypes}>Despesa</Text>
						</TouchableOpacity>
					</View>
				</View>
				<DatePicker
					date={date}
					execute={setDate}
				/>
				<Controller
					control={control}
					name='description'
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder='Descrição'
							handleOnChange={onChange}
							value={value}
						/>
					)}
				/>
				{errors.description && (
					<Text style={styles.error}>{errors.description?.message}</Text>
				)}
				<Controller
					control={control}
					name='value'
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder='Valor (R$)'
							handleOnChange={onChange}
							value={value}
							keyBoard='numeric'
						/>
					)}
				/>
				{errors.value && (
					<Text style={styles.error}>{errors.value?.message}</Text>
				)}
				<Button
					name='Incluir'
					handleOnPress={handleSubmit(handleAdd)}
				/>
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
		fontWeight: 'bold',
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerType: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	viewType: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 50,
		marginLeft: 50,
		marginVertical: 20,
	},
	plus: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	minus: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	textBtnTypes: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	error: {
		color: 'red',
	},
	selected: {
		borderRadius: 100,
		borderColor: 'black',
		borderWidth: 1,
		padding: 15,
		backgroundColor: 'rgba(128,0,255,1)',
	},
})
