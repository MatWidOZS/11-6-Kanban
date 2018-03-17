$(function() {

	//ID Generator
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			//Components of column
			var $column = $('<div>').addClass('column');
			var $columnTItle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('col-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('+ add a card');

			//Events
			$columnDelete.click(function() {
				self.removeColumn();
			});

			$columnAddCard.click(function() {
				self.addCard(new Card(prompt("Enter the name of the card")));
			});

			//Construction column element
			$column.append($columnTItle)
					.append($columnDelete)
					.append($columnAddCard)
					.append($columnCardList);
			
			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			//Components of card
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('card-delete').text('x');

			//Event
			$cardDelete.click(function() {
				self.removeCard();
			});

			//Combining card elements
			$card.append($cardDelete)
				.append($cardDescription);

			return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	//Board object
	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	//Enable cards moving
	function initSortable() {
		$('.column-card-list').sortable({
			connentWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	//Event listener for button.create-column
	$('.create-column').click(function() {
		var name = prompt('Enter a column name');
		var column = new Column(name);

		board.addColumn(column);
	});

	//Default columns
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	//Adding default columns
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	//Default cards
	var card1 = new Card('Example task 1');
	var card2 = new Card("Create Kanban boards");
	var card3 = new Card('Example task 2');
	var card4 = new Card('Example task 3');

	//Adding default cards
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
	todoColumn.addCard(card3);
	todoColumn.addCard(card4);

});