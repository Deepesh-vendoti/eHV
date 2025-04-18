# Contributing to eHV (Electronic Health Vault)

Hey SE’s Ace Architects Team for eHV project! Whether you’re coding, fixing bugs, improving the code/UI, enhancing documentation, or building out features, let’s be on this same page.

Guidance for the Dev work will be from ongoing work plan **Digital Health Vault Revised Version $Ongoing (Date).doc / pdf**, which will be in sync to the guidelines set for **Project 3** & our **revised proposal**.

---

## Local Development Setup

Make sure you have Node.js, npm, and Java 17+ installed.

```bash
# Clone the repository
git clone https://github.com/Deepesh-vendoti/eHV.git
cd eHV

# Switch to the shared collaboration branch
git checkout collab-phase-1

# Install root and frontend dependencies
npm install
cd frontend && npm install

# Start backend (Spring Boot)
cd ../backend
./mvnw spring-boot:run

# Start frontend (React)
cd ../frontend
npm run dev 

Types of Contributions

Code as per our plan for Features

Improve security or validation

Fix existing issues or bugs

Fix typos / Improve documentation

Add unit or integration tests

Suggest UI/UX improvements

Branch & Commit Related Processes

# Branch from collab-phase-1
git checkout collab-phase-1
git pull
git checkout -b feature/your-change

# Commit changes
git add .
git commit -m 'Update: Added xxxxx for xxxxx'
git push origin feature/your-change

# Use conventional commit prefixes:Update:, fix:, docs:, refactor: etc.

PR Processes

Let's keep PRs focused (1 topic per PR)

Describe what you changed and why

Tag @Deepesh-vendoti and @MedhaMadhusudhan for review

Run locally and confirm both frontend (port 4152) and backend (port 8080) work together

Note: This FE port was as per custom port settings with @deepesh, but adapt as  needed.

API Testing as per your own comfrot and also Swagger UI is considered for this project if you're comfortable using that.

For Any Queires / Troubleshooting

Team Members:@MedhaMadhusudhan @Deepesh-vendoti

 
