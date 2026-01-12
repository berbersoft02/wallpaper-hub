# 📤 Uploader Rin Shima sur Cloudinary

## 🚀 Méthode 1 : Utiliser le Script (Recommandé - Rapide)

### Étapes :

1. **Assure-toi que le dossier existe** :
   - Le dossier doit être dans : `public/wallpapers/Rin Shima/`
   - Avec toutes les images dedans

2. **Exécute le script** :
   ```bash
   cd C:\Users\ASUS\Desktop\MONEY\wallpaper-hub
   npm run upload-rin-shima
   ```

3. **Le script va** :
   - Lire toutes les images dans `public/wallpapers/Rin Shima/`
   - Les uploader sur Cloudinary dans `wallpapers/rin-shima/`
   - Afficher le progrès et les URLs

4. **Redéploie ton site** :
   - Les nouvelles images apparaîtront automatiquement après le prochain déploiement

---

## 🖱️ Méthode 2 : Upload Manuel via Cloudinary (Alternative)

### Étapes :

1. **Va sur [Cloudinary Console](https://cloudinary.com/console)**
2. **Media Library** > **wallpapers**
3. **Crée un nouveau dossier** : `rin-shima` (ou `Rin Shima`)
4. **Upload les images** :
   - Clique sur "Upload"
   - Sélectionne toutes les images du dossier `public/wallpapers/Rin Shima/`
   - Ou upload-les une par une

5. **Vérifie** :
   - Les images doivent être dans `wallpapers/rin-shima/` (ou `wallpapers/Rin Shima/`)

---

## ✅ Après l'Upload

Une fois les images uploadées :

1. **Les images apparaîtront automatiquement** sur ton site
2. **Pas besoin de redéployer** (sauf si tu veux forcer un refresh)
3. **Le personnage "Rin Shima"** apparaîtra dans les filtres

---

## 🔍 Vérification

Pour vérifier que les images sont bien uploadées :

1. **Va sur [Cloudinary Console](https://cloudinary.com/console)**
2. **Media Library** > **wallpapers**
3. **Vérifie que le dossier `rin-shima` existe** avec tes images

---

## 🎯 Note

Le script utilise le nom de dossier sanitized `rin-shima` sur Cloudinary, mais le mapping dans le code affichera "Rin Shima" avec l'espace sur le site.

---

## ✅ C'est tout !

Une fois uploadé, Rin Shima apparaîtra dans ta galerie avec tous les autres personnages ! 🎉

