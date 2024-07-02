import * as BUI from "@thatopen/ui";

export const statelessPanelSection = BUI.Component.create<BUI.PanelSection>(() => {
  return BUI.html`
    <bim-panel-section label="Stateless Panel Section">
      <bim-color-input label="Color"></bim-color-input>
    </bim-panel-section>
  `;
});
