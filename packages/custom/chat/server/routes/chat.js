'use strict';

var chat = require('../controllers/chat');

// The Package is past automatically as first parameter
module.exports = function(Chat, app, auth, database) {

	  app.route('/chat')
	    .get(chat.all)
	    .post(auth.requiresLogin, chat.create);

};
