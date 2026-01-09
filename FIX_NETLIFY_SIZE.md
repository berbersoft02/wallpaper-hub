# 🔧 Solution : Erreur "request body too large" sur Netlify

## Problème
Netlify a une limite sur la taille des fichiers qu'on peut déployer. Tes images de wallpapers sont trop nombreuses/lourdes.

## ✅ Solutions

### Solution 1 : Augmenter la limite Netlify (Recommandé)

1. **Dans Netlify Dashboard**, va dans :
   - **Site settings** > **Build & deploy** > **Build settings**
   - Clique sur **"Edit settings"**

2. **Ajoute ces variables d'environnement** :
   - `NETLIFY_LARGE_MEDIA` = `true`
   - `NEXT_TELEMETRY_DISABLED` = `1`

3. **Active Netlify Large Media** :
   - Va dans **Site settings** > **Large Media**
   - Clique sur **"Enable Large Media"**
   - Suis les instructions pour installer Git LFS

### Solution 2 : Utiliser Git LFS pour les images

Si tu as beaucoup d'images, utilise Git LFS :

1. **Installe Git LFS** :
   ```bash
   git lfs install
   ```

2. **Track les fichiers images** :
   ```bash
   git lfs track "public/wallpapers/**/*.jpg"
   git lfs track "public/wallpapers/**/*.png"
   git lfs track "public/wallpapers/**/*.jpeg"
   ```

3. **Commit et push** :
   ```bash
   git add .gitattributes
   git add public/wallpapers/
   git commit -m "Add wallpapers with Git LFS"
   git push
   ```

### Solution 3 : Réduire la taille des images

1. **Optimise tes images** avant de les uploader
2. **Utilise un outil** comme TinyPNG ou ImageOptim
3. **Réduis la résolution** si nécessaire

### Solution 4 : Déployer sans certaines images (Temporaire)

Si tu veux tester rapidement, tu peux temporairement exclure certaines images :

1. **Crée un fichier `.netlifyignore`** :
   ```
   public/wallpapers/*/Give some recommendations*
   ```

2. **Commit et push** :
   ```bash
   git add .netlifyignore
   git commit -m "Exclude large folders from Netlify"
   git push
   ```

3. **Redéploie sur Netlify**

---

## 🎯 Solution Recommandée

**Utilise Git LFS** (Solution 2) - C'est la meilleure solution pour gérer de gros fichiers.

---

## 📝 Après avoir appliqué une solution

1. **Redéploie sur Netlify** :
   - Va dans **Deploys**
   - Clique sur **"Trigger deploy"** > **"Clear cache and deploy site"**

2. **Vérifie les logs** pour voir si ça fonctionne

---

## ⚠️ Note

Netlify a des limites :
- **Fonctions** : 50 MB par fonction
- **Déploiement total** : ~500 MB (selon le plan)

Si tu as vraiment beaucoup d'images, considère :
- Utiliser un CDN externe (Cloudinary, Imgix)
- Stocker les images sur un service séparé (AWS S3, Cloudflare R2)
