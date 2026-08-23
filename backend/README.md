# Exam Hub — Backend

API backend du projet Exam Hub (gestion d'examens QCM).

**Stack** : Node.js + Express + TypeScript (ESM) + PostgreSQL (`pg`, SQL brut, pas d'ORM).

## Prérequis

- Node.js ≥ 20
- PostgreSQL ≥ 14, avec une base nommée `exam_hub`

## Installation

npm install
cp .env.example .env

## Lancer en développement

npm run dev

## Build / production

npm run build
npm start

## Vérifier que l'API répond

curl http://localhost:3000/api/health
