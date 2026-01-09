# 🚀 Guide Rapide : Déployer sur Netlify

## ✅ Étape 1 : Ton code est prêt !
Ton projet est maintenant prêt avec Git initialisé.

---

## 📦 Étape 2 : Mettre ton code sur GitHub

### 2.1 Créer un repository GitHub

1. Va sur [https://github.com/new](https://github.com/new)
2. Nomme ton repository : `wallpaper-hub` (ou un autre nom)
3. **Ne coche PAS** "Initialize with README"
4. Clique sur "Create repository"

### 2.2 Connecter ton projet à GitHub

Après avoir créé le repository, GitHub te donnera des commandes. Utilise celles-ci dans ton terminal :

```bash
cd C:\Users\ASUS\Desktop\MONEY\wallpaper-hub
git remote add origin https://github.com/TON-USERNAME/wallpaper-hub.git
git branch -M main
git push -u origin main
```

**⚠️ Remplace `TON-USERNAME` par ton nom d'utilisateur GitHub !**

Exemple : Si ton username est `onlydias`, la commande sera :
```bash
git remote add origin https://github.com/onlydias/wallpaper-hub.git
```

---

## 🌐 Étape 3 : Déployer sur Netlify

### 3.1 Créer un compte Netlify

1. Va sur [https://netlify.com](https://netlify.com)
2. Clique sur "Sign up"
3. **Connecte-toi avec GitHub** (c'est le plus simple)

### 3.2 Importer ton projet

1. Dans Netlify Dashboard, clique sur **"Add new site"** > **"Import an existing project"**
2. Sélectionne **"GitHub"**
3. Autorise Netlify à accéder à tes repositories
4. Sélectionne ton repository `wallpaper-hub`
5. Netlify détectera automatiquement Next.js
6. Clique sur **"Deploy site"**

### 3.3 Attendre le déploiement

- Netlify va builder ton site (2-5 minutes)
- Tu auras une URL temporaire : `ton-site-123.netlify.app`

---

## 🔐 Étape 4 : Configurer les variables d'environnement

1. Dans Netlify Dashboard, va dans :
   - **Site settings** > **Environment variables**
2. Clique sur **"Add a variable"** et ajoute :

   **Variable 1 :**
   - Key : `RESEND_API_KEY`
   - Value : `re_NpHSS4x7_FYyPex9sjZrseuqxbVegjLzB`

   **Variable 2 :**
   - Key : `RESEND_FROM_EMAIL`
   - Value : `onboarding@resend.dev`

3. Après avoir ajouté les variables, va dans **Deploys**
4. Clique sur **"Trigger deploy"** > **"Clear cache and deploy site"**

---

## 🌍 Étape 5 : Connecter ton domaine Namecheap

### 5.1 Dans Netlify

1. Va dans **Site settings** > **Domain management**
2. Clique sur **"Add custom domain"**
3. Entres ton domaine (ex: `ton-domaine.com`)
4. Netlify vérifiera le domaine

### 5.2 Configurer DNS dans Namecheap

1. Connecte-toi à [Namecheap](https://www.namecheap.com)
2. Va dans **Domain List** > **Manage** (à côté de ton domaine)
3. Clique sur **"Advanced DNS"**

### 5.3 Ajouter les enregistrements DNS

**Option A : Utiliser les DNS de Netlify (Recommandé - Plus simple)**

1. Dans Namecheap, va dans **"Nameservers"**
2. Sélectionne **"Custom DNS"**
3. Netlify te donnera 4 nameservers (exemple) :
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - `dns3.p01.nsone.net`
   - `dns4.p01.nsone.net`
4. Ajoute-les et sauvegarde

**Option B : Utiliser les DNS de Namecheap**

1. Garde les nameservers de Namecheap
2. Dans "Advanced DNS", ajoute :
   - Type **A** : `@` → IP fournie par Netlify
   - Type **CNAME** : `www` → `ton-site.netlify.app`

### 5.4 Attendre la propagation DNS

- Cela peut prendre **24-48 heures**
- Netlify te notifiera quand le domaine est connecté
- HTTPS sera activé automatiquement

---

## ✅ Checklist finale

- [ ] Repository GitHub créé
- [ ] Code pushé sur GitHub
- [ ] Compte Netlify créé
- [ ] Site déployé sur Netlify
- [ ] Variables d'environnement configurées
- [ ] Domaine Namecheap connecté
- [ ] DNS configurés
- [ ] Site accessible sur ton domaine

---

## 🎉 C'est tout !

Ton site sera maintenant accessible sur ton domaine Namecheap avec HTTPS automatique !

---

## 🆘 Besoin d'aide ?

Si tu rencontres un problème :
1. Vérifie les logs dans Netlify Dashboard > Deploys
2. Vérifie que les DNS sont correctement configurés
3. Attends 24-48h pour la propagation DNS
