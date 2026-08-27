# Exam Hub — Frontend (version desktop)
Interface d'administration et d'examens QCM pour **Exam Hub**, développée par
**Alison** (UI/UX + frontend) avec React + Vite + Tailwind CSS.
> Cette base de code utilise des **données factices** (`src/mocks/`, servies
> via `src/services/mockApi.js` avec une latence simulée) en attendant
> l'intégration du vrai backend par **Luciano** (routing/AuthContext/API —
> voir [Points d'intégration](#points-dintégration-avec-luciano)).
## Installation
```bash
npm install
cp .env.example .env
npm run dev
```
L'application démarre sur `http://localhost:5173`.
### Se connecter (mode démo)
Le formulaire de connexion (`/login`) utilise `MockAuthContext` :
| Email                     | Résultat                                   |
| -------------------------- | ------------------------------------------- |
| n'importe quoi contenant `admin` | connecté en tant qu'**administrateur** → `/admin` |
| n'importe quel autre email valide | connecté en tant qu'**étudiant** → `/student` |
| `desactive@examhub.fr`     | erreur « compte désactivé » (RG-11)         |
| champ vide                 | erreur de validation                        |
## Structure du projet
```
src/
  components/
    ui/         Button, Input, Modal, Toast, Spinner, Skeleton, Badge, Table
    layout/     LayoutAdmin, LayoutStudent, LayoutPublic (desktop)
  context/
    MockAuthContext.jsx   mock d'authentification (à remplacer)
    ToastContext.jsx      gestion globale des toasts
  pages/
    admin/      Dashboard, Students, Courses, Exams, Questions, Results
    student/    Home, ExamPass, ExamResult, History
    Login.jsx
  services/
    mockApi.js  simule les appels réseau (latence + erreurs)
  mocks/        données factices (étudiants, cours, examens, questions...)
  utils/
    validation.js       règles de validation client (cahier des charges §5)
    errorMessages.js    mapping des erreurs API (RG-13)
  App.jsx        déclaration des routes (react-router-dom)
  ProtectedRoute.jsx  garde de routes (mock — cf. Luciano)
docs/
  DESIGN_SYSTEM.md      couleurs, typographie, composants, espacements
```
## Routes
Toutes les routes du cahier des charges sont branchées dans `src/App.jsx` :
```
/login
/admin
/admin/students
/admin/courses
/admin/exams
/admin/exams/:id/questions
/admin/exams/:id/results
/student
/student/exams/:id
/student/exams/:id/result
/student/results
```
## Règles de gestion respectées dans l'UI
- **RG-02** — bouton « Commencer » désactivé si l'examen a déjà été passé (`Home.jsx`).
- **RG-03** — seuls les examens publiés et dans leur fenêtre sont listés (`Home.jsx`).
- **RG-06** — la note n'est **jamais** calculée côté client ; `submitExamAttempt()` simule uniquement l'appel serveur.
- **RG-07** — `fetchExamQuestionsForStudent()` / `stripCorrectAnswers()` ne renvoient jamais la bonne réponse ; elle n'apparaît que dans `ExamResult.jsx` après soumission.
- **RG-08** — `Questions.jsx` désactive tous les champs et affiche le bandeau rouge si l'examen a des tentatives.
- **RG-09** — boutons « Supprimer » grisés (cours avec examens, examen avec tentatives) + infobulle.
- **RG-11** — le message d'erreur d'un compte désactivé est affiché tel quel (voir démo ci-dessus).
- **RG-13** — `utils/errorMessages.js` centralise le mapping code HTTP → message ; les erreurs sont toujours affichées via `Toast`.
## Points d'intégration avec Luciano
Trois fichiers sont des **mocks explicitement marqués** à remplacer sans toucher au reste de l'app (mêmes signatures) :
1. `src/context/MockAuthContext.jsx` → vrai `AuthContext` (JWT, `localStorage`, expiration).
2. `src/ProtectedRoute.jsx` → vraie garde de routes basée sur le token.
3. `src/services/mockApi.js` → appels réels via `fetchWithAuth()` vers l'API de Ricardo (`VITE_API_BASE_URL`).
## Scripts
| Commande          | Description                     |
| ------------------ | -------------------------------- |
| `npm run dev`       | serveur de développement Vite    |
| `npm run build`     | build de production (`dist/`)    |
| `npm run preview`   | prévisualise le build de production |
## Design system
Voir [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) pour les couleurs,
la typographie, l'inventaire des composants UI et les règles d'espacement
desktop.
