# Project Specification

## Overview
zkScholar is a Zero-Knowledge eligibility gate for technology grants on Midnight Network.

## Privacy Model

| Data                  | Type            | Visible To     |
|-----------------------|-----------------|----------------|
| min_cs_score          | Public ledger   | Everyone       |
| min_coding_hours      | Public ledger   | Everyone       |
| max_family_income     | Public ledger   | Everyone       |
| total_grants          | Public ledger   | Everyone       |
| nullifiers            | Public ledger   | Everyone       |
| cs_score (input)      | Private witness | No one         |
| coding_hours (input)  | Private witness | No one         |
| family_income (input) | Private witness | No one         |

## Why Midnight?
A transparent chain would expose applicant data on-chain.
Midnight enables verification without revelation via ZK proofs.
