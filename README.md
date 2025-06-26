📍 CIT-U Campus Indoor Navigation System (IndoorNav)
An Indoor Navigation System designed for the Cebu Institute of Technology - University campus, developed using React, Spring Boot, MySQL, Firebase Authentication, and Mappedin SDK.

🚀 Project Overview
IndoorNav is a campus navigation system that helps students, faculty, and visitors locate classrooms, offices, and other facilities within CIT-U buildings using indoor maps and real-time positioning.

📂 Repository Structure
📁 IT3412-SystemName
├── 📄 .gitignore
├── 📄 README.md
├── 📂 documents
├── 📂 backend
├── 📂 frontend_web
├── 📂 frontend_mobile

⚙️ Tech Stack
Frontend: React, Firebase Authentication, Mappedin SDK

Backend: Spring Boot, MySQL

Authentication: Firebase (OAuth & JWT)

Version Control: GitHub

🔑 Core Features (MVP)
✅ User Registration and Login (JWT secured)

✅ Firebase Authentication (Email/Password, Google)

✅ User Profile management

✅ Interactive campus map using Mappedin SDK

✅ Indoor navigation (via Mappedin)

![image](https://github.com/user-attachments/assets/94e7fab5-563e-41c5-be88-48b458c52669)


🛠️ Installation
Backend Setup
cd backend
# Import the Spring Boot project into your IDE (e.g., IntelliJ, VS Code)
# Run the Spring Boot application
# Configure your MySQL connection in application.properties

Frontend Setup
cd frontend
npm install
npm start
# The app will run at http://localhost:3000

🔗 Firebase Setup
Setup Firebase project and enable Email/Password Authentication.

Use your Firebase config in your React project.

📡 Mappedin SDK Integration
Map is loaded using mapId and secretkey.
All map interactions and rendering are handled directly in the React frontend.

📦 Database Schema (MySQL)

✅ Figma UI Design
Prototype Link: 

📌 Future Improvements
🔄 Real-time user location sharing via WebSocket

📚 Add POI management backend (admin CRUD)

📱 Mobile app deployment using React Native

👥 Developers
John Michael Baclayon
John David Catulong 

📜 License
This project is for educational purposes at Cebu Institute of Technology - University.

