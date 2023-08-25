import express from 'express'
import { HelloService } from './services/HelloService'

const port = 3000

express()

    .get('/', (request, response) => {

        const result = new HelloService().sayHello('world')

        response.send(result)
    })
    .listen(port, () => {
 
        console.log(`Server running at port ${port}`)
    })