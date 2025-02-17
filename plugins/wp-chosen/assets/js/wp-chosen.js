jQuery( document ).ready( function ( $ ) {

	/* Options */
	var chosen_options = {
		disable_search_threshold: 13,
		search_contains: true
	};

	/* Targets */
	var chosen_targets =
		'.wp-pretty-filters select'
		+ ', .wp-filter select'
		+ ', .media-toolbar select'
		+ ', .postbox .inside select'
		+ ', .tablenav select'
		+ ', .form-table select'
		+ ', .form-wrap select'
		+ ', .customize-pane-parent select';

	// do not process the select drop down menu if...
	function filter() {
		if(
			!$(this).parents('#edd_price_fields').length && // it is used in EDD for pricing
			!$(this).parents('.mb-right-column').length // it is part of the Profile Builder interface
		) return true;

		return false;
	}

	/* Attach */
	$( chosen_targets ).filter(":visible").filter( filter ).not("[size]").chosen( chosen_options );

	/* Special case the Meta-Box toggle */
	$( document ).on( 'postbox-toggled', function( event, postbox ) {
		$( postbox ).find( 'select' ).filter( filter ).not("[size]")
			.chosen( 'destroy' )
			.chosen( chosen_options );
	} );

	/* Special case the "+ Add New Category" link */
	$( '.taxonomy-add-new' ).on( 'click', function() {
		$( this ).next()
			.find( 'select.postform' )
				.chosen( 'destroy' )
				.chosen( chosen_options );
	} );

	/* Special case the "Publish" meta box "Edit" links */
	$( '.misc-pub-section a' ).on( 'click', function() {
		$( this ).next( 'div, fieldset' )
			.find( 'select' )
				.chosen( 'destroy' )
				.chosen( chosen_options );
	} );

	/* Special case the "Publish" meta box "Edit" links */
	$( document ).on( 'bp-xprofile-show-options', function( e, forWhat ) {
		$( '#' + forWhat ).find( 'select' )
			.chosen( 'destroy' )
			.chosen( chosen_options );
	} );

	/* Special case the "Display Name" magic */
	$( '#first_name, #last_name, #nickname' ).on( 'blur', function() {
		$( '#display_name' ).trigger( 'chosen:updated' );
	} );
} );
