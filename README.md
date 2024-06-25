# Sleep Recorder App

## Description

The application allows users to add sleep records, view recorded data in a table format, and visualize sleep durations over the past seven days using bar charts.

## Setup Instructions

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)
- SQLite (for backend data storage)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/sleep-recorder.git
   cd sleep-recorder

2. **Install dependencies:**

    ```bash
    cd api
    npm install
    cd ..
    cd application
    npm install

3. **Running the application:**

    From the route you can run

    ```bash
    npm run start

    or

    cd api
    npm run init-db
    npm run start

    and in another terminal

    cd application

    npm run start

4. **Access the application:**

    application can be found running on
    http://localhost:3000/

5. **Running tests:**

    ```bash
    cd api
    npm test

    or

    cd application
    npm test
