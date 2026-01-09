# 📝 Comment Exécuter les Commandes Git

## 🖥️ Méthode 1 : Terminal PowerShell (Recommandé)

### Étape 1 : Ouvrir PowerShell

1. **Ouvre l'Explorateur de fichiers Windows**
2. **Navigue vers** : `C:\Users\ASUS\Desktop\MONEY\wallpaper-hub`
3. **Clique avec le bouton droit** dans le dossier
4. **Sélectionne** : "Ouvrir dans le terminal" ou "Ouvrir PowerShell ici"

**OU**

1. Appuie sur **Windows + R**
2. Tape : `powershell`
3. Appuie sur **Entrée**
4. Tape : `cd C:\Users\ASUS\Desktop\MONEY\wallpaper-hub`
5. Appuie sur **Entrée**

### Étape 2 : Vérifier que Git fonctionne

Tape cette commande et appuie sur **Entrée** :
```powershell
git --version
```

Tu devrais voir quelque chose comme : `git version 2.x.x`

### Étape 3 : Exécuter les commandes Git

Une fois dans le bon dossier, exécute ces commandes **une par une** :

#### 1. Vérifier que tu es dans le bon dossier
```powershell
pwd
```
Tu devrais voir : `C:\Users\ASUS\Desktop\MONEY\wallpaper-hub`

#### 2. Vérifier le statut Git
```powershell
git status
```

#### 3. Connecter à GitHub (REMPLACE TON-USERNAME)
```powershell
git remote add origin https://github.com/TON-USERNAME/wallpaper-hub.git
```
**⚠️ Remplace `TON-USERNAME` par ton nom d'utilisateur GitHub !**

#### 4. Changer la branche en "main"
```powershell
git branch -M main
```

#### 5. Envoyer le code sur GitHub
```powershell
git push -u origin main
```

**Note :** GitHub te demandera peut-être de te connecter. Suis les instructions à l'écran.

---

## 🖱️ Méthode 2 : Utiliser Visual Studio Code

Si tu as VS Code installé :

1. **Ouvre VS Code**
2. **File** > **Open Folder**
3. Sélectionne : `C:\Users\ASUS\Desktop\MONEY\wallpaper-hub`
4. Appuie sur **Ctrl + `** (backtick) pour ouvrir le terminal intégré
5. Le terminal sera déjà dans le bon dossier
6. Exécute les commandes Git normalement

---

## 🖱️ Méthode 3 : Utiliser GitHub Desktop (Plus Simple)

Si tu préfères une interface graphique :

1. **Télécharge GitHub Desktop** : [https://desktop.github.com](https://desktop.github.com)
2. **Installe-le** et connecte-toi avec ton compte GitHub
3. **File** > **Add Local Repository**
4. Sélectionne : `C:\Users\ASUS\Desktop\MONEY\wallpaper-hub`
5. **Publish repository** pour le mettre sur GitHub

---

## ⚠️ Erreurs Courantes

### Erreur : "git is not recognized"
- Git n'est pas installé
- Télécharge-le : [https://git-scm.com/download/win](https://git-scm.com/download/win)
- Réinstalle et redémarre PowerShell

### Erreur : "remote origin already exists"
- Le repository est déjà connecté
- Utilise : `git remote set-url origin https://github.com/TON-USERNAME/wallpaper-hub.git`

### Erreur : "authentication failed"
- GitHub te demandera de te connecter
- Utilise un **Personal Access Token** au lieu du mot de passe
- Guide : [https://docs.github.com/en/authentication](https://docs.github.com/en/authentication)

---

## 📋 Exemple Complet

Voici un exemple si ton username GitHub est `onlydias` :

```powershell
# 1. Aller dans le dossier
cd C:\Users\ASUS\Desktop\MONEY\wallpaper-hub

# 2. Vérifier le statut
git status

# 3. Connecter à GitHub (remplace onlydias par ton username)
git remote add origin https://github.com/onlydias/wallpaper-hub.git

# 4. Changer la branche
git branch -M main

# 5. Envoyer sur GitHub
git push -u origin main
```

---

## ✅ Comment Savoir si ça a Fonctionné

Après `git push -u origin main`, tu devrais voir :
```
Enumerating objects: 245, done.
Counting objects: 100% (245/245), done.
...
To https://github.com/TON-USERNAME/wallpaper-hub.git
 * [new branch]      main -> main
```

Ensuite, va sur GitHub et vérifie que ton code est bien là !
