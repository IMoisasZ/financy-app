import MovimentationRepository from '../../Repository/Movimentation'

function includeMovimentation(data, userId) {
	try {
		return MovimentationRepository.includeMovimentation(data, userId)
	} catch (error) {
		console.log({ error })
	}
}

async function getMovimentation(userId) {
	try {
		return await MovimentationRepository.getMovimentation(userId)
	} catch (error) {
		console.log(error)
	}
}

export default {
	includeMovimentation,
	getMovimentation,
}
