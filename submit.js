const axios = require('axios')

function submit(keyword, token) {
	return new Promise((resolve, reject) => {
		axios
			.post(
				'https://excelplay-backend-kryptos-xgveswperq-uc.a.run.app/api/submit',
				{ answer: keyword },
				{
					headers: {
						authorization: token,
					},
				}
			)
			.then((res) => {
				if (res.data.answer === 'wrong') resolve({ correct: false })
				else resolve({ correct: true })
			})
			.catch((err) => {
				console.log('ERROR on submit')
				reject()
			})
	})
}

module.exports = { submit }
