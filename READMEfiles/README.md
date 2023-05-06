# Frogger
For my first project, I decided to recreate one of my favorite games from adolescence. Frogger was first released in 1981, developed by Konami and produced and released by Sega. I remember playing Frogger on one of the arcade machines at the roller rink just outside of town. Years later, I enjoyed the refreshing remake concept "Crossy Road". The logic seemed intricate, but straightforward and the prospect of a DOM-updating game 

## Wireframe
### Preliminary Sketch, Detailing the Basic Features of the Project
![](Figure_1.png)
### Fully Rendered Gameboard
![](Figure_2.png)
### Example of Gameplay on Easy (Interval, 1500)
![][figure_3.mov]

## Pseudocode
-Set up an intro screen modal with a play button
-Play button toggles the modal to not 'open' and initializes the gameboard.
-The interactive gameboard uses the DOM to link HTML DIV elements to a JS array of arrays. 
-The board is set/colored-in using a for loop to iterate through the array of arrays. At each of these iterations, a function is called, which iterates through the array at the corresponding index. The numbers at each of the indexes correspond to a color as recorded in the colors object. The CSS background-color for each of the divs is updated accordingly. 
-Initialization also sets off a set-interval, which pushes and unshifts the 'river' arrays to create a dynamic board. 
-A frogger object is used to keep track of important properties (such as frogger.row, frogger.column, frogger.previousColor, and frogger.life)
-When frogger jumps to a new square (using keyboard event listeners) the color of that square is first recorded so that it can be replaced when Frogger leaves. The exact sequence of events is recorded using notes in the node.js file.
-To 'score' the game, a checkScore() function is passed along inside the riverInterval, which checks for two conditions: 
1. if Frogger.life === 0. When Frogger jumps to a new square, frogger.life is multiplied by number of the square. So long as Frogger does not jump into the water (which is designated by a 0), frogger may keep playing! 
2. if there is not a -1 representing frogger in any of the arrays. Frogger can be shifted or popped out of one of the river arrays as the interval moves the 'lily-pads' through the arrays; thus, if Frogger had not jumped in time, he would be removed from the array, thereby ending the game.
-Modal screens are popped 'toggled' on by different game inputs. If Frogger is swept away, a modal will appear with a 'try again' button. Intervals are cleared and reset each time a game ends. Likewise there is a modal screen 

## Technologies
-This project required use of HTML, CSS, and JavaScript.

## Future Updates
***Future Updates***
-Add a scroll feature and random map generator that pushes newly, randomnly generated row arrays into the map array. 
-Add a score counter that goes up for each new row frogger makes it through a level. 
-Add a third row type for a street that frogger must go through. The logic rules would be similar to the regular dirt rules in that Frogger can jump anywhere on the roads, however, if one of the 'cars' iterating through the array hits frogger, (i.e. if frogger's space becomes occupied by a car) then Frogger is set = 0  and the game ends. Potential trouble shooting problems: How to keep Frogger in the same position as the array iterates to push the cars through. 