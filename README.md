# Erciyes-AI-Assisted-Creator

## Project Overview

Erciyes-AI-Assisted-Creator is an AI-powered application designed to automate the creation and posting of social media content. This project is structured with a **Next.js** front-end (client) written in **TypeScript** and a **Node.js** back-end (server). The aim is to streamline social media content production by automatically generating posts and scheduling them across different platforms.

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributers](#contributing)

## Project Structure

The repository is divided into two main folders:

- **client/**: Contains the front-end code developed with React.
- **server/**: Contains the back-end code developed with Node.js.

```bash
root/
│
├── client/                # Next.js front-end
│   ├── public/            # Public assets
│   ├── src/
│   │   ├── app/           # Pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utility
│   └── package.json
│
├── server/          # Node.js back-end
│   ├── src/         # Node.js source files
│   ├── routes/      # API routes
│   └── package.json
│
└── README.md
```

## Technologies

- **Front-end**: Next.js, TypeScript, CSS, HTML
- **Back-end**: Node.js, Express
- **Database**: MongoDB
- **APIs**: Instagram

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/bedii97/Erciyes-AI-Content-Creator.git
   cd Erciyes-AI-Assisted-Creator
   ```
2. Install dependencies for both client and server:

   ```bash
   # For client
   cd client
   npm install

   # For server
   cd server
   npm install
   ```

   ## Usage

### Running the Front-end

1. Navigate to the `client` folder and start the development server:
   ```bash
   cd client
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

### Running the Back-end

1. Navigate to the `server` folder and start the Node.js server:
   ```bash
   cd server
   npm start
   ```
2. The server will run on `http://localhost:5000` (or your chosen port).

   ## Features

- Automatic social media post creation.
- API integration with various social media platforms.
- Scheduling and posting automation.

## Contributers

I would like to express my gratitude to my friends who helped me throughout this project:

- [Kadir Levent](https://github.com/Kadirleventkabadayi): For developing the entire front-end.
- [İbrahim](https://github.com/ibrahimburu): For collaborating with me on the back-end development.
