// import * as CUI from "@thatopen/ui-obc";
// import components from "@thatopen/components"

// const [classificationsTree, updateClassificationsTree] =
//   CUI.tables.classificationTree({
//     components,
//     classifications: {},
//   });

//   const classifier = components.get(OBC.Classifier);

//   fragmentsManager.onFragmentsLoaded.add(async (model) => {
//     // This creates a classification system named "entities"
//     classifier.byEntity(model);
  
//     // This creates a classification system named "predefinedTypes"
//     await classifier.byPredefinedType(model);
  
//     const classifications = {
//       Entities: ["entities"],
//       "Predefined Types": ["predefinedTypes"],
//     };
  
//     updateClassificationsTree({ classifications });
//   });