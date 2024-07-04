import * as BUI from "@thatopen/ui";
import * as CUI from '@thatopen/ui-obc'
import { loadIfc, exportFragments, disposeFragments } from '../components/loadFragments';
import * as Effect from '../components/meshEffects';
import { world } from '../components/scene';
import { initializeFragmentBbox } from '../components/boundingBox';
import { initClipperInScene } from '../components/scene';
import { initPropTables, initIndexer } from './elementProperties';

// Initialisation du gestionnaire d'UI BUI
BUI.Manager.init();

let bbox: any;
let clipper: any;


// Fonction pour initialiser bbox et créer le panneau de contrôle
async function initPanel() {
  try {
    bbox = await initializeFragmentBbox(); 
    if (!bbox) {
      throw new Error("BBox is undefined");
    }
    // console.log("BBox initialisée:", bbox);

    clipper = await initClipperInScene();
    
    if (!clipper) {
      throw new Error("Clipper is undefined");
    }
    // console.log("Clipper initialisée:", clipper);


    // Création du panneau de contrôle UI
    const panel = BUI.Component.create(() => {
      return BUI.html`
        <bim-panel active label="Menu" class="options-menu">
          <bim-panel-section collapsed label="IFC/Fragments">
            <bim-panel-section style="padding-top: 12px;">
              <bim-button label="Load IFC"
                @click="${() => {
                  loadIfc();
                }}">
              </bim-button>  
                  
              <bim-button label="Export fragments"
                @click="${() => {
                  exportFragments();
                }}">
              </bim-button>  
                  
              <bim-button label="Dispose fragments"
                @click="${() => {
                  disposeFragments();
                }}">
              </bim-button>
            </bim-panel-section>
          </bim-panel-section>

          <bim-panel-section collapsed label="Controls">
            <bim-panel-section style="padding-top: 12px;">
            <bim-button 
              label="Fit BIM model" 
              @click="${() => {
                world.camera.controls.fitToSphere(bbox, true);
              }}">  
            </bim-button>  
            </bim-panel-section>
        <bim-checkbox label="Clipper enabled" checked 
              @change="${({ target }: { target: BUI.Checkbox }) => {
                if (clipper) {
                  clipper.enabled = target.checked;
                }
              }}">
        </bim-checkbox>
        
        <bim-checkbox label="Clipper visible" checked 
              @change="${({ target }: { target: BUI.Checkbox }) => {
                if (clipper) {
                  clipper.visible = target.checked;
                }
              }}">
        </bim-checkbox>

          </bim-panel-section>

          <bim-panel-section collapsed label="Effects">
            <bim-panel-section style="padding-top: 12px;">
            
              <bim-color-input
                label="Background Color" color="#202932" 
                @input="${(event: CustomEvent) => {
                  const target = event.target as BUI.ColorInput;
                  Effect.changeBackgroundColor(target);
                }}">
              </bim-color-input>

              <bim-number-input 
                slider step="0.1" label="Ambient Light Intensity" value="1.0" min="0.1" max="5"
                @change="${(event: CustomEvent) => {
                  const target = event.target as BUI.NumberInput;
                  Effect.changeAmbientLightIntensity(target);
                }}">
              </bim-number-input>
                  
              <bim-number-input 
                slider step="0.1" label="Directional Light Intensity" value="1.5" min="0.1" max="10"
                @change="${(event: CustomEvent) => {
                  const target = event.target as BUI.NumberInput;
                  Effect.changeDirectionalLightIntensity(target);
                }}">
              </bim-number-input>
                  
            </bim-panel-section>
          </bim-panel-section>
        </bim-panel>
      `;
    });

    document.body.append(panel);

  } catch (error) {
    console.error("Failed to initialize the panel", error);
  }
}

async function initProperties() {

  try {
    const propTables = await initPropTables();
    if (propTables) {
      const { propertiesTable, updatePropertiesTable, highlighter } = propTables;
      console.log("Tables des propriétés:", propertiesTable);
      console.log("Fonction de mise à jour des tables des propriétés:", updatePropertiesTable);
      // console.log("Highlighter:", highlighter);

      const propertiesPanel = BUI.Component.create(() => {
        const onTextInput = (e: Event) => {
          const input = e.target as BUI.TextInput;
          propertiesTable.queryString = input.value !== "" ? input.value : null;
        };

        const expandTable = (e: Event) => {
          const button = e.target as BUI.Button;
          propertiesTable.expanded = !propertiesTable.expanded;
          button.label = propertiesTable.expanded ? "Collapse" : "Expand";
        };

        const copyAsTSV = async () => {
          await navigator.clipboard.writeText(propertiesTable.tsv);
        };

        return BUI.html`
          <bim-panel label="Properties">
            <bim-panel-section label="Element Data">
              <div style="display: flex; gap: 0.5rem;">
                <bim-button @click=${expandTable} label=${propertiesTable.expanded ? "Collapse" : "Expand"}></bim-button> 
                <bim-button @click=${copyAsTSV} label="Copy as TSV"></bim-button> 
              </div> 
              <bim-text-input @input=${onTextInput} placeholder="Search Property" debounce="250"></bim-text-input>
              ${propertiesTable}
            </bim-panel-section>
          </bim-panel>
        `;
      });

      const viewport = document.createElement("bim-viewport");

      const app = document.createElement("bim-grid");
      app.layouts = {
        main: {
          template: `
            "propertiesPanel viewport"
            /25rem 1fr
          `,
          elements: { propertiesPanel, viewport },
        },
      };

      app.layout = "main";
      document.body.append(app);
    } else {
      console.error("Échec de l'initialisation des tables des propriétés.");
    }
  } catch (error) {
    console.error("Failed to initialize the properties panel", error);
  }
}



// Appel de la fonction d'initialisation
// initIndexer();

initProperties();
initPanel();
