import * as BUI from "@thatopen/ui";

interface PanelSectionUIState {
  label: string;
  counter: number;
}

export const [statefullPanelSection, updateStatefullPanelSection] =
  BUI.Component.create<BUI.PanelSection, PanelSectionUIState>(
    (state: PanelSectionUIState) => {
      const { label, counter } = state;
      const msg = `This panel section has been updated ${counter} ${counter === 1 ? "time" : "times"}`;
      return BUI.html`
      <bim-panel-section label=${label}>
        <bim-label>${msg}</bim-label>
      </bim-panel-section>
    `;
    },
    { label: "Statefull Panel Section", counter: 0 },
  );
