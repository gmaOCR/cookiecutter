import 'vite/modulepreload-polyfill';

// Entry point for CSS styles
import "../styles/app.css";

window.onload = () => {
    import("../../src/components/scene").then(module => {
        console.log("Le module scene.ts a été chargé avec succès !");
    }).catch(error => {
        console.error("Erreur lors du chargement du module scene.ts :", error);
    });

    import("../../src/obc/panel").then(module => {
        console.log("Le module panel.ts a été chargé avec succès !");
        // Appeler une fonction ou faire autre chose avec le module panel.ts si nécessaire
    }).catch(error => {
        console.error("Erreur lors du chargement du module panel.ts :", error);
    });

  
    import("../../src/components/loadFragments").then(module => {
        console.log("Le module loadFragments.ts a été chargé avec succès !");
        // Appeler une fonction ou faire autre chose avec le module loadFragments.ts si nécessaire
    }).catch(error => {
        console.error("Erreur lors du chargement du module loadFragments.ts :", error);
    });

    import("../../src/components/boundingBox").then(module => {
        console.log("Le module boundingBox.ts a été chargé avec succès !");
        // Appeler une fonction ou faire autre chose avec le module boundingBox.ts si nécessaire
    }).catch(error => {
        console.error("Erreur lors du chargement du module boundingBox.ts :", error);
    });

    
  };
  