# ☁️ Configuration Cloudinary pour les Wallpapers

## 📋 Étape 1 : Créer un compte Cloudinary

1. **Va sur** [https://cloudinary.com](https://cloudinary.com)
2. **Crée un compte gratuit** (gratuit jusqu'à 25GB)
3. **Note tes identifiants** :
   - Cloud Name
   - API Key
   - API Secret

Tu les trouveras dans le Dashboard > Account Details.

---

## 📤 Étape 2 : Uploader tes images sur Cloudinary

### Option A : Via l'interface Cloudinary (Recommandé pour commencer)

1. **Va dans** Media Library dans ton dashboard Cloudinary
2. **Crée un dossier** : `wallpapers`
3. **Pour chaque personnage**, crée un sous-dossier (ex: `wallpapers/akane-kurokawa`)
4. **Upload les images** une par une ou par lot

### Option B : Via l'API (Plus rapide pour beaucoup d'images)

Utilise le script PowerShell que je vais créer pour toi (voir ci-dessous).

---

## 🔑 Étape 3 : Configurer les variables d'environnement

### En local (.env.local) :

Crée ou modifie `.env.local` :

```env
CLOUDINARY_CLOUD_NAME=ton-cloud-name
CLOUDINARY_API_KEY=ton-api-key
CLOUDINARY_API_SECRET=ton-api-secret
```

### Sur Netlify :

1. **Site settings** > **Environment variables**
2. Ajoute ces 3 variables :
   - `CLOUDINARY_CLOUD_NAME` = ton cloud name
   - `CLOUDINARY_API_KEY` = ton API key
   - `CLOUDINARY_API_SECRET` = ton API secret

---

## 📝 Étape 4 : Structure des dossiers sur Cloudinary

Organise tes images comme ça :

```
wallpapers/
  ├── akane-kurokawa/
  │   ├── 1.jpg
  │   ├── 2.jpg
  │   └── ...
  ├── alya-kujou/
  │   ├── 1.jpg
  │   └── ...
  └── ...
```

Le nom du dossier = le nom du personnage.

---

## 🚀 Étape 5 : Redéployer

Une fois les images uploadées et les variables configurées :

1. **Commit les changements de code**
2. **Push sur GitHub**
3. **Netlify redéploiera automatiquement**

---

## ✅ Avantages de Cloudinary

- ✅ Pas de limite de taille dans le repository
- ✅ Images optimisées automatiquement
- ✅ CDN global (chargement rapide)
- ✅ Transformation d'images à la volée
- ✅ Gratuit jusqu'à 25GB

---

## 📊 Vérification

Après le déploiement :
1. Vérifie que les images s'affichent sur le site
2. Vérifie que les URLs pointent vers Cloudinary
3. Teste le chargement des images

---

## 🔧 Dépannage

### Les images ne s'affichent pas
- Vérifie que les variables d'environnement sont correctes
- Vérifie que les noms de dossiers correspondent
- Vérifie les permissions Cloudinary (doit être public)

### Erreur d'authentification
- Vérifie que l'API Key et Secret sont corrects
- Vérifie que le Cloud Name est correct
