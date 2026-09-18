# zkScholar

**Privacy-Preserving Tech Grant Verification on the Midnight Network**

[![CI](https://github.com/Aman-Raj-bat/zkScholar/actions/workflows/ci.yaml/badge.svg)](https://github.com/Aman-Raj-bat/zkScholar/actions/workflows/ci.yaml)
[![Midnight Network](https://img.shields.io/badge/Network-Midnight-blueviolet)](https://midnight.network)
[![Level 3](https://img.shields.io/badge/Level-3%20Complete-success)](#)

---

## Overview

**zkScholar** is a Zero-Knowledge eligibility gate for technology grants built on the Midnight Network. It enables students to cryptographically prove that they meet academic and financial criteria—without ever exposing their actual scores, coding hours, or income.

By leveraging Midnight's robust ZK privacy model, zkScholar ensures that sensitive applicant data never leaves the browser, while the blockchain simply verifies the mathematical proof of eligibility.

---

## Zero-Knowledge Privacy Model

### What is PUBLIC (on-chain, visible to anyone)
- **Thresholds**: Minimum CS aptitude score, minimum coding hours, and maximum family income.
- **Grant Statistics**: Counter for total grants issued.
- **Nullifier Set**: Cryptographic hashes that prove an applicant is claiming for the first time, preventing double-dipping while revealing absolutely nothing about the applicant's identity.

### What is PRIVATE (never on-chain)
- The applicant's *actual* CS score.
- The applicant's *actual* coding hours.
- The applicant's *actual* family income.
- The margin by which the applicant passed or failed the criteria.

### What the User PROVES Without Revealing
- `cs_score >= min_cs_score`
- `coding_hours >= min_coding_hours`
- `family_income <= max_family_income`
- They haven't previously claimed a grant (verified via the nullifier).

---

## Development Milestones

### Level 1: Core Smart Contract
- **Tech Stack**: Compact compiler, Docker, Node.js v22.
- The contract (`contracts/zkscholar.compact`) compiles into ZK circuits.
- Fully deployed to the Midnight Preprod Network.

### Level 2: Interactive Frontend
- Integrated with the **Midnight DApp Connector API** for seamless wallet connection.
- ZK proofs are generated *locally* in the user's browser, ensuring absolute data privacy.

### Level 3: Production-Ready dApp
- **Testing**: Comprehensive Vitest test suite covering circuit logic, state transitions, and privacy controls.
- **CI/CD**: Fully automated GitHub Actions pipeline.
- **UI/UX**: Modern, polished user interface with real-time feedback, loading indicators, and graceful error handling.

---

## Local Development Guide

### 1. Contract & Network Setup

```bash
git clone https://github.com/Aman-Raj-bat/zkScholar.git
cd zkScholar

# Install dependencies
yarn install

# Start the local Midnight proof server and node
yarn env:up

# Compile the Compact contract
yarn compile

# Run the test suite
yarn test:local

# Stop the local network when finished
yarn env:down
```

### 2. Frontend Setup

```bash
cd frontend

# Install frontend dependencies
npm install

# Start the development server
npm run dev
```
Navigate to `http://localhost:5173` in your browser. Ensure you have the **1AM wallet** browser extension installed for Midnight Preprod interaction.

---

## Technology Stack

| Component | Technology |
|---|---|
| **Smart Contract** | Compact Language, Midnight Network |
| **Frontend UI** | React 18, TypeScript, Vite |
| **Wallet Integration** | Midnight DApp Connector API |
| **Testing** | Vitest |
| **CI/CD** | GitHub Actions |
| **Deployment** | Vercel |

---

**Built by Aman Raj** for the Midnight Builder Challenge.
