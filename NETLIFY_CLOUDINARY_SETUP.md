# 🔧 Configuration Cloudinary sur Netlify

## ⚠️ Problème Actuel

Le site est déployé sur Netlify mais les wallpapers ne se chargent pas. C'est parce que les variables d'environnement Cloudinary ne sont pas configurées sur Netlify.

## ✅ Solution : Configurer les Variables d'Environnement

### Étape 1 : Aller dans Netlify Dashboard

1. Va sur [https://app.netlify.com](https://app.netlify.com)
2. Connecte-toi à ton compte
3. Sélectionne ton site : `onlydias`

### Étape 2 : Ajouter les Variables d'Environnement

1. Dans le menu de gauche, clique sur **"Site settings"**
2. Va dans **"Environment variables"** (dans la section "Build & deploy")
3. Clique sur **"Add a variable"**

### Étape 3 : Ajouter ces 3 Variables

Ajoute une par une :

**Variable 1 :**
- Key : `CLOUDINARY_CLOUD_NAME`
- Value : `dg8hzm1fp`
- Scopes : Tous (Production, Deploy previews, Branch deploys)

**Variable 2 :**
- Key : `CLOUDINARY_API_KEY`
- Value : `641546839117895`
- Scopes : Tous

**Variable 3 :**
- Key : `CLOUDINARY_API_SECRET`
- Value : `lvhXMXEtNWkgsEtFdDTQ-TkhDPk`
- Scopes : Tous

### Étape 4 : Redéployer

1. Après avoir ajouté les variables, va dans **"Deploys"** (menu de gauche)
2. Clique sur **"Trigger deploy"** > **"Clear cache and deploy site"**
3. Attends que le déploiement se termine (2-5 minutes)

### Étape 5 : Vérifier

1. Va sur [https://onlydias.netlify.app/#gallery](https://onlydias.netlify.app/#gallery)
2. Les wallpapers devraient maintenant s'afficher !

---

## 🔍 Vérification des Logs

Si ça ne fonctionne toujours pas :

1. Va dans **"Deploys"** > Clique sur le dernier déploiement
2. Regarde les **"Function logs"** ou **"Build logs"**
3. Cherche les erreurs liées à Cloudinary

Erreurs possibles :
- `CLOUDINARY_CLOUD_NAME is not defined` → Les variables ne sont pas configurées
- `Invalid API credentials` → Les identifiants sont incorrects
- `Failed to load from Cloudinary` → Problème de connexion

---

## ✅ Checklist

- [ ] Variables d'environnement ajoutées sur Netlify
- [ ] Redéploiement effectué
- [ ] Site vérifié - les wallpapers s'affichent
- [ ] Tous les personnages sont visibles
- [ ] Les images se chargent depuis Cloudinary

---

## 🎉 Une fois Configuré

Ton site utilisera Cloudinary pour toutes les images :
- ✅ Plus de problème de taille
- ✅ Images optimisées automatiquement
- ✅ Chargement rapide avec CDN
- ✅ Tous les wallpapers disponibles
