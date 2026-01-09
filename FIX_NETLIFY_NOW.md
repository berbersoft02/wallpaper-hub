# 🚨 URGENT : Configurer Cloudinary sur Netlify

## ⚠️ Problème

Ton site est en ligne sur [https://onlydias.netlify.app](https://onlydias.netlify.app) mais les wallpapers ne se chargent pas car **Cloudinary n'est pas configuré sur Netlify**.

## ✅ Solution Rapide (5 minutes)

### Étape 1 : Ouvrir Netlify Dashboard

1. Va sur [https://app.netlify.com](https://app.netlify.com)
2. Connecte-toi
3. Clique sur ton site : **onlydias**

### Étape 2 : Ajouter les Variables d'Environnement

1. Dans le menu de gauche, clique sur **"Site settings"**
2. Scroll jusqu'à **"Environment variables"** (section "Build & deploy")
3. Clique sur **"Add a variable"**

### Étape 3 : Ajouter ces 3 Variables (UNE PAR UNE)

**Variable 1 :**
- **Key** : `CLOUDINARY_CLOUD_NAME`
- **Value** : `dg8hzm1fp`
- **Scopes** : ✅ Production, ✅ Deploy previews, ✅ Branch deploys

**Variable 2 :**
- **Key** : `CLOUDINARY_API_KEY`
- **Value** : `641546839117895`
- **Scopes** : ✅ Production, ✅ Deploy previews, ✅ Branch deploys

**Variable 3 :**
- **Key** : `CLOUDINARY_API_SECRET`
- **Value** : `lvhXMXEtNWkgsEtFdDTQ-TkhDPk`
- **Scopes** : ✅ Production, ✅ Deploy previews, ✅ Branch deploys

### Étape 4 : Redéployer

1. Va dans **"Deploys"** (menu de gauche)
2. Clique sur **"Trigger deploy"** (bouton en haut à droite)
3. Sélectionne **"Clear cache and deploy site"**
4. Attends 2-5 minutes

### Étape 5 : Vérifier

1. Va sur [https://onlydias.netlify.app/#gallery](https://onlydias.netlify.app/#gallery)
2. Les wallpapers devraient maintenant s'afficher ! 🎉

---

## 📸 Capture d'écran de l'endroit exact

Dans Netlify Dashboard :
```
Site settings
  └── Build & deploy
      └── Environment variables  ← ICI
          └── Add a variable
```

---

## ✅ Checklist

- [ ] Variables ajoutées sur Netlify
- [ ] Redéploiement effectué
- [ ] Site vérifié - wallpapers s'affichent
- [ ] Tous les personnages sont visibles

---

## 🆘 Si ça ne fonctionne toujours pas

1. **Vérifie les logs** :
   - Netlify Dashboard > Deploys > Clique sur le dernier déploiement
   - Regarde "Function logs" pour voir les erreurs

2. **Vérifie les variables** :
   - Assure-toi que les 3 variables sont bien ajoutées
   - Vérifie qu'il n'y a pas d'espaces avant/après les valeurs

3. **Vérifie Cloudinary** :
   - Va sur [https://cloudinary.com/console](https://cloudinary.com/console)
   - Vérifie que tes images sont bien dans le dossier `wallpapers/`

---

## 🎉 Une fois configuré

- ✅ Tous les wallpapers s'afficheront
- ✅ Plus de "Loading wallpapers..."
- ✅ Images optimisées et rapides
- ✅ Site 100% fonctionnel

**C'est la dernière étape pour que ton site fonctionne parfaitement !** 🚀
