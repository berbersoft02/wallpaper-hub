# Guide de Déploiement sur Namecheap

## Option 1 : Netlify (Recommandé - Gratuit et Simple)

### Étapes :

1. **Créer un compte Netlify**
   - Va sur [https://netlify.com](https://netlify.com)
   - Crée un compte (gratuit) avec GitHub, GitLab ou email

2. **Préparer ton projet sur GitHub**
   - Si ce n'est pas déjà fait, crée un repository GitHub
   - Push ton code :
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin https://github.com/ton-username/ton-repo.git
     git push -u origin main
     ```

3. **Déployer sur Netlify**
   - Va sur [https://app.netlify.com/start](https://app.netlify.com/start)
   - Clique sur "Import from Git"
   - Connecte ton repository GitHub
   - Configure le build :
     - **Build command** : `npm run build`
     - **Publish directory** : `.next`
     - Clique sur "Deploy site"

4. **Configurer les variables d'environnement**
   - Dans Netlify Dashboard, va dans Site settings > Environment variables
   - Ajoute :
     - `RESEND_API_KEY` = `re_NpHSS4x7_FYyPex9sjZrseuqxbVegjLzB`
     - `RESEND_FROM_EMAIL` = `onboarding@resend.dev`

5. **Configurer Next.js pour Netlify**
   - Netlify détecte automatiquement Next.js
   - Si besoin, crée un fichier `netlify.toml` (voir ci-dessous)

6. **Connecter ton domaine Namecheap**
   - Dans Netlify Dashboard, va dans Site settings > Domain management
   - Clique sur "Add custom domain"
   - Entres ton domaine (ex: `ton-domaine.com`)
   - Netlify te donnera des enregistrements DNS à ajouter dans Namecheap

7. **Configurer DNS dans Namecheap**
   - Connecte-toi à ton compte Namecheap
   - Va dans Domain List > Manage > Advanced DNS
   - Ajoute les enregistrements fournis par Netlify :
     - Type A : `@` → IP de Netlify
     - Type CNAME : `www` → `ton-site.netlify.app`
   - Attends 24-48h pour la propagation DNS

### Avantages :
- ✅ Gratuit
- ✅ Facile à utiliser
- ✅ HTTPS automatique
- ✅ Déploiements automatiques depuis GitHub
- ✅ CDN global

---

## Option 2 : Namecheap Hosting (Si tu as un plan d'hébergement)

### Si tu as un plan d'hébergement Namecheap avec Node.js :

1. **Build ton projet en local**
   ```bash
   npm run build
   ```

2. **Créer un fichier de configuration**
   - Crée un fichier `.htaccess` ou configure Node.js dans cPanel

3. **Upload les fichiers**
   - Connecte-toi via FTP (FileZilla, etc.)
   - Upload tous les fichiers nécessaires

**Note :** Cette méthode est plus complexe et nécessite un plan d'hébergement avec support Node.js.

---

## Option 3 : Railway (Alternative Moderne)

1. Crée un compte sur [https://railway.app](https://railway.app)
2. Connecte ton repository GitHub
3. Railway détecte automatiquement Next.js
4. Configure les variables d'environnement
5. Connecte ton domaine Namecheap

---

## Option 4 : Render (Alternative Gratuite)

1. Crée un compte sur [https://render.com](https://render.com)
2. Connecte ton repository GitHub
3. Crée un nouveau "Web Service"
4. Sélectionne ton repository
5. Configure :
   - Build Command : `npm install && npm run build`
   - Start Command : `npm start`
6. Configure les variables d'environnement
7. Connecte ton domaine Namecheap

---

## Recommandation

**Utilise Netlify** - C'est gratuit, simple, et fonctionne très bien avec Next.js. Tu auras :
- Déploiements automatiques
- HTTPS gratuit
- Performance optimale
- Interface simple

---

## Variables d'environnement à configurer

N'oublie pas d'ajouter ces variables dans ton service d'hébergement :
- `RESEND_API_KEY` = `re_NpHSS4x7_FYyPex9sjZrseuqxbVegjLzB`
- `RESEND_FROM_EMAIL` = `onboarding@resend.dev`
