# Numerology Analytics Dashboard

A responsive web application built with React.js that calculates comprehensive numerological insights based on a user's Name and Date of Birth. The app supports multiple calculation systems, generates a 135-year dasha timeline, displays a Vedic grid, and provides automated dynamic predictions.

Live Project Link: https://numerology-react-xte7.vercel.app/

## Core Features

- Multi-System Calculations: Users can input their Name and Date of Birth to calculate metrics using Pythagorean, Simple Chaldean, and standard Numerology frameworks.
- Core Number Analytics: Instantly extracts and displays key metrics including the Name Number, Basic Number, and Destiny Number in a structured chart format.
- 135-Year Dasha Timeline: Generates a complete 135-year nested breakdown of Mahadasha (MD), Antardasha (AD), and Pratyantar Dasha (PD).
- Interactive Date Filtering: The dasha chart features a dynamic date filter that defaults to the current date on page load. Selecting any specific date automatically highlights the active row matching that timeframe.
- Advanced Numerology Section: Includes a digital Vedic Grid along with real-time MD, AD, and PD charts.
- Dynamic Predictions: Features automated, text-based numerological interpretations in the advanced section that update automatically whenever the user changes the date filter.
- Responsive Layout: Built with a clean UI structure optimized for smooth navigation across mobile devices, tablets, and desktop screens.

## Tech Stack Used

- Frontend Library: React.js (Functional Components and State Hooks)
- Core Styling: CSS3 (Flexbox, Grid, and Media Queries)
- Hosting and Deployment: Vercel

## Local Setup and Installation

Follow these steps to run the project on your local machine:

1. Clone this repository to your local system:
   git clone https://github.com/shivansh-rajput-01/numerology-react.git

2. Navigate into the project directory:
   cd numerology-react

3. Install all the necessary npm packages:
   npm install

4. Launch the local development server:
   npm start

## How the Application Logic Works

1. Input Handling: The application captures the user's string input for the Name and date object for the Date of Birth.
2. Value Mapping: The internal scripts reduce the input into single-digit root numbers based on the selected numerology methodology (Pythagorean or Chaldean values).
3. Timeline Rendering: A nested loops engine maps out the 135-year dasha intervals into a structured data grid.
4. Active State Tracking: React state hooks track the date filter input. On initial render, it catches the current system date to highlight the present running dasha, and shifts focus dynamically whenever a new date is selected.
