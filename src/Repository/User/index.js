import database from '../../connection/index'
import { ref, set } from 'firebase/database'

async function createUser(id, userName, email) {
	console.log(id, userName, email)
	const db = database.connectDatabase()
	set(ref(db, `financy/${id}`), {
		userName,
		email,
	})
}

export default {
	createUser,
}
