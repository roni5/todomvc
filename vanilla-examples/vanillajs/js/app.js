(function( window ) {
	'use strict';

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function Todo (name) {
		this.storage = new Store(name);
		this.model = new Model(this.storage);
		this.view = new View();
		this.controller = new Controller(this.model, this.view);
	};

	var todo = new Todo('todos-vanillajs');

	// When the enter key is pressed fire the addItem method.
	$$('#new-todo').addEventListener('keypress', function (e) {
		todo.controller.addItem(e);
	});

	// A delegation event. Will check what item was clicked whenever you click on any
	// part of a list item.
	$$('#todo-list').addEventListener('click', function (e) {
		var target = e.target
		  , el = this;

		/**
		 * Finds the model ID of the clicked DOM element
		 *
		 * @param {object} target The starting point in the DOM for it to try to find
		 * the ID of the model.
		 */
		function lookupId (target) {
			var lookup = target
			while (lookup.nodeName !== 'LI') {
				lookup = lookup.parentNode;
			}
			return lookup.dataset['id'];
		}

		// If you click a destroy button
		if (target.className.indexOf('destroy') > -1) {
			todo.controller.removeItem(lookupId(target));
		}

		// If you click the checkmark
		if(target.className.indexOf('toggle') > -1) {
			todo.controller.toggleComplete(lookupId(target), target);
		}
	});

	$$('#toggle-all').addEventListener('click', function (e) {
		todo.controller.toggleAll(e);
	});

	$$('#clear-completed').addEventListener('click', function () {
		todo.controller.removeCompletedItems();
	});
})( window );
