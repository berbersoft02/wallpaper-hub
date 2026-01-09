# 🚀 CONFIGURER CLOUDINARY SUR NETLIFY (5 MINUTES)

## ✅ Ton site fonctionne en local !
Maintenant il faut juste configurer Cloudinary sur Netlify pour que ça fonctionne en ligne.

---

## 📋 Étapes Simples

### 1. Va sur Netlify Dashboard

1. Ouvre [https://app.netlify.com](https://app.netlify.com)
2. Connecte-toi
3. Clique sur ton site : **onlydias**

### 2. Ajoute les Variables d'Environnement

1. Dans le menu de gauche, clique sur **"Site settings"**
2. Scroll jusqu'à **"Environment variables"** (section "Build & deploy")
3. Clique sur **"Add a variable"**

### 3. Ajoute ces 3 Variables (UNE PAR UNE)

**Variable 1 :**
- **Key** : `CLOUDINARY_CLOUD_NAME`
- **Value** : `dg8hzm1fp`
- **Scopes** : ✅ Production, ✅ Deploy previews, ✅ Branch deploys
- Clique sur **"Add variable"**

**Variable 2 :**
- **Key** : `CLOUDINARY_API_KEY`
- **Value** : `641546839117895`
- **Scopes** : ✅ Production, ✅ Deploy previews, ✅ Branch deploys
- Clique sur **"Add variable"**

**Variable 3 :**
- **Key** : `CLOUDINARY_API_SECRET`
- **Value** : `lvhXMXEtNWkgsEtFdDTQ-TkhDPk`
- **Scopes** : ✅ Production, ✅ Deploy previews, ✅ Branch deploys
- Clique sur **"Add variable"**

### 4. Redéploie

1. Va dans **"Deploys"** (menu de gauche)
2. Clique sur **"Trigger deploy"** (bouton en haut à droite)
3. Sélectionne **"Clear cache and deploy site"**
4. Attends 2-5 minutes

### 5. Vérifie

1. Va sur [https://onlydias.netlify.app/#gallery](https://onlydias.netlify.app/#gallery)
2. Les wallpapers devraient maintenant s'afficher ! 🎉

---

## ✅ Checklist

- [ ] Variables ajoutées sur Netlify (les 3)
- [ ] Redéploiement effectué
- [ ] Site vérifié - wallpapers s'affichent
- [ ] Tous les personnages sont visibles

---

## 🎉 C'est tout !

Une fois les variables configurées et le site redéployé, tes wallpapers s'afficheront depuis Cloudinary sur Netlify, exactement comme en local !

---

## 📸 Où trouver "Environment variables" dans Netlify

```
Netlify Dashboard
  └── Ton site (onlydias)
      └── Site settings (menu de gauche)
          └── Build & deploy
              └── Environment variables  ← ICI
                  └── Add a variable
```
