import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const connectDb = () => {
	const firebaseConfig = {
		apiKey: 'AIzaSyAPQ9CP0Sf7feULI2k4zpUpztrP1vOGhE4',
		authDomain: 'mizp-3431b.firebaseapp.com',
		projectId: 'mizp-3431b',
		storageBucket: 'mizp-3431b.appspot.com',
		messagingSenderId: '526062198267',
		appId: '1:526062198267:web:a54793c56e107628293f5e',
		databaseUrl: 'https://mizp-3431b-default-rtdb.firebaseio.com/',
	}
	const app = initializeApp(firebaseConfig)
	return app
}

const connectDatabase = () => {
	const database = getDatabase(connectDb())
	return database
}

// const createDataDatabase = (id, userName, email) => {
// 	const db = connectDatabase()
// 	set(ref(db, `financy/${id}`), {
// 		userName,
// 		email,
// 	})
// }

export default {
	connectDb,
	connectDatabase,
}
