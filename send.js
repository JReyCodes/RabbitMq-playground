#!/usr/bin/env node

//ALL of these comments are a very simplified understanding of the steps and how everything is working here

// so this is requiring amqp which is the actual broker model we are using
var amqp = require('amqplib/callback_api');

//this tells us what server / endpoint were connecting to and the second arg is error handling 
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }

//this creates a channel on the connection i looked into it and the best way to describe it is essentially like a port think of tv channels
    const myChannel = connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
// you define a queue that you are going to be sending messages into 
        var queue = 'hell';

//this is the actual message that we are sending over the queue 
        var msg = 'Hello World!';

// this now taking that channel and its saying this is the queue we are going to be 
        myChannel.assertQueue(queue, {
            durable: false
        });
    //whenever we want to send information to these channels we use the sendtoqueue method define what queue and what were sending
    //the reason we use buffers im pretty sure here is the same reason we use JSON.stringify when we send stuff to a server because among 
    //other containers etc we want to make sure that whatever recieves this can interpret it however.
        myChannel.sendToQueue(queue, Buffer.from(msg));

        //this last console.log is just for a visual representation of the messages coming in and out 

        console.log(" [x] Sent %s", msg);
    });

    //this last piece of functionality is set in place to make sure that whenever you send something over if you close the channel when 
    //a larger message is still being passed through it has time to proccess as well as for a graceful shutdown in general to prevent 
    //errors or missing info

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});