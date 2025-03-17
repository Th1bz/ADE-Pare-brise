# ADE Pare-brise

Site web pour une entreprise de remplacement et réparation de pare-brise et vitrage automobile.

## Structure du projet

```
ADE Pare-brise/
│
├── index.html                # Page principale du site
├── assets/
│   ├── css/
│   │   ├── main.css         # CSS principal (importe tous les autres fichiers CSS)
│   │   ├── variables.css    # Variables CSS (couleurs, espacements, etc.)
│   │   ├── navbar.css       # Styles pour la barre de navigation
│   │   ├── promo.css        # Styles pour la section promotionnelle
│   │   └── contact.css      # Styles pour la section de contact
│   │
│   ├── js/
│   │   ├── main.js          # JavaScript principal
│   │   └── contact.js       # JavaScript pour le formulaire de contact (EmailJS)
│   │
│   └── images/              # Dossier pour les images
│       ├── logo.png
│       ├── logo-footer.png
│       ├── hero-bg.jpg
│       └── ...
│
└── README.md                # Documentation du projet
```

## Stack technique

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3
- Font Awesome 6.4
- EmailJS
- Google Fonts (Roboto)

## Installation et démarrage

1. Cloner le dépôt :

```bash
git clone https://github.com/votre-utilisateur/ADE-Pare-brise.git
cd ADE-Pare-brise
```

2. Ouvrir le fichier `index.html` dans votre navigateur ou utiliser un serveur local.

### Utilisation d'un serveur local (optionnel)

Vous pouvez utiliser l'extension Live Server dans VS Code ou lancer un serveur Python :

```bash
# Avec Python 3
python -m http.server

# Avec Python 2
python -m SimpleHTTPServer
```

## Configuration d'EmailJS

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Créer un service email et un template
3. Remplacer les valeurs dans `assets/js/contact.js` :
   - Remplacer `VOTRE_USER_ID_EMAILJS` par votre User ID EmailJS
   - Remplacer `VOTRE_SERVICE_ID` par votre Service ID
   - Remplacer `VOTRE_TEMPLATE_ID` par votre Template ID

## Personnalisation

### Couleurs

Les couleurs principales du site sont définies dans le fichier `assets/css/variables.css` :

- Noir : `#121212`
- Doré : `#D4AF37`
- Doré clair : `#E5C76B`
- Doré foncé : `#C5A028`

### Images

Remplacez les images dans le dossier `assets/images/` par vos propres images :

- `logo.png` : Logo principal
- `logo-footer.png` : Logo pour le pied de page
- `hero-bg.jpg` : Image d'arrière-plan pour la section héro

## Fonctionnalités

- Design responsive adapté à tous les appareils
- Navbar fixe avec menu de navigation
- Section d'accueil avec image de fond et appel à l'action
- Section services présentant les différentes prestations
- Bannière promotionnelle
- Formulaire de contact fonctionnel avec EmailJS
- Pied de page avec informations de contact et liens utiles

## Maintenance

Pour maintenir le site, suivez la même structure organisée des fichiers :

- Créez des fichiers CSS séparés pour chaque nouvelle fonctionnalité
- Importez ces fichiers dans `main.css`
- Créez des fichiers JS séparés pour chaque nouvelle fonctionnalité
- Incluez ces fichiers dans `index.html`
