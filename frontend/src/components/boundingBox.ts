import * as OBC from "@thatopen/components";
import { getModel } from "./loadFragments";
import { components } from "./scene"

export async function initializeFragmentBbox() {
    try {
      const fragmentBbox = components.get(OBC.BoundingBoxer);
      // console.log("Chargement des fragments",fragmentBbox)
      const model = await getModel();
      fragmentBbox.add(model);
      // console.log("Model added to fragmentBbox:", model);
      const bbox = fragmentBbox.getMesh();
      fragmentBbox.reset();
      console.log("BoundingBox mesh retrieved and reset successfully.");
      return bbox;
    } catch (error) {
      console.error("Failed to add model to fragmentBbox:", error);
      return null;
    }
  }
  

