# 🔍 Vérifier la Configuration Cloudinary sur Netlify

## ⚠️ Message d'erreur actuel
"No wallpapers found. Please check the configuration."

Cela signifie que Cloudinary est peut-être configuré, mais qu'aucune image n'est trouvée.

---

## ✅ Vérification Étape par Étape

### 1. Vérifier les Variables d'Environnement sur Netlify

1. Va sur [https://app.netlify.com](https://app.netlify.com)
2. Sélectionne ton site : **onlydias**
3. **Site settings** > **Environment variables**

Vérifie que ces 3 variables existent :
- ✅ `CLOUDINARY_CLOUD_NAME` = `dg8hzm1fp`
- ✅ `CLOUDINARY_API_KEY` = `641546839117895`
- ✅ `CLOUDINARY_API_SECRET` = `lvhXMXEtNWkgsEtFdDTQ-TkhDPk`

**Si elles n'existent pas, ajoute-les !**

### 2. Vérifier que les Images sont sur Cloudinary

1. Va sur [https://cloudinary.com/console](https://cloudinary.com/console)
2. Connecte-toi avec ton compte
3. Va dans **Media Library**
4. Vérifie que tu as un dossier `wallpapers/` avec des sous-dossiers :
   - `wallpapers/akane-kurokawa/`
   - `wallpapers/alya-kujou/`
   - `wallpapers/shiina-mahiru/`
   - etc.

**Si les images ne sont pas là, il faut les uploader !**

### 3. Redéployer sur Netlify

1. Dans Netlify Dashboard > **Deploys**
2. Clique sur **"Trigger deploy"** > **"Clear cache and deploy site"**
3. Attends 2-5 minutes

### 4. Vérifier les Logs

1. Dans Netlify Dashboard > **Deploys**
2. Clique sur le dernier déploiement
3. Regarde les **Function logs**
4. Cherche les messages :
   - "Cloudinary Config Check"
   - "Successfully loaded X characters from Cloudinary"
   - Ou des erreurs Cloudinary

---

## 🔧 Si les Images ne sont pas sur Cloudinary

Si tu vois que les images ne sont pas sur Cloudinary, il faut les uploader :

### Option 1 : Utiliser le Script (Recommandé)

1. Assure-toi que `.env.local` contient tes identifiants Cloudinary
2. Exécute :
   ```bash
   cd C:\Users\ASUS\Desktop\MONEY\wallpaper-hub
   npm run upload-images
   ```

### Option 2 : Upload Manuel

1. Va sur [https://cloudinary.com/console](https://cloudinary.com/console)
2. **Media Library** > **Upload**
3. Crée un dossier `wallpapers`
4. Pour chaque personnage, crée un sous-dossier et upload les images

---

## 🆘 Dépannage

### Erreur : "Cloudinary not configured"
→ Les variables d'environnement ne sont pas configurées sur Netlify

### Erreur : "No wallpapers found in Cloudinary"
→ Les images ne sont pas uploadées sur Cloudinary OU elles ne sont pas dans le bon dossier

### Erreur : "Failed to load from Cloudinary"
→ Problème de connexion ou d'identifiants incorrects

---

## ✅ Checklist Finale

- [ ] Variables d'environnement configurées sur Netlify (les 3)
- [ ] Images uploadées sur Cloudinary dans `wallpapers/`
- [ ] Site redéployé sur Netlify
- [ ] Logs vérifiés (pas d'erreurs)
- [ ] Site testé - wallpapers s'affichent

---

## 🎯 Prochaine Étape

Une fois que tout est vérifié et configuré, les wallpapers devraient s'afficher sur [https://onlydias.netlify.app](https://onlydias.netlify.app) !
