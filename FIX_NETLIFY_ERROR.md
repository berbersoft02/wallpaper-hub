# 🔧 Solution : Erreur "request body too large" sur Netlify

## Problème
L'erreur `HTTP Error 400: request body too large` signifie que ton déploiement dépasse la limite de taille de Netlify (généralement 50MB pour les fonctions).

## Solutions

### Solution 1 : Utiliser Git LFS pour les grandes images (Recommandé)

Git LFS (Large File Storage) permet de stocker les grandes images séparément.

#### Installation de Git LFS :

1. **Installer Git LFS** :
   - Télécharge : [https://git-lfs.github.com](https://git-lfs.github.com)
   - Installe-le

2. **Initialiser Git LFS dans ton projet** :
   ```bash
   cd C:\Users\ASUS\Desktop\MONEY\wallpaper-hub
   git lfs install
   git lfs track "public/wallpapers/**/*.jpg"
   git lfs track "public/wallpapers/**/*.png"
   git lfs track "public/wallpapers/**/*.jpeg"
   git add .gitattributes
   git commit -m "Add Git LFS for large images"
   ```

3. **Push sur GitHub** :
   ```bash
   git push -u origin main
   ```

#### Configurer Netlify pour Git LFS :

1. Dans Netlify Dashboard > Site settings > Build & deploy
2. Ajoute dans "Build environment variables" :
   - `GIT_LFS_ENABLED` = `true`

---

### Solution 2 : Optimiser les images avant le déploiement

Réduire la taille des images avant de les commit.

#### Option A : Utiliser un outil en ligne
- [TinyPNG](https://tinypng.com) - Compresse les images
- [Squoosh](https://squoosh.app) - Compresse et optimise

#### Option B : Script PowerShell pour compresser

Crée un script pour compresser automatiquement toutes les images.

---

### Solution 3 : Héberger les images ailleurs

Au lieu de mettre les images dans le repository, utilise un service externe :

1. **Cloudinary** (gratuit jusqu'à 25GB)
2. **Imgur API**
3. **AWS S3** (payant)
4. **GitHub Releases** (pour les assets)

Puis modifie ton code pour charger les images depuis ce service.

---

### Solution 4 : Déployer sans les images d'abord

1. **Temporairement exclure les images** :
   - Crée un fichier `.netlifyignore` (déjà créé)
   - Décommente les lignes pour exclure les images :
     ```
     public/wallpapers/**/*.jpg
     public/wallpapers/**/*.png
     ```

2. **Déploie sans les images**
3. **Ajoute les images progressivement** ou utilise une autre méthode

---

## Solution Recommandée : Git LFS

**Pourquoi Git LFS ?**
- ✅ Les images sont stockées séparément
- ✅ Netlify supporte Git LFS
- ✅ Pas besoin de changer ton code
- ✅ Les images restent dans ton repository

**Étapes rapides :**

1. Installe Git LFS : [https://git-lfs.github.com](https://git-lfs.github.com)
2. Dans PowerShell :
   ```bash
   cd C:\Users\ASUS\Desktop\MONEY\wallpaper-hub
   git lfs install
   git lfs track "public/wallpapers/**/*"
   git add .gitattributes
   git add public/wallpapers/
   git commit -m "Move wallpapers to Git LFS"
   git push -u origin main
   ```
3. Dans Netlify : Site settings > Build & deploy > Environment variables
   - Ajoute : `GIT_LFS_ENABLED` = `true`
4. Redéploie sur Netlify

---

## Vérification

Après avoir appliqué une solution, vérifie :
1. Le déploiement Netlify réussit
2. Les images s'affichent correctement sur le site
3. La taille du déploiement est acceptable

---

## Si rien ne fonctionne

Contacte le support Netlify ou considère :
- Utiliser Vercel (qui a de meilleures limites pour Next.js)
- Utiliser Railway ou Render
- Héberger les images sur un CDN externe
