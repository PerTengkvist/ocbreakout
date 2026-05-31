# Test Spec

I want to create a simple web based clone of the classic game breakout.

## Game rules

1. This means the game takes the player through different levels.
2. In one game, the user has 3 lives.
3. A life is lost when the user has missed the last ball in play 
4. There are 5 different types of bricks:
a) simple brick - hit it once and it gets smashed and disintegrates and gives 10p
b) tough brick - need to hit it 3 times to disintegrate and gives 50p
c) doubleball brick - when hit, the brick disintegrates and drops another ball. and gives 50p
d) bonus brick - when hit, bonus coins drop from the disintegrating brick and the player must catch it with the bar to get the bonus points. and gives 10p for the brick and 200p for the coin if it's catched
e) speedup brick - when hit the brick disintegrates, but the ball speeds up 10% for every bounce until level is complete or life is lost. and gives 250p.




## Splash screen

BREAKOUT written in "breakout" blocks at the Top of the splash screen.
At the bottom of the splashscreen the "Bar" and the "ball" is centered.
The background is a hazy light blue color.
Written in Black with courier font centered vertically and horizontally in the space between the bar+ball and the Breakout bricks:
"Created by Per Tengkvist with ample help from Kvadrats hosted AI model"

## Main screen

1. A high score list with the 5 highest scores (rank, name and points)
2. A "New Game Button"


## Game screen

There shall be 20 game levels created with random selection of brick types based on the following weight:
- 70% simple bricks
- 10% tough bricks
- 10% bonus bricks
- 5% doublebakk bricks
- 5% speedup bricks

The bricks shall for the first 2 levels spell the following words in 8 rows of bricks
1. Kvadrat
2. Tengan

The next 4 levels shall have patterns in 8 rows of bricks resembling 
3. a boat
4. a car
5. a plane
6. a cigarr

The final 14 levels shall have random block pattern placing in max 8 rows


When a level starts the player has the ball on the bar and when the space bar is hit, the ball starts moving up in a random angle of +/- 30 degrees from orthogonal upward angle.
Every time a brick is hit by the ball, a sound is played, different sounds for different brick types.
Every time a the ball hits the bar, a "thump" sound is played.
When the player catches a bonus coin, a rewarding sound is played.
When the player misses a ball - an "error" sound is played
When the player has lost all lives
- a GAME OVER sign comes up
- if the user has a top 5 score, the user is prompted to enter its player name and hit enter

## Architecture
The game shall be executing in the browser, no backend intelligence, just a simple webserver to host static pages.


## README
A full README explaining how to start the game shall be created.