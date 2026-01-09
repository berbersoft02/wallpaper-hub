# Configuration Email pour les Recommandations

## Pour recevoir les recommandations par email, suivez ces étapes :

### 1. Créer un compte Resend (Gratuit)
- Allez sur [https://resend.com](https://resend.com)
- Créez un compte (gratuit jusqu'à 3,000 emails/mois)
- Vérifiez votre email

### 2. Obtenir votre clé API
- Dans le dashboard Resend, allez dans "API Keys"
- Créez une nouvelle clé API
- Copiez la clé (elle commence par `re_`)

### 3. Configurer les variables d'environnement
- Créez un fichier `.env.local` à la racine du projet (`wallpaper-hub/.env.local`)
- Ajoutez ces lignes :

```
RESEND_API_KEY=re_votre_cle_api_ici
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Important :** 
- Remplacez `re_votre_cle_api_ici` par votre vraie clé API
- Pour `RESEND_FROM_EMAIL`, vous pouvez utiliser `onboarding@resend.dev` pour tester
- Pour la production, vous devrez vérifier votre propre domaine dans Resend

### 4. Redémarrer le serveur
- Arrêtez le serveur (`Ctrl+C`)
- Relancez avec `npm run dev`

### 5. Tester
- Allez sur votre site
- Cliquez sur "Send Recommendation"
- Remplissez le formulaire et envoyez
- Vous devriez recevoir l'email à `berbersoft@gmail.com`

## Alternative : Sans Resend (pour développement)

Si vous ne configurez pas Resend, les recommandations seront loggées dans la console du serveur. Vous pouvez les voir dans le terminal où tourne `npm run dev`.

## Support

Si vous avez des problèmes :
- Vérifiez que votre clé API est correcte
- Vérifiez que le fichier `.env.local` est bien à la racine du projet
- Vérifiez que vous avez redémarré le serveur après avoir créé `.env.local`
- Consultez les logs dans la console du serveur
