import LoginRepository from '../../Repository/Login'

function userAuth() {
	try {
		return LoginRepository.userAuth()
	} catch (error) {
		console.log(error)
	}
}

export default {
	userAuth,
}
