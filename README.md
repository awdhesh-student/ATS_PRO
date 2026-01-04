# Friendly ATS (Applicant Tracking System)

## Overview

Friendly ATS is a modern, AI-powered web application designed to help job seekers analyze and improve their resumes. By leveraging AI, it provides detailed feedback on how well a resume matches a specific job description, simulating the Applicant Tracking Systems used by employers.

## Features

- **Resume Analysis**: Upload your resume (PDF) along with the Job Description (JD) to get instant AI-driven feedback.
- **ATS Scoring**: Receive a score (0-100) representing your resume's strength against the target job.
- **Detailed Feedback**: Get actionable insights, including "Good" points and "Improvements" needed.
- **Dashboard**: View a history of all your analyzed resumes with their scores and details.
- **Secure Storage**: Resumes and analysis results are securely stored using cloud storage (Puter.js).
- **Authentication**: Integrated user authentication to manage personal resume history.
- **Responsive Design**: A clean, mobile-friendly interface built with Tailwind CSS.

## Tech Stack

- **Framework**: [React v19] via [React Router v7]
- **Language**: [TypeScript]
- **Styling**: [Tailwind CSS v4]
- **State Management**: [Zustand]
- **Backend & AI Services**: [Puter.js] - (handles Auth, KV Storage, File System, and AI inference)
- **PDF Handling**: PDF.js for client-side processing

## Data Storage & Architecture

Friendly ATS operates without a traditional backend database (like SQL or MongoDB). Instead, it utilizes **Puter.js** to provide a serverless, cloud-native storage solution.

### Database (Key-Value Store)

- **Service**: Puter.js Key-Value (KV) Store.
- **Function**: Acts as the primary database for storing metadata.
- **Data Structure**: Stores resume details in a JSON format.
  - **Key**: `resume:{uuid}`
  - **Value**: A JSON string containing the Job Title, Company Name, Feedback Analysis, and paths to stored files.

### File Storage (Blob Storage)

- **Service**: Puter.js File System.
- **Function**: Stores the actual binary files.
- **Usage**:
  - The original PDF resume is uploaded and stored securely.
  - The PDF is converted to an image format for easier processing and visualization, which is also stored in the file system.

## Project Structure

```bash
ATS/
├── app/
│   ├── components/      # Reusable UI components (FileUploader, ATS Score, etc.)
│   ├── lib/            # Utilities and services (Puter.js integration, PDF conversion)
│   ├── routes/         # Application routes (Home, Upload, Resume Details, etc.)
│   ├── routes.ts       # Route definitions
│   └── root.tsx        # Root layout and entry point
├── public/             # Static assets (images, icons)
├── package.json        # Dependencies and scripts
└── vite.config.ts      # Vite configuration
```

## Setup & Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd ATS
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run functionality:**
    This project heavily relies on **Puter.js** for backend services (AI, Storage, Auth). Ensure you have the necessary environment setup or that the library handles the connection automatically via the `usePuterStore` hook.

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

5.  **Build for production:**
    ```bash
    npm run build
    npm start
    ```

## Usage

1.  **Dashboard**: Upon logging in, you will see a list of your previously analyzed resumes.
2.  **New Scan**: Click "Upload Resume" to start a new analysis.
3.  **Form**: Enter the **Company Name**, **Job Title**, **Job Description**, and select your **Resume PDF**.
4.  **Results**: Wait for the AI to process (convert, analyze, score) and view your detailed ATS report.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Serves the built application.
