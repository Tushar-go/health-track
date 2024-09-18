# Health Tracking App

## Description

The Health Tracking App is a full-stack application designed to help users (patients) log and track their daily health metrics, including body temperature, blood pressure, and heart rate. The app features an intuitive interface that allows users to add new entries, view their history, and edit or delete past records, ensuring a smooth and efficient user experience.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)



## Features

- **Health Metrics Dashboard**: 
  - Lists all recorded health metrics with options to edit or delete each entry.
  
- **Add Health Record Form**: 
  - Users can easily add new health records, including date, body temperature, blood pressure, and heart rate.
  
- **Health Record Detail Page**: 
  - View detailed metrics of each record with options to edit or delete.
  
- **Search Functionality**: 
  - Search records by date or filter by specific health metrics, with autosearch capability.

## Technologies

- **Frontend**: React, Axios, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB 
- **Deployment**: Vercel


### Prerequisites

- Node.js (v14 or higher)
- npm (or yarn)
- MongoDB for database



# API Endpoints

- **POST** `/health-records`: Create a new health record.
  
- **GET** `/health-records`: Retrieve a list of all health records.
  
- **GET** `/health-records/:id`: Retrieve a specific health record by its ID.
  
- **PUT** `/health-records/:id`: Update a health record.
  
- **DELETE** `/health-records/:id`: Delete a health record.


# Frontend Setup

1. Clone the Repository.
	```
	git clone https://github.com/yourusername/health-tracking-app.git
  cd health-tracking-app/frontend
	```

2. Install Dependencies.
	```bash
	npm install
	```

3. Create Environment Variables: Create a .env file in the frontend directory and add the following.
	```
	REACT_APP_API_URL=http://localhost:5000

	```
4. Run the Development Server.
	```
	npm start

	```

    - The frontend should now be running at http://localhost:3000.


# Backend Setup

1. Open a New Terminal: Navigate to the backend directory.
	```
	cd health-tracking-app/backend
	```

2. Install Dependencies.
	```bash
	npm install
	```

3. Create Environment Variables: Create a .env file in the frontend directory and add the following.
	```
	MONGODB_URI=your_mongodb_connection_string
    PORT=5000

	```
4. Run the Development Server.
	```
	npm run dev

	```    

    - The backend should now be running at http://localhost:5000.