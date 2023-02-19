const express = require('express')
const cors = require('cors')
const { submit } = require('./submit')
const { getKeywords } = require('./get-keywords')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5500

app.post('/scrape-keywords', (req, res) => {
	let url = req.body.url
	let selector = req.body.cssSelectors
	getKeywords(url, selector, (kws, heading) => {
		keywords = kws
		res.json({ keywords: kws, heading: heading })
	})
})

app.post('/try-keyword', (req, res) => {
	console.log(`Trying: ${req.body.keyword}`)
	submit(req.body.keyword, req.body.authToken)
		.then(({ correct }) => {
			if (correct) {
				console.log(`CORRECT ANSWER: ${req.body.keyword}`)
				res.json({ correct: true })
			} else res.json({ correct: false })
		})
		.catch(() => res.json({ correct: false, error: 'authToken' }))
})

app.listen(PORT, () => {
	console.log(`Auto answerer listening at http://localhost:${PORT}`)
})
