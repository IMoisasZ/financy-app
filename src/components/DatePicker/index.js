import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { AntDesign } from '@expo/vector-icons'

export default function DatePicker({ date, execute }) {
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate
		execute(currentDate)
	}

	const showMode = (currentMode) => {
		DateTimePickerAndroid.open({
			value: date,
			onChange,
			mode: currentMode,
			is24Hour: true,
			display: 'default',
		})
	}

	const showDatepicker = () => {
		showMode('date')
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<TouchableOpacity
					style={styles.btnDate}
					onPress={showDatepicker}
					title='Show date picker!'>
					<AntDesign
						name='calendar'
						size={26}
						color='8000ff'
					/>
				</TouchableOpacity>
				<Text style={styles.dateText}>
					{`${date.getDate()}/${
						date.getMonth() + 1 < 10
							? `0${date.getMonth() + 1}`
							: date.getMonth() + 1
					}/${date.getFullYear()}`}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginTop: 20,
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	dateText: {
		fontWeight: '600',
	},
})
