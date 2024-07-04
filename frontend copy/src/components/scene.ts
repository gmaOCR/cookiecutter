import * as OBC from "@thatopen/components";
import { initializeClipper } from '../components/clipper';


const container = document.getElementById("app")!;

const components = new OBC.Components();

const worlds = components.get(OBC.Worlds);

const world = worlds.create<
  OBC.SimpleScene,
  OBC.SimpleCamera,
  OBC.SimpleRenderer
>();

world.scene = new OBC.SimpleScene(components);
world.renderer = new OBC.SimpleRenderer(components, container);
world.camera = new OBC.SimpleCamera(components);

components.init();

world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);

world.scene.setup();

const grids = components.get(OBC.Grids);
grids.create(world);

world.scene.three.background = null;

const fragments = components.get(OBC.FragmentsManager);
const fragmentIfcLoader = components.get(OBC.IfcLoader);


export async function initClipperInScene() {
  const result = await initializeClipper();
  if (result) {
    const { clipper, casters } = result;
    // console.log('Clipper:', clipper);
    // console.log('Casters:', casters);

    clipper.enabled = true;
    console.log('Clipper enabled');
    casters.get(world);
    console.log('Casters get the world');

    if (container) {
      // console.log("Container found:", container); 
      container.ondblclick = () => {
        // console.log("Double click detected");
        if (clipper.enabled) {
          clipper.create(world);
          // console.log("Clipper is created:", clipper)
        } else {
          console.log("Clipper is not enabled");
      }
    };
    } else {
      console.error("Container not found.");
    };
    window.onkeydown = (event) => {
      if (event.code === "Delete" || event.code === "Backspace") {
        if (clipper.enabled) {
          clipper.delete(world);
        }
      }
    };
    return clipper;
  } else {
    console.error("Initialization failed.");
  }
}

// initClipperInScene();

export { world };
export { fragments };
export { fragmentIfcLoader };
export { components };
