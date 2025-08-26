# Where-s-Waldo

A simple photo tagging app based on the classic Where's Waldo game.

Technologies used in the backend: Node.js, TypeScript, Express, Prisma with PostgreSQL, Vitest with Supertest.

Technologies used in the frontend: Vite, TypeScript, React, React-Router, TailwindCSS.

The user is first asked to submit a name, only if the player JWT is not found in localstorage, after which the server then sends back a JWT (to ensure integrity) containing a UUID and name, which is then stored in local storage.

When a user selects a game, the server sends back the game data and another JWT, which is used by the server to track the elapsed time.

During a game, users can see a timer to keep track of the elapsed time. When a user clicks anywhere on the image, a dropdown appears, allowing them to select any of the characters in the game. The client then sends normalized coordinates, which the server will then verify, notifying the user whether they have found the character or not.

Once the user has found all characters, the client then auto-submits all characters and their coordinates along with the JWTs to the server for final validation. If all goes well, the server records a new entry in the leaderboard database or updates the entry if it exists.

The dropdown is smart about its positioning; it will place itself left of the cursor if there is no place on the right, and the same goes vertically.

On the leaderboard, the user's score is highlighted.

The app supports dark mode.
