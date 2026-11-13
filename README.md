# Nouvrix Social Manager

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Status: Production](https://img.shields.io/badge/Status-Production-success.svg)

Nouvrix Social Manager is a robust n8n automation pipeline designed to act as the primary content engine for social media distribution. It handles continuous topic ideation, AI-driven drafting, conditional image routing, and scheduled publishing, all while freezing execution at a secure "Human-in-the-Loop" gateway until explicit manager approval is granted.

## 🔗 Live Demo
- **Live Website:** N/A (Internal Automation Pipeline)
- **Deployment Platform:** n8n (Cloud/Self-Hosted)

## 📌 Project Overview
This repository contains the exported JSON workflows, environment configurations, and setup documentation required to deploy the Nouvrix social media pipeline. It benefits project managers and marketing teams by putting LinkedIn presence on autopilot while keeping the team in complete control of the final output.

### Key Highlights
- **Automated Ideation:** A scheduled cron job triggers an LLM to brainstorm high-converting industry topics and stage them in a Google Sheets database.
- **Human-in-the-Loop Safety:** Utilizes explicit n8n Wait nodes to pause the workflow until a manager reviews the copy and assigns a publication timestamp.
- **Dynamic Image Routing:** Evaluates if a post requires media, securely fetches raw images from Google Drive via HTTP requests, and formats the LinkedIn API payload accordingly.
- **Transparent Audit Logging:** Automatically stamps the exact time of publication and the live LinkedIn URL back into the database to close the loop.

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Workflow Engine** | n8n |
| **AI / LLM Generation** | OpenAI API (gpt-4o) |
| **Database / CRM** | Google Sheets API |
| **Publishing Target** | LinkedIn API |
| **Hosting & CI/CD** | n8n Cloud / Local Desktop App |
| **Version Control** | Git & GitHub |

## 📁 Repository Structure

├── workflows/                  # Exported n8n workflow JSON files
│   ├── brainstormer.json
│   └── publishing_engine.json
├── docs/                       # Architecture diagrams and integration logs
│   ├── architecture_diagram.png
│   └── integration_status.md
├── samples/                    # Synthetic testing data
│   ├── sample-input.json
│   └── sample-output.json
├── .env.example                # Template for API keys & OAuth setup
├── .gitignore                  # Specifies local files Git should ignore
└── README.md                   # Project documentation and setup guidelines

## 🚀 Getting Started

Follow these instructions to run a copy of the project locally for development or testing purposes.

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox, Safari)
- [Node.js](https://nodejs.org/) installed (v18.x or later recommended, if using package managers)
- [Git](https://git-scm.com/) installed on your local machine
- An active n8n instance (Local desktop app or Cloud)

### Installation & Local Setup

1. **Clone the repository:**

    git clone https://github.com/danieldazong/nouvrix-social-manager.git
    cd nouvrix-social-manager

2. **Configure Environment Variables:**
    Duplicate the `.env.example` file, rename it to `.env`, and populate your Google Sheets, OpenAI, and LinkedIn OAuth credentials.

3. **Import Workflows into n8n:**
    Open your n8n workspace, navigate to the workflows dashboard, and select **Import from File**. Select the JSON files located in the `workflows/` folder.

4. **Initialize the Database:**
    Create a new Google Sheet with the exact column headers specified in the client onboarding documentation. Connect your Google credentials to the n8n nodes.

## 📬 Contact & Connect

- **Developer:** Daniel Dazong
- **LinkedIn:** https://www.linkedin.com/in/danieldazong
- **GitHub:** https://github.com/danieldazong
- **Email:** danieldazong08@gmail.com
