'use strict'

const Hapi = require('@hapi/hapi')

require('env2')('./.env')

const config = require('./config')
const routesHelloHapi = require('./routes/hello-hapi')

const init = async () => {

    // HOST AND PORT SETTING
    const server = Hapi.server({
        port: config.port,
        host: config.host
    })

    // CREATING A SIMPLE ROUTE
    server.route([
        ...routesHelloHapi
    ])

    // START SERVER
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init();