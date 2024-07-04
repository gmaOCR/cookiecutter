import * as OBC from "@thatopen/components";
import { components } from '../components/scene';


export async function initializeClipper() {
    try {
      const casters = components.get(OBC.Raycasters);

    //   console.log("Raycasters activated successfully.");
  
      const clipper = components.get(OBC.Clipper);
      // console.log("Clipper activated successfully.");
  
      return { clipper, casters };
    } catch (error) {
      console.error("Failed to add clipper and casters to components:", error);
      return null;
    }
  }