# Commandes pour le projet React

## Création de l'app 
```bash=
npx create-expo-app@latest --template default@sdk-54
```

Ensuite déplacez vous dans le dossier de votre projet


-> Soit on utilise un émulateur sur le PC pour tester l'app soit on installe Expo Go sur son téléphone (Android, IOS, etc)

Scanne le QR Code de ton app avec Expo GO

## Expo Router
- Permet de  créer des pages de navigation avec la commande suivante

```bash=
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar expo-blur
```

Créez un dossier app à la racine de ton projet. Chaque fichier mis dans ce dossier deviendra automatiquement une page dans ton app.
Par exemple, `app/index.tsx` sera la page d'accueil.

## Mise à jour des dépendances 
```bash=
npm outdated
npm update
```

## Création d'un lien entre l'application et le site internet expo

npm install --global eas-cli
eas init --id {PUT_YOUR_ID}

## Retirer les templates de base du projet
```bash=
npm run reset-project
```

## Lancer le projet 

```bash=
cd .\training-app\
npm start
```

---

Utilisation de cache en mémoire (RAM)?
- Le catalogue est gardé tant que l'application est ouverte
- Il disparaît à la fermeture ou au rechargement complet
- Souvent acceptable (dans les cas où on ne veut pas de stockage en local)