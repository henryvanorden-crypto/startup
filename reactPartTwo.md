An explanation of what I did as part of the "Startup React Phase 2: Reactivity" deliverable because I had too few commits. The only AI I used was to help better explain concepts I would need to understand to be able to implement this deliverable.

make questions show up, make questions 

score, timer, pause/play (hide quiz, stop timer), game end box (stop everything else), scoreboard, login (show username, play/scores tabs)

Login:
    I created a loginUser and createUser function in login.jsx that put the username in localStorage, set the user variable (created in app.jsx with useState) to the username, and navigate to the play page. These are called when the corresponding buttons are pressed (using onClick)

    When no one is logged in, the play and scores page are unavailable. This is acheived by putting {user && } around the links in app.jsx so that they don't show in the header until there is a username stored in user.

    I also created a logout function that removes the user from localStorage and sets the user variable back to null. I put a corresponding logout button in the header. I also displayed the username next to the logout button.

Quiz:
    

Scores:

About:
    no functionality added
