# Guide : Connecter ton projet à GitHub

## 📋 Étapes pour mettre ton code sur GitHub

### 1. Créer un repository sur GitHub

1. Va sur [https://github.com/new](https://github.com/new)
2. Nomme ton repository (ex: `wallpaper-hub`)
3. **Ne coche PAS** "Initialize with README"
4. Clique sur "Create repository"

### 2. Connecter ton projet local à GitHub

Après avoir créé le repository, GitHub te donnera des commandes. Utilise celles-ci :

```bash
cd C:\Users\ASUS\Desktop\MONEY\wallpaper-hub
git remote add origin https://github.com/TON-USERNAME/wallpaper-hub.git
git branch -M main
git push -u origin main
```

**Remplace `TON-USERNAME` par ton nom d'utilisateur GitHub.**

### 3. Si tu as déjà un repository GitHub

Si tu as déjà créé le repository, utilise cette commande pour voir l'URL :

```bash
git remote -v
```

Si tu dois changer l'URL :
```bash
git remote set-url origin https://github.com/TON-USERNAME/wallpaper-hub.git
git push -u origin main
```

---

## ✅ Vérification

Après le push, tu devrais voir ton code sur GitHub à l'adresse :
`https://github.com/TON-USERNAME/wallpaper-hub`

---

## 🚀 Prochaine étape : Netlify

Une fois ton code sur GitHub, tu peux suivre le guide `NETLIFY_SETUP.md` pour déployer sur Netlify !
