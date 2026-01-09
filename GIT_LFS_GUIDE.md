# 🚀 Guide Rapide : Utiliser Git LFS pour les Images

## Pourquoi Git LFS ?

Netlify a une limite de **50 MB par fonction**. Tes images sont trop volumineuses. Git LFS stocke les gros fichiers séparément.

---

## 📥 Étape 1 : Installer Git LFS

1. **Télécharge Git LFS** : [https://git-lfs.github.com/](https://git-lfs.github.com/)
2. **Installe-le** (suis l'installateur Windows)
3. **Redémarre PowerShell** après l'installation

---

## ⚙️ Étape 2 : Configurer Git LFS

Ouvre PowerShell et exécute ces commandes **une par une** :

```powershell
# 1. Aller dans ton dossier
cd C:\Users\ASUS\Desktop\MONEY\wallpaper-hub

# 2. Installer Git LFS
git lfs install

# 3. Track les fichiers images
git lfs track "public/wallpapers/**/*.jpg"
git lfs track "public/wallpapers/**/*.png"
git lfs track "public/wallpapers/**/*.jpeg"

# 4. Vérifier que ça a fonctionné
git lfs ls-files
```

---

## 📤 Étape 3 : Migrer les Images vers Git LFS

```powershell
# 1. Ajouter le fichier .gitattributes
git add .gitattributes

# 2. Migrer les images existantes
git add public/wallpapers/

# 3. Commit
git commit -m "Migrate wallpapers to Git LFS"

# 4. Push vers GitHub
git push
```

**⚠️ Important** : Le push peut prendre du temps car Git LFS upload les images séparément.

---

## 🌐 Étape 4 : Activer Large Media sur Netlify

1. **Dans Netlify Dashboard**, va dans :
   - **Site settings** > **Large Media**

2. **Clique sur "Enable Large Media"**

3. **Suis les instructions** :
   - Netlify te donnera une commande à exécuter
   - Exécute-la dans PowerShell
   - Cela configure Git LFS pour Netlify

4. **Redéploie** :
   - Va dans **Deploys**
   - Clique sur **"Trigger deploy"** > **"Clear cache and deploy site"**

---

## ✅ Vérification

Après le déploiement, vérifie que :
1. Le build réussit sans erreur
2. Les images s'affichent sur ton site
3. Le site fonctionne correctement

---

## 🆘 Problèmes Courants

### Erreur : "git: 'lfs' is not a recognized command"
- Git LFS n'est pas installé ou pas dans le PATH
- Réinstalle Git LFS et redémarre PowerShell

### Erreur : "This repository is not configured for Git LFS"
- Exécute `git lfs install` dans ton dossier

### Le push est très lent
- C'est normal, Git LFS upload les images séparément
- Attends que ça se termine

---

## 🎯 Alternative : CDN Externe

Si Git LFS est trop complexe, tu peux utiliser **GitHub Raw URLs** :

Tes images sont déjà sur GitHub ! Tu peux les servir directement depuis GitHub :

```
https://raw.githubusercontent.com/berbersoft02/wallpaper-hub/main/public/wallpapers/...
```

Mais Git LFS est la meilleure solution pour un déploiement professionnel.
