# ScholarShield

**Privacy-Preserving Scholarship Verification on the Midnight Network**

[![CI](https://github.com/Aman-Raj-bat/zkScholar/actions/workflows/ci.yaml/badge.svg)](https://github.com/Aman-Raj-bat/zkScholar/actions/workflows/ci.yaml)
[![Midnight Network](https://img.shields.io/badge/Network-Midnight-blueviolet)](https://midnight.network)
[![Level 3](https://img.shields.io/badge/Level-3%20Complete-success)](#)

---

## Official Submission Links

- **Live Application:** [https://scholar-shield-ten.vercel.app/](https://scholar-shield-ten.vercel.app/)
- **Deployed Contract:** [5a9cd8179b54c81863309dcfacd83f8207f0fc35a1ab79cc4ff524b334c8ae1e](https://preprod.midnightexplorer.com/contracts/5a9cd8179b54c81863309dcfacd83f8207f0fc35a1ab79cc4ff524b334c8ae1e)
- **Demo Video:** [Watch on Google Drive](https://drive.google.com/file/d/1YUe91VBOKsM_-cpF4jBO_dhbyJyNmcWX/view?usp=sharing)

---

## Zero-Knowledge Privacy Model

| What is PUBLIC                  | What is PRIVATE (never on-chain)   |
|---------------------------------|------------------------------------|
| min_cs_score threshold          | Applicant's actual CS score        |
| min_coding_hours threshold      | Applicant's actual coding hours    |
| max_family_income threshold     | Applicant's actual family income   |
| Nullifier (prevents double use) | Applicant identity                 |
| total_grants counter            | Any raw credential data            |

---

## Hackathon Levels

### Level 1: Setup and First Contract
- Compact toolchain, Docker, Node.js v22
- `contracts/zkscholar.compact` compiles to ZK circuits
- Deployed to Preprod

### Level 2: Frontend Integration
- Wallet connect via DApp Connector API
- ZK proof generated locally in browser
- Live demo: https://scholar-shield-ten.vercel.app/

### Level 3: Production-Grade dApp
- 11 Vitest tests (circuit logic, state transitions, privacy)
- GitHub Actions CI/CD pipeline
- Polished UI with error states, loading indicators

---

## Local Setup

```bash
git clone https://github.com/Aman-Raj-bat/zkScholar.git
cd zkScholar
yarn install
yarn env:up
yarn compile
yarn test:local
yarn env:down
```

### Frontend
```bash
cd frontend && npm install && npm run dev
```

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Contract | Compact language, Midnight Network|
| Frontend | React 18, TypeScript, Vite        |
| Wallet   | Midnight DApp Connector API       |
| Testing  | Vitest                            |
| CI/CD    | GitHub Actions                    |
| Hosting  | Vercel                            |

---

**Aman Raj** - Midnight Builder Challenge (New Moon to Full)
