This is my personal website. There are many like it, but this one is mine.

The website has a landing, a Connect 4 game with an AI, an About Me page, past and present projects, and contact info as well as my resume.

The Connect 4 AI makes moves based on a 4-depth minimax algorithm. The eval function for non it uses can be seen in js/conn4.js; it is named eval(board).

As James D. Allen proved in '88, Connect 4 is fully solved, and the first player can always win, even if the second player plays optimally. It is for this reason that I let the human go first, as the point of the game is to provide the user entertainment - it should be challenging and thought provoking, but not impossible.
