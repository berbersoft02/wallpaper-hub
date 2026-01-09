# 🚀 Guide Rapide : Cloudinary Setup

## ✅ Ce qui a été fait

1. ✅ Cloudinary SDK installé
2. ✅ API route modifiée pour utiliser Cloudinary
3. ✅ Script d'upload créé

---

## 📋 Étapes pour toi

### 1. Créer un compte Cloudinary

1. Va sur [https://cloudinary.com](https://cloudinary.com)
2. Crée un compte gratuit (gratuit jusqu'à 25GB)
3. Dans le Dashboard, note :
   - **Cloud Name** (ex: `dias-wallpapers`)
   - **API Key**
   - **API Secret**

---

### 2. Configurer les variables d'environnement

#### En local :

Crée/modifie `.env.local` dans le dossier `wallpaper-hub` :

```env
CLOUDINARY_CLOUD_NAME=ton-cloud-name
CLOUDINARY_API_KEY=ton-api-key
CLOUDINARY_API_SECRET=ton-api-secret
```

#### Sur Netlify :

1. **Site settings** > **Environment variables**
2. Ajoute ces 3 variables :
   - `CLOUDINARY_CLOUD_NAME` = ton cloud name
   - `CLOUDINARY_API_KEY` = ton API key
   - `CLOUDINARY_API_SECRET` = ton API secret

---

### 3. Uploader tes images

#### Option A : Via l'interface Cloudinary (Simple)

1. Va dans **Media Library** dans ton dashboard Cloudinary
2. Crée un dossier : `wallpapers`
3. Pour chaque personnage, crée un sous-dossier :
   - `wallpapers/akane-kurokawa/`
   - `wallpapers/alya-kujou/`
   - etc.
4. Upload les images dans chaque dossier

**Important** : Le nom du sous-dossier doit correspondre au nom du personnage dans ton code.

#### Option B : Via le script (Rapide)

1. Assure-toi que `.env.local` est configuré
2. Installe dotenv si nécessaire : `npm install dotenv`
3. Exécute le script :
   ```bash
   node scripts/upload-to-cloudinary.js
   ```

Le script va automatiquement :
- Lire tous les dossiers dans `public/wallpapers/`
- Upload chaque image vers Cloudinary
- Organiser par personnage

---

### 4. Structure sur Cloudinary

Tes images doivent être organisées comme ça :

```
wallpapers/
  ├── Akane Kurokawa/
  │   ├── 1.jpg
  │   ├── 2.jpg
  │   └── ...
  ├── Alya Kujou/
  │   ├── 1.jpg
  │   └── ...
  └── ...
```

**Note** : Le nom du dossier sur Cloudinary doit correspondre exactement au nom du dossier dans `public/wallpapers/`.

---

### 5. Redéployer

1. **Commit les changements** :
   ```bash
   git add .
   git commit -m "Add Cloudinary integration"
   git push
   ```

2. **Netlify redéploiera automatiquement**

3. **Vérifie que ça fonctionne** :
   - Va sur ton site
   - Les images devraient se charger depuis Cloudinary

---

## ✅ Avantages

- ✅ Plus de problème de taille sur Netlify
- ✅ Images optimisées automatiquement
- ✅ CDN global (chargement rapide)
- ✅ Transformation d'images à la volée
- ✅ Gratuit jusqu'à 25GB

---

## 🔧 Dépannage

### Les images ne s'affichent pas

1. Vérifie que les variables d'environnement sont correctes
2. Vérifie que les noms de dossiers correspondent
3. Vérifie les permissions Cloudinary (doit être public)

### Erreur d'authentification

1. Vérifie que l'API Key et Secret sont corrects
2. Vérifie que le Cloud Name est correct
3. Vérifie que les variables sont bien configurées sur Netlify

### Le script ne fonctionne pas

1. Assure-toi que `.env.local` existe et est configuré
2. Installe dotenv : `npm install dotenv`
3. Vérifie que le dossier `public/wallpapers/` existe

---

## 📝 Prochaines étapes

Une fois que tout fonctionne :
1. Tu peux supprimer le dossier `public/wallpapers/` du repository (optionnel)
2. Les images seront servies uniquement depuis Cloudinary
3. Ton déploiement Netlify sera beaucoup plus rapide et léger

---

## 🎉 C'est tout !

Ton site utilisera maintenant Cloudinary pour les images, ce qui résout le problème de taille sur Netlify !
