# zkScholar

**Privacy-Preserving Tech Grant Verification on the Midnight Network**

[![Midnight Network](https://img.shields.io/badge/Network-Midnight-blueviolet?style=for-the-badge)](https://midnight.network)
[![Language](https://img.shields.io/badge/Language-Compact-orange?style=for-the-badge)](https://midnight.network)
[![Tested With](https://img.shields.io/badge/Tested%20With-Vitest-yellow?style=for-the-badge)](https://vitest.dev)
[![State](https://img.shields.io/badge/Level-4%20Complete-success?style=for-the-badge)](#)
[![CI](https://github.com/Aman-Raj-bat/zkScholar/actions/workflows/ci.yaml/badge.svg)](https://github.com/Aman-Raj-bat/zkScholar/actions/workflows/ci.yaml)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/Aman-Raj-bat/zkScholar&root=frontend)

---

## Abstract

zkScholar is a decentralized application (dApp) engineered on the **Midnight Network** utilizing the **Compact** smart contract language. The platform serves as a Zero-Knowledge (ZK) eligibility gate for tech grants. It allows students to cryptographically prove that they meet stringent academic and financial requirements (such as minimum CS aptitude score, coding hours, and maximum family income) without ever exposing their raw, sensitive data to centralized portals, grant boards, or the public blockchain ledger.

---

## Table of Contents

1. [Official Submission Links](#official-submission-links)
2. [Architectural Overview](#architectural-overview)
3. [Zero-Knowledge Privacy Model](#zero-knowledge-privacy-model)
4. [Smart Contract Implementation](#smart-contract-implementation)
5. [Hackathon Progression (Levels 1-4)](#hackathon-progression-levels-1-4)
6. [Project Showcase & Verification Proofs](#project-showcase--verification-proofs)
7. [Local Development & Setup Guide](#local-development--setup-guide)

---

## Official Submission Links

- **Live Application (Vercel):** [INSERT_YOUR_LIVE_APP_LINK_HERE]
- **Deployed Contract (Midnight Preprod):** [INSERT_YOUR_PREPROD_CONTRACT_ADDRESS_HERE]
- **Demo Video Presentation:** [INSERT_YOUR_VIDEO_LINK_HERE]
- **Public Brand Presence (X Profile):** [INSERT_YOUR_X_PROFILE_HERE]

---

## Architectural Overview

zkScholar bridges modern web infrastructure with cutting-edge cryptographic privacy networks.

- **Smart Contract Layer:** Written in Compact (`contracts/zkscholar.compact`), compiled to WebAssembly (WASM) and Zero-Knowledge Intermediate Representation (ZKIR). Deployed on the Midnight Preprod network.
- **Frontend Application Layer:** Built with React, TypeScript, and Vite. Styled using a custom cyber-dark design system via native CSS.
- **Wallet Infrastructure:** Integrated with the `@midnight-ntwrk/dapp-connector-api` to interface directly with the 1AM browser extension wallet for local proof generation and transaction signing.
- **Testing & CI/CD:** End-to-end testing utilizing Vitest and local Docker-based Midnight environments. Automated CI/CD pipelines via GitHub Actions.

---

## Zero-Knowledge Privacy Model

The core value proposition of zkScholar is absolute data privacy for applicants. 

### The Traditional Vulnerability
In legacy systems, students must upload unencrypted, highly sensitive documents (tax returns, university transcripts, national IDs) to centralized databases. These databases are prime targets for data breaches, resulting in severe identity theft.

### The zkScholar ZK Solution
zkScholar eliminates the need for data transmission. Verification is entirely mathematical.

1. **Public State (Ledger Data):** The grant board publishes the eligibility thresholds (`min_cs_score`, `min_coding_hours`, and `max_family_income`) to the public Midnight ledger. These values are fully transparent and verifiable by any observer.
2. **Private Witness (User Data):** The student inputs their actual CS score, coding hours, and family income locally into their browser. These values are designated as "private witnesses" in the Compact circuit.
3. **Local Proof Generation:** The student's browser wallet runs a localized Zero-Knowledge circuit. It checks if the private witness data satisfies the public state thresholds and generates a unique nullifier.
4. **On-Chain Verification:** The wallet submits a cryptographic proof to the Midnight blockchain. The network validators verify the math without ever seeing the underlying private inputs.

**Observer Matrix:**
- **Visible on-chain:** The grant thresholds, the user's public address, the nullifier hash, and the fact that a valid proof was submitted.
- **Hidden permanently:** The student's actual CS score, coding hours, family's actual income, and the exact margin by which they exceeded or missed the threshold.

---

## Smart Contract Implementation

The core logic revolves around a custom Compact smart contract with a series of zero-knowledge circuits ensuring double-claim prevention through nullifiers and state verifications.
For complete details on the contract functions, please refer to the `contracts/zkscholar.compact` source code.

---

## Hackathon Progression (Levels 1-4)

### Level 1: Core Smart Contract
- Toolchain configured (Node 22, Docker, Compact Compiler)
- First Compact contract deployed to Preprod Network

### Level 2: Interactive Frontend
- Midnight Wallet Connector integrated into a React SPA
- Proofs are constructed completely off-chain

### Level 3: Production-Ready dApp
- 11 comprehensive Vitest test suites developed
- Automated CI/CD integration with GitHub Actions
- Full polish and robust error handling built in

### Level 4: Complete Submission
- Fully comprehensive submission spanning all challenge requirements.

---

## Local Development & Setup Guide

### Prerequisites
- Node.js v22
- Docker Desktop
- Midnight Compact Compiler (`compact --version`)

### Quick Start

```bash
git clone https://github.com/Aman-Raj-bat/zkScholar.git
cd zkScholar

# Install all workspace dependencies
yarn install

# Start local Midnight proof-server and node
yarn env:up

# Compile the Compact contract
yarn compile

# Run the comprehensive test suite locally
yarn test:local

# Start the frontend server
cd frontend
npm run dev
```

Remember to gracefully shut down the local network when finished:
```bash
yarn env:down
```

---
**Built by Aman Raj for the Midnight Builder Challenge.**
