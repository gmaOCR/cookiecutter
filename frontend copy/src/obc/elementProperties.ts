import * as OBC from "@thatopen/components";
import * as CUI from '@thatopen/ui-obc'
import * as OBF from '@thatopen/components-front'

import { components, world } from "../components/scene";
import { getModel } from "../components/loadFragments";

export async function initIndexer() {
    try{
        const indexer = components.get(OBC.IfcRelationsIndexer);
        const model = await getModel();
        await indexer.process(model);
        console.log("Indexer successfully loaded.");
        return indexer;
    }   catch (error) {
        console.error("Failed to load indexer:", error);
        return null;
        }
    }   

export async function initPropTables() {
    try {
      console.log("Initialisation des tables des propriétés...");
      
      const [propertiesTable, updatePropertiesTable] = CUI.tables.elementProperties({
        components,
        fragmentIdMap: {},
      });
      
      propertiesTable.preserveStructureOnFilter = true;
      propertiesTable.indentationInText = false;
      console.log("Configuration des propriétés de la table des propriétés...");
  
      const highlighter = components.get(OBF.Highlighter);
      highlighter.setup({ world });
      console.log("Highlighter configuré avec succès...");
  
      highlighter.events.select.onHighlight.add((fragmentIdMap) => {
        // console.log("Fragment mis en surbrillance :", fragmentIdMap);
        updatePropertiesTable({ fragmentIdMap });
      });
  
      highlighter.events.select.onClear.add(() => {
        // console.log("Surbrillance effacée...");
        updatePropertiesTable({ fragmentIdMap: {} });
      });
  
      console.log("Initialisation des tables des propriétés terminée avec succès...");
      return { propertiesTable, updatePropertiesTable, highlighter };
    } catch (error) {
      console.error("Erreur lors de l'initialisation des tables des propriétés :", error);
      return null;
    }
  }
      