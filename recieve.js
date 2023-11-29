#!/usr/bin/env node

//ALL of these comments are a very simplified understanding of the steps and how everything is working here

// so this is requiring amqp which is the actual broker model we are using
var amqp = require('amqplib/callback_api');

// this tells us what server or endpoint to connect to and the second argument is error handling
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }

// this now creares a channel
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hell';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});