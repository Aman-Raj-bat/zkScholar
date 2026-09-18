# zkScholar — Product Idea Proposal

## The Problem
Today, scholarship eligibility forms require applicants to upload sensitive documents (tax returns, transcripts). These are stored on centralized servers and are vulnerable to breaches.

## The Solution
zkScholar uses Zero-Knowledge Proofs to let students prove they meet eligibility criteria (CS aptitude, coding hours, family income) without revealing the underlying data.

## How It Works
1. Scholarship board sets criteria on-chain (e.g., CS score >= 750)
2. Student enters their private data in the browser
3. ZK proof is generated locally
4. Only the proof (not the data) is submitted to the Midnight blockchain
5. The nullifier prevents the same student from claiming twice

## Target Users
- Tech grant applicants
- University scholarship offices
- Coding bootcamp bursaries

## Business Model
- B2B SaaS: institutions pay per verification
- Open-source protocol, closed API layer

## Level 3 Submission
This dApp is deployed on Midnight Preprod and verified end-to-end.
