# MYIA WEBSITE

Page "Prochainement" statique (HTML/CSS/JS).

## Personnalisation rapide

- Email de contact: actuellement `contact@myiatech.com` (modifiable dans `/index.html`)
- Lien réseaux: remplacer le bloc `Réseaux` dans `/index.html` (ou modifier `/script.js`)
- Texte: modifier le contenu de la section `.hero` dans `/index.html`

## Mise en ligne (au choix)

### Option A: Netlify (simple + formulaire)

1. Déployez le dossier tel quel.
2. Dans Netlify: "Site settings" -> "Domain management" -> associer votre nom de domaine.
3. Le formulaire fonctionne automatiquement grâce à `data-netlify="true"` (onglet "Forms").

### Option B: Vercel / GitHub Pages / autre

- Déployez les fichiers statiques.
- Si vous voulez récupérer des emails, remplacez le formulaire par un endpoint (Formspree, backend, etc.).

## DNS (résumé)

- Si votre hébergeur fournit des nameservers: remplacez les NS chez votre registrar.
- Sinon, pointez votre domaine vers l’hébergeur via `A` / `CNAME` selon leurs instructions.
