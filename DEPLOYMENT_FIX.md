# Solution pour l'erreur 404 sur Vercel

## Problèmes courants et solutions :

### 1. **Fichiers non commités**
Assure-toi que tous les fichiers sont commités :
```bash
git add .
git commit -m "Deploy to Vercel"
git push
```

### 2. **Dossier public non commité**
Le dossier `public/` doit être commité avec toutes les images :
```bash
git add public/
git commit -m "Add public assets"
git push
```

### 3. **Variables d'environnement manquantes**
Dans Vercel Dashboard > Settings > Environment Variables, ajoute :
- `RESEND_API_KEY` = `re_NpHSS4x7_FYyPex9sjZrseuqxbVegjLzB`
- `RESEND_FROM_EMAIL` = `onboarding@resend.dev`

### 4. **Redéployer après les changements**
- Va dans Vercel Dashboard > Deployments
- Clique sur "Redeploy" sur le dernier déploiement
- Ou push un nouveau commit pour déclencher un nouveau déploiement

### 5. **Vérifier les logs de build**
- Dans Vercel Dashboard > Deployments > [ton déploiement] > Build Logs
- Vérifie s'il y a des erreurs de build

### 6. **Vérifier que le build fonctionne en local**
```bash
npm run build
```
Si ça échoue en local, ça échouera aussi sur Vercel.

## Checklist avant déploiement :

- [ ] Tous les fichiers sont commités (sauf node_modules, .next, .env.local)
- [ ] Le dossier `public/` est commité avec toutes les images
- [ ] Le dossier `public/wallpapers/` est commité
- [ ] `npm run build` fonctionne en local
- [ ] Les variables d'environnement sont configurées dans Vercel
- [ ] Le repository GitHub est connecté à Vercel

## Si l'erreur persiste :

1. Vérifie les logs de build dans Vercel
2. Vérifie que l'URL du déploiement est correcte
3. Essaie d'accéder à `/api/wallpapers` directement pour voir si les routes API fonctionnent
4. Contacte le support Vercel avec l'ID d'erreur : `cdg1::hv8hg-1767924476034-3aa7cf446f33`
