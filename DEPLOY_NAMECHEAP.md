# 🌐 Déployer sur Namecheap avec Netlify

## 📋 Étapes Simples

### Étape 1 : Mettre ton code sur GitHub

1. **Créer un repository GitHub**
   - Va sur [https://github.com/new](https://github.com/new)
   - Nomme-le : `wallpaper-hub`
   - **Ne coche PAS** "Initialize with README"
   - Clique sur "Create repository"

2. **Push ton code sur GitHub**
   
   Ouvre PowerShell dans le dossier `wallpaper-hub` et exécute :
   
   ```bash
   git remote add origin https://github.com/TON-USERNAME/wallpaper-hub.git
   git branch -M main
   git push -u origin main
   ```
   
   **Remplace `TON-USERNAME` par ton username GitHub !**

---

### Étape 2 : Déployer sur Netlify

1. **Créer un compte Netlify**
   - Va sur [https://netlify.com](https://netlify.com)
   - Clique sur "Sign up"
   - **Connecte-toi avec GitHub** (le plus simple)

2. **Importer ton projet**
   - Clique sur **"Add new site"** > **"Import an existing project"**
   - Sélectionne **"GitHub"**
   - Autorise Netlify à accéder à tes repositories
   - Sélectionne `wallpaper-hub`
   - Netlify détectera automatiquement Next.js
   - Clique sur **"Deploy site"**

3. **Attendre le déploiement** (2-5 minutes)
   - Tu auras une URL temporaire : `ton-site-123.netlify.app`

---

### Étape 3 : Configurer les variables d'environnement

1. Dans Netlify Dashboard :
   - **Site settings** > **Environment variables**

2. Ajoute ces 2 variables :
   
   **Variable 1 :**
   - Key : `RESEND_API_KEY`
   - Value : `re_NpHSS4x7_FYyPex9sjZrseuqxbVegjLzB`
   
   **Variable 2 :**
   - Key : `RESEND_FROM_EMAIL`
   - Value : `onboarding@resend.dev`

3. **Redéployer** :
   - Va dans **Deploys**
   - Clique sur **"Trigger deploy"** > **"Clear cache and deploy site"**

---

### Étape 4 : Connecter ton domaine Namecheap

#### 4.1 Dans Netlify

1. **Site settings** > **Domain management**
2. Clique sur **"Add custom domain"**
3. Entre ton domaine (ex: `ton-domaine.com`)
4. Netlify vérifiera le domaine

#### 4.2 Configurer DNS dans Namecheap

**Option A : Utiliser les DNS de Netlify (RECOMMANDÉ - Plus simple)**

1. Connecte-toi à [Namecheap](https://www.namecheap.com)
2. Va dans **Domain List** > **Manage** (à côté de ton domaine)
3. Clique sur **"Nameservers"**
4. Sélectionne **"Custom DNS"**
5. Netlify te donnera 4 nameservers (exemple) :
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
6. Ajoute-les et sauvegarde

**Option B : Utiliser les DNS de Namecheap**

1. Garde les nameservers de Namecheap
2. Dans **"Advanced DNS"**, ajoute :
   - Type **A** : `@` → IP fournie par Netlify
   - Type **CNAME** : `www` → `ton-site.netlify.app`

#### 4.3 Attendre la propagation DNS

- Cela peut prendre **24-48 heures**
- Netlify te notifiera quand le domaine est connecté
- HTTPS sera activé automatiquement

---

## ✅ Vérification

1. Va sur ton domaine : `https://ton-domaine.com`
2. Vérifie que tout fonctionne :
   - La page d'accueil s'affiche
   - Les wallpapers se chargent
   - Le formulaire de recommandations fonctionne

---

## 🆘 Problèmes Courants

### Le domaine ne se connecte pas
- Vérifie que les DNS sont correctement configurés
- Attends 24-48h pour la propagation
- Vérifie dans Netlify Dashboard > Domain management

### Le build échoue
- Vérifie les logs dans Netlify Dashboard > Deploys
- Assure-toi que `npm run build` fonctionne en local

### Les images ne s'affichent pas
- Vérifie que le dossier `public/` est bien commité sur GitHub
- Vérifie que `public/wallpapers/` est commité

---

## 🎉 C'est tout !

Ton site sera maintenant accessible sur ton domaine Namecheap avec HTTPS automatique !
