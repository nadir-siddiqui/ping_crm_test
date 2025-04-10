# Graph8 Full-Stack Migration Challenge: PingCRM → React + FastAPI

This repository contains a full-stack migration of the open-source PingCRM application. The original Rails app has been completely rebuilt using modern technologies: a React + TypeScript frontend (styled with Tailwind CSS) and a FastAPI + PostgreSQL backend. The goal of this project is to demonstrate clean architecture, sensible technology decisions, and working core CRM functionality.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Backend (FastAPI)](#backend-fastapi)
  - [Frontend (React + Tailwind CSS)](#frontend-react--tailwind-css)
- [Deployment](#deployment)
- [Additional Notes](#additional-notes)

## Overview

This project re-implements core CRM functionalities including:

- **Contact Management**:  
  Create, edit, list, and delete contacts. A contact record includes fields for name, phone, city, and an associated company.
  
- **Company Management**:  
  Create, edit, list, and delete companies, with contacts linked to their respective companies.
  
- **Dashboard & Filtering**:  
  A dashboard page enables users to search contacts by name and filter them by company.

User authentication is not implemented, as the assignment assumes the user is already logged in. AI tools like GitHub Copilot and ChatGPT were used as assistants during development.

## Project Structure

project-root/
├── frontend/                # React + TypeScript frontend
│   ├── public/
│   ├── src/
│   │   ├── api/             # API utility functions (Axios calls)
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (Dashboard, ContactsList, ContactForm, CompaniesList, CompanyForm)
│   │   ├── App.tsx          # Main App component with routing
│   │   └── index.tsx        # Application entry point
│   ├── package.json
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── postcss.config.js    # PostCSS configuration
├── backend/                 # FastAPI backend
│   ├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI app entry point
│   ├── database.py      # Database connection & session management
│   ├── models.py        # SQLAlchemy ORM models for contacts and companies
│   ├── schemas.py       # Pydantic schemas for data validation
│   ├── crud.py          # CRUD operations interacting with the database
│   └── routers/
│       ├── __init__.py
│       ├── contacts.py  # API endpoints for contact management
│       └── companies.py # API endpoints for company management
├── .env                 # Environment variables (e.g., DATABASE_URL)
└── requirements.txt     # Python dependencies for FastAPI


---

## Tech Stack

- **Frontend:**
  - **Framework:** React with TypeScript
  - **Routing:** React Router v6
  - **HTTP:** Axios
  - **Styling:** Tailwind CSS

- **Backend:**
  - **Framework:** FastAPI (Python)
  - **Database:** PostgreSQL (free hosting via Supabase or Neon is recommended)
  - **ORM:** SQLAlchemy
  - **Data Validation:** Pydantic
  - **CORS:** Configured to allow cross-origin requests from the frontend

- **Deployment:**
  - **Frontend:** Deployed on Vercel (free tier)
  - **Backend:** Deployed on Render or Deta (free tier)
  - **Database:** Hosted on Supabase or Neon

---

## Setup Instructions

### Backend (FastAPI)

1. **Clone the Repository & Navigate to the Backend Directory:**

   ```bash
   cd backend
-  On **Windows**:

        python -m venv venv
		venv\Scripts\activate
           
-  On **macOS/Linux**:
 
        python3 -m venv venv source venv/bin/activate
        
-   **Install Python Dependencies:**

		pip install -r requirements.txt

-   **Configure Environment Variables:**
    
    Create a `.env` file in the `backend` folder with your database connection string. For example:
    ```bash
    `DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase` 
    
-   **Set Up the Database:**
    
    Ensure your PostgreSQL server is running and that the specified database exists. Tables are automatically created at startup via:
    ```
    models.Base.metadata.create_all(bind=database.engine)

2.  **Run the Backend Server:**
    
    ```bash
    uvicorn app.main:app --reload
    ```
    
    The FastAPI backend will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000) with interactive docs at http://127.0.0.1:8000/docs.

### Frontend (React + Tailwind CSS)

 **Navigate to the Frontend Directory:**
  
    cd ../frontend
    
 **Install Node.js Dependencies:**
  
    npm install
    npm start

## Deployment

-   **Frontend:**
    
    -   Deploy on Vercel by connecting your GitHub repository.
        
    -   Ensure necessary environment variables (e.g., API endpoint URLs) are set on Vercel.
        
-   **Backend:**
    
    -   Deploy on Render or Deta, and set your environment variables (e.g., `DATABASE_URL`) accordingly.
        
-   **Database:**
    
    -   Use free PostgreSQL hosting services like Supabase or Neon.
        


## Additional Notes

-   **Functionality:**
    
    -   This project includes full CRUD operations for contacts and companies, plus a dashboard with search and filter functionality.
        
-   **Design:**
    
    -   The frontend is styled with Tailwind CSS for a modern, responsive design.
             
-   **Development Tools:**
    
    -  ChatGPT were used during development.    "# ping_crm_test" 
