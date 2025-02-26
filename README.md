# Real-Time Multiplayer Tic-Tac-Toe

Welcome to **Real-Time Multiplayer Tic-Tac-Toe**! This is a simple, fun, and interactive implementation of the classic Tic-Tac-Toe game, with real-time multiplayer functionality powered by Firebase Realtime Database. Challenge your friends or play against random opponents in a seamless and responsive game experience.

## Features

- **Real-Time Multiplayer**: Play with a friend or random opponent in real-time.
- **Turn-based Gameplay**: Take turns marking X’s and O’s on the board.
- **Firebase Integration**: Game state is synced in real-time using Firebase Realtime Database.
- **Game History**: Keeps track of each move and displays the game status.
- **Responsive Design**: Optimized for both desktop and mobile.

## Technologies Used

- **Frontend**:
  - **React**: For building the user interface.
  - **Firebase Realtime Database**: For real-time game state synchronization between players.
  - **CSS**: For styling and responsive layout.

- **Backend**:
  - **Firebase Realtime Database**: To store and update game data, including board state, players, and moves.

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/CosminB24/Real-Time-Multiplayer-Tic-Tac-Toe.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Real-Time-Multiplayer-Tic-Tac-Toe
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up Firebase:
   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Create a Firebase Realtime Database instance.
   - Obtain your Firebase config object and add it to a `.env` file in the root directory:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
     REACT_APP_FIREBASE_DATABASE_URL=https://your_database_url.firebaseio.com
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open your browser and go to `http://localhost:3000` to start playing!

## How to Play

1. **Create a Game**: Click the "Creează joc nou" button to create a new game.
2. **Join a Game**: Enter a game ID to join an existing game.
3. **Take Turns**: Players alternate turns, marking X or O on the board.
4. **Win or Draw**: The first player to align three of their marks wins. If all spots are filled without a winner, it's a draw.
5. **Start a New Game**: Once the game ends, you can start a new match or exit.

## Contributing

Contributions are always welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push to your forked repository.
5. Open a pull request to merge your changes into the `main` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- Email: cosminbadea919@yahoo.com
- GitHub: [@CosminB24](https://github.com/CosminB24)
