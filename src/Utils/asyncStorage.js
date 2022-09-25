import AsyncStorage from '@react-native-async-storage/async-storage'

async function setData(value) {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(value, jsonValue)
	} catch (e) {
		console.log(e)
	}
}

async function getData(data) {
	try {
		const jsonValue = await AsyncStorage.getItem(data)
		return jsonValue != null ? JSON.parse(jsonValue) : null
	} catch (e) {
		console.log(e)
	}
}

export default {
	setData,
	getData,
}
