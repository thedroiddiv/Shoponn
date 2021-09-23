import express, { Application, Request, Response } from 'express'
import path from 'path'

const app: Application = express()


// serve static asses if in prodution
app.use(express.static('./client/build'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


app.listen(5000, () => console.log("Node Server started at 5000"))