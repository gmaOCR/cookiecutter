import * as BUI from "@thatopen/ui";
import { loadIfc, exportFragments, disposeFragments } from '../components/loadFragments';
import * as Effect from '../components/meshEffects';
import { world } from '../components/scene';
import { initializeFragmentBbox } from '../components/boundingBox';
import { initClipperInScene } from '../components/scene';

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
    console.log("Clipper", clipper)
    
    if (!clipper) {
      throw new Error("Clipper is undefined");
    }
    console.log("Clipper initialisée:", clipper);


    // Création du panneau de contrôle UI
    const panel = BUI.Component.create<BUI.PanelSection>(() => {
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

    // Création d'un bouton pour le menu sur mobile
    // const button = BUI.Component.create<BUI.PanelSection>(() => {
    //   return BUI.html`
    //     <bim-button class="phone-menu-toggler" icon="solar:settings-bold"
    //       @click="${() => {
    //         if (panel.classList.contains("options-menu-visible")) {
    //           panel.classList.remove("options-menu-visible");
    //         } else {
    //           panel.classList.add("options-menu-visible");
    //         }
    //       }}">
    //     </bim-button>
    //   `;
    // });

    // document.body.append(button);

  } catch (error) {
    console.error("Failed to initialize the panel", error);
  }
}

// Appel de la fonction d'initialisation
initPanel();
