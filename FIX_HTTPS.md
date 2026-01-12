# 🔒 Résoudre le Problème HTTPS sur saidahriken.site

## ⚠️ Problème

Le site [https://www.saidahriken.site](https://www.saidahriken.site) n'est pas sécurisé (pas de HTTPS ou certificat invalide).

## ✅ Solutions

### Solution 1 : Vérifier la Configuration sur Vercel (Recommandé)

1. **Va sur [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Sélectionne ton projet**
3. **Settings** > **Domains**
4. **Vérifie que ton domaine est bien configuré** :
   - `saidahriken.site` doit être dans la liste
   - `www.saidahriken.site` doit être dans la liste
   - Le statut doit être "Valid" avec un cadenas vert

5. **Si le domaine n'est pas là, ajoute-le** :
   - Clique sur "Add Domain"
   - Entre `saidahriken.site`
   - Vercel te donnera des instructions DNS

### Solution 2 : Configurer les DNS dans Namecheap

1. **Connecte-toi à [Namecheap](https://www.namecheap.com)**
2. **Domain List** > **Manage** (à côté de `saidahriken.site`)
3. **Advanced DNS**

4. **Ajoute/Modifie les enregistrements** :

   **Option A : Utiliser les DNS de Vercel (Recommandé)**
   - Va dans **"Nameservers"**
   - Sélectionne **"Custom DNS"**
   - Ajoute les nameservers fournis par Vercel (généralement) :
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`

   **Option B : Utiliser les DNS de Namecheap**
   - Garde les nameservers de Namecheap
   - Dans "Advanced DNS", ajoute :
     - Type **A** : `@` → IP fournie par Vercel
     - Type **CNAME** : `www` → `cname.vercel-dns.com`

### Solution 3 : Vérifier le Certificat SSL

Vercel fournit automatiquement un certificat SSL gratuit via Let's Encrypt. Si le certificat n'est pas valide :

1. **Dans Vercel Dashboard** > **Settings** > **Domains**
2. **Clique sur ton domaine**
3. **Vérifie le statut du certificat**
4. Si nécessaire, **force la régénération** du certificat

### Solution 4 : Redéployer

Parfois, un simple redéploiement résout le problème :

1. **Deploys** > **Trigger deploy** > **Clear cache and deploy site**
2. Attends 2-5 minutes

---

## 🔍 Vérification

Après configuration, vérifie :

1. **Va sur [https://www.saidahriken.site](https://www.saidahriken.site)**
2. **Regarde l'icône de cadenas** dans la barre d'adresse
3. **Doit être vert** avec "Secure" ou "Sécurisé"

---

## 🆘 Si le Problème Persiste

### Vérifier les DNS

Utilise un outil comme [DNS Checker](https://dnschecker.org) pour vérifier :
- Les DNS pointent bien vers Vercel
- La propagation DNS est complète (peut prendre 24-48h)

### Vérifier le Certificat

Utilise [SSL Labs](https://www.ssllabs.com/ssltest/) pour tester :
- Le certificat SSL est valide
- La configuration est correcte

### Contacter le Support

Si rien ne fonctionne :
- **Vercel Support** : [https://vercel.com/support](https://vercel.com/support)
- **Namecheap Support** : [https://www.namecheap.com/support](https://www.namecheap.com/support)

---

## ✅ Checklist

- [ ] Domaine configuré sur Vercel
- [ ] DNS configurés correctement
- [ ] Certificat SSL valide
- [ ] Site accessible en HTTPS
- [ ] Redirection HTTP → HTTPS active

---

## 🎯 Note

J'ai créé un fichier `vercel.json` qui force les redirections HTTPS et ajoute des headers de sécurité. Après avoir configuré le domaine sur Vercel, commit et push ce fichier pour activer les redirections automatiques.

