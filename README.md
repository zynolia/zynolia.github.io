# F1 Betting League Web Application

A modern web application for Formula 1 betting leagues, replacing the traditional spreadsheet-based approach with an interactive, responsive UI.

![F1 Betting League](https://i.imgur.com/TXJ8J3d.png)

## Features

- **Championship Standings**: View overall and race-specific standings
- **Race Results**: Analyze performance across different races with interactive charts
- **Place Bets**: Simple interface for predicting race outcomes with validation
- **User Profiles**: Track your betting history and performance
- **Responsive UI**: Optimized for both desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/f1-betting-app.git
cd f1-betting-app
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser

## How It Works

### Betting Process

1. Navigate to the "Place Bet" section
2. Select an upcoming race
3. Predict the top 10 finishers in order
4. Submit your predictions before the race deadline

### Scoring System

- **Exact position match**: 25 points
- **Driver in top 10 but wrong position**: 10 points
- **Position off by only 1 place**: Extra 5 points

## Project Structure

- `/src/components` - React components for different pages and UI elements
- `/src/types` - TypeScript type definitions
- `/src/data` - Mock data for development

## Future Enhancements

- User authentication and accounts
- Database integration for persistent storage
- Real-time F1 race data integration
- Team and league management
- Mobile app version

## Technologies Used

- React.js
- TypeScript
- Material UI
- Chart.js
- React Router

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## License

This project is licensed under the MIT License - see the LICENSE file for details.
