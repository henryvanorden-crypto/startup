An explanation of what I did as part of the "Startup React Phase 2: Reactivity" deliverable because I had too few commits. The only AI I used was to help better explain concepts I would need to understand to be able to implement this deliverable.

make questions show up, make questions 

score, timer, pause/play (hide quiz, stop timer), game end box (stop everything else), scoreboard, login (show username, play/scores tabs)

Login:
    I created a loginUser and createUser function in login.jsx that put the username in localStorage, set the user variable (created in app.jsx with useState) to the username, and navigate to the play page. These are called when the corresponding buttons are pressed (using onClick)

    When no one is logged in, the play and scores page are unavailable. This is acheived by putting {user && } around the links in app.jsx so that they don't show in the header until there is a username stored in user.

    I also created a logout function that removes the user from localStorage and sets the user variable back to null. I put a corresponding logout button in the header. I also displayed the username next to the logout button.

Quiz:
    My quizzes that I will be using in the final version of my website will be from an api. I did not implement that yet but instead created a service.js file that includes the structure that I will need to add the api easily in the future. In the service.js file I created 2 sets of questions to use for now and then I created a function that randomly chooses one of the sets based off of the date, this way everyone gets the same set, but it changes daily.

    In play.jsx, I created score, time, and (boolean) pause variables that I will use in other functions.

    First I created a useEffect block to make the timer count up every second. (I also have code to split the total second into minutes and seconds and display that nicely) Included in that block is a conditional that if pause is true the timer stops counting. 

    I created a play button that changes the pause state and similar to how I made the play and scores pages hidden during login, this hides everything but the play button when pause is true. When pause is false, there is a pause and submit button below the quiz.

    To implement the submit button I need to know what the selected answer and the correct answer are. The correct answer comes from the set in service.js. For the selected answer I had to add this to the radio button: onChange={() => setSelectedAnswer(index)}. Then in my submit function I can compare the selected to the correct and change the score. I also check which question it is to call the endGame function if necessary.


    play, pause, submit, score, time, game end, mock api, mock messages, midnight stuff?

Scores:


About:
    no functionality added
