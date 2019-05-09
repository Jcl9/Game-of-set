# CreativityOverFlowProject5
JavaScript Game of Set
-----------------------------------

## General Info:
Note to the grader: For reasons unknown to us, the AddEventListener() function would not work no matter what we did so that's why all of our events are done inline in the HTML document.

When the code was copied+pasted into a CodePen project (online HTML/CSS/JS), the EventListeners worked as intended but would not work on Ubuntu.

## How to Run our Program:
Have Middleman and it's corresponding gems installed:

1. Make sure you have installed bundler, if not, please install it:
```
gem install bundler
```
2. Install the required gems:
```
bundle install
```
3. Install middleman:
```
gem install middleman
```

make sure that you are in the /project5/ folder
run the following commands:
```
bundle exec middleman server
```
follow the link that it gives:

* Click on "Computer Disabled" to enable comp and vise versa

* Click on the "Human PLayers" button to toggle the number of  players

* Once you selected the players to your liking, click on "Start Game"

* Click on "Player 1" if player 1 found the set..."PLayer 2" if player 2 found the set... etc,

* Select the cards that show up and click on "Verify" to check if they form a set

* Click on "New Game" to restart and go back to selecting options

* Follow the directions that the game provides via window alerts (Window Alerts must be enabled for the game to function properly


### Who Did What?

##### Ron: Most of the CSS, Event Handlers + Event functions, Core game functionality, updated UI
  
#### Jincheng: initial UI, initial CSS, initial project skeleton

#### Alex: Created Card and Deck Objects and corresponding methods

#### Kathryn: Player + Computer functionality, Rules
