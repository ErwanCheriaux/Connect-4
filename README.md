# Connect-4

### Subject:

As a house owner who wants to secure his house, I want to open my door after winning a Connect4 game. You have to create the API to let me play against my house and also the AI/algorithms to make my home smart.  
[Source](https://n8n.nabucasa.dev/webhook/2ce25dac-e576-4712-826e-97b9f06dc7a2)

### Rules:

-   the board is a 6x7 grid
-   you win when you have 4 tokens connected (columns, rows, diagonals)
-   you can't play twice in a row
-   you cannot undo a move

### Example of display:

Human uses X/House uses O

```
| | | | | | | |
| | | | | | | |
| | | | |O| | |
| | |O|O|X| | |
| |X|O|O|X| | |
|X|O|X|X|O|X| |
```

### Expected delivery:

-   a github private repository, shared with bemble & ludeeus
-   the repository must contain the code
-   your API must run into a docker container, please provide the Dockerfile within the repository
-   please commit regularly to let us understand how you go ahead

### API endpoints:

-   [POST] /game -> start a new game, returns an empty board as displayed before
-   [GET] /board -> returns the current board with the example given
-   [PUT] /token/user/{1-7} -> put a token in the given row and return the board
-   [PUT] /token/house -> make the house play and return the board
-   [POST] /door/open -> returns 403 until you win the game

### Deadline:

-   March 8th 2024

## Postman collection

https://api.postman.com/collections/9721186-bd9db0b1-4020-4d01-adaa-e9460a60e8d5?access_key=PMAT-01HQC7GKDNJB6927GY6193KX4Q
