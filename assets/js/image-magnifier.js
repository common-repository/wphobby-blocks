jQuery(document).ready(function($){
		var $zoom;
		$(document).ready(function() {
		// Initiate magnification powers
		$zoom = $('.zoom').magnify({
			afterLoad: function() {
				console.log('Magnification powers activated!');
			}
		});
	    });
});