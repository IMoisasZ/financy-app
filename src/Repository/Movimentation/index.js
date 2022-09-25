import database from '../../connection/index'
import { ref, set, onValue } from 'firebase/database'

const db = database.connectDatabase()
async function includeMovimentation(data, userId) {
	set(ref(db, `financy/${userId}/data/${data.id}`), {
		id: data.id,
		date: data.date,
		label: data.label,
		type: data.type,
		value: data.value,
	})
}

async function getMovimentation(userId) {
	const dataReferency = ref(db, `financy/${userId}/data`)
	const newData = []
	onValue(dataReferency, (snapshot) => {
		const data = snapshot.val()
		if (snapshot.exists()) {
			for (let key in data) {
				newData.push(data[key].id)
			}
		}
	})
	return newData.reduce((a, b) => {
		return Math.max(a, b) + 1
	}, -Infinity)
}

export default {
	includeMovimentation,
	getMovimentation,
}
