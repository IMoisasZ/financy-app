import { getAuth } from 'firebase/auth'

function userAuth() {
	const auth = getAuth()
	const user = auth.currentUser

	if (user) {
		return user.uid
	} else {
		return false
	}
}

export default {
	userAuth,
}
