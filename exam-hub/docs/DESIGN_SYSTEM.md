# Exam Hub — Design system (desktop)
Référence pour l'implémentation React/Tailwind. Reprend le contenu et les
couleurs des maquettes mobiles d'Alison, adapté aux règles d'espacement et
de mise en page desktop du cahier des charges.
## Couleurs
| Usage                                   | Variable Tailwind | Hex       |
| ---------------------------------------- | ------------------ | --------- |
| Fond général                             | `bg-bg`            | `#f1f5f9` |
| Surfaces (cartes, tableaux, modales)      | `bg-white`         | `#ffffff` |
| Primaire (en-tête, navigation, sidebar)   | `bg-primary`       | `#1e293b` |
| Secondaire (boutons d'action)             | `bg-secondary`     | `#3b82f6` |
| Succès (validé, actif, bonnes réponses)   | `bg-success`       | `#22c55e` |
| Erreur / Danger                          | `bg-danger`        | `#ef4444` |
| Avertissement (verrouillage)              | `bg-warning`       | `#f59e0b` |
| Texte principal                          | `text-text`        | `#0f172a` |
| Texte secondaire                         | `text-text-secondary` | `#64748b` |
Toutes ces couleurs sont déclarées dans `tailwind.config.js` — ne pas
utiliser de valeurs hex en dur dans les composants.
## Typographie
Police : **Inter** (chargée via Google Fonts dans `index.html`), fallback `system-ui`.
| Style   | Taille | Poids     | Usage                    |
| ------- | ------ | --------- | ------------------------- |
| `h1`    | 28px   | bold (700)   | titres de page             |
| `h2`    | 22px   | semibold (600) | sous-titres              |
| `body`  | 16px   | regular (400) | textes courants           |
| `small` | 14px   | regular (400) | dates, labels secondaires |
| `label` | 12px   | medium (500)  | libellés de champ         |
## Composants (`src/components/ui/`)
| Composant  | États couverts                                             |
| ---------- | ------------------------------------------------------------ |
| `Button`   | `primary` / `secondary` / `danger` × normal, hover, disabled, `isLoading` (spinner intégré) |
| `Input`    | text / email / password / select, normal, focus, `error` (bordure rouge + message), disabled |
| `Modal`    | overlay semi-transparent, contenu centré, `onConfirm` / `onClose` |
| `Toast`    | success (vert) / error (rouge) / info (bleu), auto-fermeture 5s |
| `Badge`    | active (vert) / inactive (rouge) / locked (orange)          |
| `Spinner`  | tailles 16/24/40px, couleur configurable                    |
| `Skeleton` | pulsation Tailwind (`animate-pulse`), largeur/hauteur configurables |
| `Table`    | en-tête fixe, lignes alternées, colonne actions, état `isLoading` (skeleton rows), état vide |
## Layouts (`src/components/layout/`)
- **LayoutAdmin** — sidebar fixe 240px (fond `primary`), header 64px avec
  nom admin + déconnexion, contenu principal avec `padding: 32px`.
- **LayoutStudent** — header fixe (logo, nav Accueil/Historique, nom
  étudiant + déconnexion), contenu `padding: 32px`, largeur max 6xl centrée.
- **LayoutPublic** — pas de navigation, formulaire centré horizontalement
  et verticalement (page de login).
## Espacements (desktop)
- Padding contenu principal : `24px`–`32px` (`p-8` = 32px dans les layouts).
- Gaps entre sections : `24px` (`gap-6`).
- Gaps entre éléments imbriqués : `12px`–`16px`.
- Sidebar admin : largeur fixe `240px` (`w-60`).
- Cartes / tableaux : coins arrondis `12px`–`16px`, `shadow-card`.
## Icônes
Les icônes sont volontairement simples (caractères Unicode / glyphes) pour
rester dépendance-free ; elles peuvent être remplacées par `react-icons`
(déjà listé comme dépendance disponible) si le design le demande.
