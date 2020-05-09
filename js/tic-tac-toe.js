const tic_tac_toe = {
    board: ['','','','','','','','',''],
    player_x_wins: 0,
    player_o_wins: 0,
    player_x_element: null,
    player_o_element: null,
    won_message_element: null,
    symbols: {
        options: ['x', 'o'],
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init: function(container, player_x_text, player_o_text, won_message_text){
        this.container_element = container;
        this.player_x_element = player_o_text;
        this.player_o_element = player_x_text;
        this.won_message_element = won_message_text;
    },

    make_play: function(position){
        if (this.gameover){
        	this.restart()
        } else if (this.board[position] !== '') {
        	return false;
        } else {
	        const currentSymbol = this.symbols.options[this.symbols.turn_index];
	        this.board[position] = currentSymbol;
            this.draw();
        const winning_sequences_index = this.check_win_seqs(currentSymbol);
	        if (this.is_game_over()){
	            this.game_is_over();
	        }
	        if (winning_sequences_index >= 0) {
	            this.game_is_over();
	            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
	        } else {
	            this.symbols.change();
            }
            return true;
        }
    },

    stylize_winner_sequence(winner_sequence) {
        const winning_class = 'winner winner--' + winner_sequence.join('-');
        
        winner_sequence.forEach((position) => {
            this
              .container_element
              .querySelector(`div:nth-child(${position + 1})`)
              .classList = winning_class;
          });
        },

    game_is_over: function(){
        this.gameover = true;
        this.symbols.turn_index === 0 ? this.player_x_wins++ : this.player_o_wins++;
        this.won_message_element.innerHTML = 'Jogador '+this.symbols.options[this.symbols.turn_index]+' Ganhou!';
        console.log('GAME END '+this.symbols.options[this.symbols.turn_index]);
    },

    is_game_over() {
        return !this.board.includes('');
    },

    start: function(){
        this.won_message_element.innerHTML = ''; 
        this.board.fill('');
        this.draw();
        this.gameover = false;

    },

    restart() {
        if (this.is_game_over() || this.gameover) {
            this.start();
            console.log('this game has been restarted!')
        } else if (confirm('Are you sure you want to restart this game?')) {
            this.start();
            console.log('this game has been restarted!')
        }
    },

    check_win_seqs: function(symbol){
        for (i in this.winning_sequences){
            if(this.board [this.winning_sequences[i][0]] == symbol &&
               this.board [this.winning_sequences[i][1]] == symbol &&
               this.board [this.winning_sequences[i][2]] == symbol){
                    console.log('Sequencia vencedora: '+ i);
                    return i;
               }
        };
        return -1;
    },

    draw: function(){
        let content = '';

        for (i in this.board) {
            content += '<div onclick="tic_tac_toe.make_play(' + i + ')">' + this.board[i] + '</div>';
        }

        //this.container_element.innerHTML = content;
        this.container_element.innerHTML = this.board.map((element, index) => `<div onclick="tic_tac_toe.make_play('${index}')"> <span class="game-symbol game-symbol--${element}"></span> </div>`).reduce((content, current) => content + current);
        this.player_x_element.innerHTML = "Vitórias do Jogador X: "+this.player_x_wins;
        this.player_o_element.innerHTML = "Vitórias do Jogador O: "+this.player_o_wins;
    }

};