import * as WEBIFC from "web-ifc";
import Stats from "stats.js";
import { fragmentIfcLoader, fragments, world } from './scene';


let model: any = null;

async function configureAndSetupLoader() {
  try {
    await fragmentIfcLoader.setup();
    
    const excludedCats = [
      WEBIFC.IFCTENDONANCHOR,
      WEBIFC.IFCREINFORCINGBAR,
      WEBIFC.IFCREINFORCINGELEMENT,
    ];

    for (const cat of excludedCats) {
      fragmentIfcLoader.settings.excludedCategories.add(cat);
    }

    fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;

    console.log("fragmentIfcLoader setup completed successfully!");
  } catch (error) {
    console.error("Error during fragmentIfcLoader setup:", error);
    // Gestion des erreurs : affichez ou traitez l'erreur selon vos besoins
  }
}

export async function loadIfc() {
  try {
    const file = await fetch(
      "https://thatopen.github.io/engine_components/resources/small.ifc",
    );
    // console.log("Fichier IFC récupéré");
    const data = await file.arrayBuffer();
    // console.log("Conversion du fichier en ArrayBuffer réussie");
    const buffer = new Uint8Array(data);
    // console.log("Conversion en Uint8Array réussie");
    model = await fragmentIfcLoader.load(buffer);
    // console.log("Chargement du modèle IFC réussi");
    model.name = "example";

    // Vérifiez que world.renderer est défini avant d'accéder à world.scene.three
    if (world.renderer) {
      world.scene.three.add(model);
      world.meshes.add(model);
    } else {
      console.warn("world.renderer is null or undefined. Model not added to scene.");
    }
  } catch (error) {
    console.error("Error loading IFC:", error);
    // Gestion des erreurs : affichez ou traitez l'erreur selon vos besoins
  }
}

// Événement lors du chargement des fragments
fragments.onFragmentsLoaded.add((model) => {
  console.log("Fragments loaded:", model);
});

// Fonction pour télécharger un fichier
export function download(file: File) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// Fonction asynchrone pour exporter les fragments
export async function exportFragments() {
  try {
    if (!fragments.groups.size) {
      return;
    }

    const group = Array.from(fragments.groups.values())[0];
    const data = fragments.export(group);
    download(new File([new Blob([data])], "small.frag"));

    const properties = group.getLocalProperties();
    if (properties) {
      download(new File([JSON.stringify(properties)], "small.json"));
    }
  } catch (error) {
    console.error("Error exporting fragments:", error);
    // Gestion des erreurs : affichez ou traitez l'erreur selon vos besoins
  }
}

// Fonction pour libérer les fragments
export function disposeFragments() {
  fragments.dispose();
}

// Initialisation de Stats.js pour mesurer les performances
const stats = new Stats();
stats.showPanel(2);
document.body.append(stats.dom);
stats.dom.style.left = "0px";
stats.dom.style.zIndex = "unset";
if (world.renderer) {
  world.renderer.onBeforeUpdate.add(() => stats.begin());
  world.renderer.onAfterUpdate.add(() => stats.end());
} else {
  console.warn("world.renderer is null or undefined. Stats panel not initialized.");
}

export async function getModel() {
  if (!model) {
    await loadIfc();
  }
  return model;
}

configureAndSetupLoader()