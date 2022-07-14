const express = require('express')
const {Server : IOServer} = require('socket.io')
const path = require('path')
const fs = require('fs')
const app = express()

const productsCommands = require('./models/product_model')
const messagesCommands = require('./models/chat_model')

const serverExpress = app.listen(8080, (err)=>{
    if (err){
        console.log(`Hubo un error ${err}`)
    }else{
        console.log('Servidor escuchando puerto: 8080')
    }
})
const io = new IOServer(serverExpress)
const products = []
let messages = []

app.use(express.static(path.join(__dirname, './public')))



io.on('connection', socket =>{
    console.log(`Se conectó un usuario ${socket.id}`)
    messagesCommands.createDBChat()
    productsCommands.createDBProducts()

    productsCommands.getProducts()
    .then(x=> io.emit('server:product', x));

    messagesCommands.getMessages()
    .then(x=> io.emit('server:message', x));
    

    io.emit('server:message', messages)
    socket.on('client:product', productInfo =>{
        const product = productInfo
        productsCommands.insertProduct(product)
        productsCommands.getProducts()
        .then(x=> io.emit('server:product', x));
    })
    socket.on('client:message', messageInfo =>{
        const tiempoTranscurrido = Date.now()
        const hoy = new Date(tiempoTranscurrido)
        const fecha= hoy.toLocaleDateString()
        const tiempo = new Date()
        const argHora=tiempo.toLocaleTimeString('it-IT')
        messageInfo.date = `${fecha}, ${argHora}`
        messagesCommands.insertMessage(messageInfo)
        messagesCommands.getMessages()
        .then(x=> io.emit('server:message', x));
    })
})


