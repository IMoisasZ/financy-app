import UserRepository from '../../Repository/User'

function createUser(id, userName, email) {
	try {
		return UserRepository.createUser(id, userName, email)
	} catch (error) {
		console.log({ error })
	}
}

export default {
	createUser,
}
