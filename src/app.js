define(function(require) {
	var MatchBox = require('MatchBox');
	var $alertBtn = $('#alert-btn');
	var $confirmBtn = $('#confirm-btn')
	$alertBtn.on('click', function() {
        new MatchBox().alert({
            'content': 'test'
        });
	});
	$confirmBtn.on('click', function() {
		new MatchBox().confirm({
            'content': 'hello'
        });
	})
});