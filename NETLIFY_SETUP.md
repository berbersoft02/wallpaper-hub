# Guide Complet : Déployer sur Netlify avec Namecheap

## 📋 Prérequis

1. Un compte GitHub (gratuit)
2. Ton code sur GitHub
3. Un compte Netlify (gratuit)
4. Ton domaine Namecheap

---

## 🚀 Étape 1 : Préparer ton code sur GitHub

### Si tu n'as pas encore de repository GitHub :

1. **Créer un repository sur GitHub**
   - Va sur [https://github.com/new](https://github.com/new)
   - Crée un nouveau repository (ex: `wallpaper-hub`)
   - Ne coche PAS "Initialize with README"

2. **Initialiser Git et push ton code**
   ```bash
   cd wallpaper-hub
   git init
   git add .
   git commit -m "Initial commit - Wallpaper Hub"
   git branch -M main
   git remote add origin https://github.com/TON-USERNAME/wallpaper-hub.git
   git push -u origin main
   ```
   Remplace `TON-USERNAME` par ton nom d'utilisateur GitHub.

### Si tu as déjà un repository GitHub :
```bash
cd wallpaper-hub
git add .
git commit -m "Prepare for Netlify deployment"
git push
```

---

## 🌐 Étape 2 : Déployer sur Netlify

1. **Créer un compte Netlify**
   - Va sur [https://netlify.com](https://netlify.com)
   - Clique sur "Sign up"
   - Connecte-toi avec GitHub (recommandé)

2. **Nouveau site depuis Git**
   - Dans le dashboard Netlify, clique sur "Add new site" > "Import an existing project"
   - Sélectionne "GitHub"
   - Autorise Netlify à accéder à tes repositories
   - Sélectionne ton repository `wallpaper-hub`

3. **Configuration du build**
   - Netlify détectera automatiquement Next.js
   - Vérifie que les paramètres sont :
     - **Build command** : `npm run build`
     - **Publish directory** : `.next`
   - Clique sur "Deploy site"

4. **Attendre le déploiement**
   - Netlify va installer les dépendances et builder ton site
   - Cela peut prendre 2-5 minutes
   - Tu auras une URL temporaire : `ton-site.netlify.app`

---

## 🔐 Étape 3 : Configurer les variables d'environnement

1. **Dans Netlify Dashboard**
   - Va dans ton site > Site settings > Environment variables
   - Clique sur "Add a variable"

2. **Ajouter les variables**
   - Variable 1 :
     - Key : `RESEND_API_KEY`
     - Value : `re_NpHSS4x7_FYyPex9sjZrseuqxbVegjLzB`
   - Variable 2 :
     - Key : `RESEND_FROM_EMAIL`
     - Value : `onboarding@resend.dev`

3. **Redéployer**
   - Après avoir ajouté les variables, va dans Deploys
   - Clique sur "Trigger deploy" > "Clear cache and deploy site"

---

## 🌍 Étape 4 : Connecter ton domaine Namecheap

1. **Dans Netlify Dashboard**
   - Va dans ton site > Site settings > Domain management
   - Clique sur "Add custom domain"
   - Entres ton domaine (ex: `ton-domaine.com`)
   - Netlify vérifiera le domaine

2. **Configurer DNS dans Namecheap**
   - Connecte-toi à [Namecheap](https://www.namecheap.com)
   - Va dans Domain List > Manage (à côté de ton domaine)
   - Clique sur "Advanced DNS"

3. **Ajouter les enregistrements DNS**
   
   Netlify te donnera des instructions, mais généralement :
   
   **Option A : Utiliser les DNS de Netlify (Recommandé)**
   - Dans Namecheap, va dans "Nameservers"
   - Sélectionne "Custom DNS"
   - Ajoute les nameservers fournis par Netlify (généralement) :
     - `dns1.p01.nsone.net`
     - `dns2.p01.nsone.net`
     - `dns3.p01.nsone.net`
     - `dns4.p01.nsone.net`
   
   **Option B : Utiliser les DNS de Namecheap**
   - Garde les nameservers de Namecheap
   - Dans "Advanced DNS", ajoute :
     - Type A : `@` → IP fournie par Netlify
     - Type CNAME : `www` → `ton-site.netlify.app`

4. **Attendre la propagation DNS**
   - Cela peut prendre 24-48 heures
   - Netlify te notifiera quand le domaine est connecté

---

## ✅ Étape 5 : Vérifier que tout fonctionne

1. **Vérifier le site**
   - Va sur ton URL Netlify : `ton-site.netlify.app`
   - Vérifie que tout s'affiche correctement

2. **Tester les fonctionnalités**
   - Teste la Gallery (les wallpapers s'affichent ?)
   - Teste le formulaire de recommandations
   - Teste les liens de navigation

3. **Vérifier HTTPS**
   - Netlify active automatiquement HTTPS
   - Ton site sera accessible en `https://ton-domaine.com`

---

## 🔧 Dépannage

### Si le build échoue :
- Vérifie les logs dans Netlify Dashboard > Deploys
- Assure-toi que `npm run build` fonctionne en local
- Vérifie que toutes les dépendances sont dans `package.json`

### Si les images ne s'affichent pas :
- Vérifie que le dossier `public/` est bien commité
- Vérifie que `public/wallpapers/` est commité avec tes images

### Si le domaine ne se connecte pas :
- Vérifie que les DNS sont correctement configurés
- Attends 24-48h pour la propagation
- Vérifie dans Netlify Dashboard > Domain management

---

## 📝 Checklist finale

- [ ] Code pushé sur GitHub
- [ ] Site déployé sur Netlify
- [ ] Variables d'environnement configurées
- [ ] Domaine Namecheap connecté
- [ ] DNS configurés correctement
- [ ] Site accessible sur ton domaine
- [ ] HTTPS activé automatiquement

---

## 🎉 C'est tout !

Ton site sera maintenant accessible sur ton domaine Namecheap avec HTTPS automatique !
