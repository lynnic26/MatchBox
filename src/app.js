define(function(require) {
	var MatchBox = require('MatchBox');
	var $testBtn = $('#test-btn');
	$testBtn.on('click', function() {
        new MatchBox().alert({
            'content': 'test'
        });
	});
});