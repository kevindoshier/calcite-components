import { select } from "@storybook/addon-knobs";
import { darkBackground } from "../../../.storybook/utils";
import { boolean } from "../../../.storybook/helpers";
import { html } from "../../tests/utils";

export default {
  title: "Components/Tile Select Group"
};

export const Light = (): string => html`
  <calcite-tile-select-group>
    <calcite-tile-select
      checked
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${boolean("show-input", false)}
      input-alignment="${select("input-alignment", ["start", "end"], "start")}"
      type="${select("type", ["radio", "checkbox"], "radio")}"
      value="one"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${boolean("show-input", false)}
      input-alignment="${select("input-alignment", ["start", "end"], "start")}"
      type="${select("type", ["radio", "checkbox"], "radio")}"
      value="two"
    >
    </calcite-tile-select>
    <calcite-tile-select
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${boolean("show-input", false)}
      input-alignment="${select("input-alignment", ["start", "end"], "start")}"
      type="${select("type", ["radio", "checkbox"], "radio")}"
      value="three"
    >
    </calcite-tile-select>
    <calcite-tile-select
      checked
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
      icon="layers"
      name="light"
      ${boolean("show-input", false)}
      input-alignment="${select("input-alignment", ["start", "end"], "start")}"
      type="${select("type", ["radio", "checkbox"], "radio")}"
      value="four"
    >
    </calcite-tile-select>
  </calcite-tile-select-group>
`;

export const Dark = (): string => html`
<calcite-tile-select-group>
  <calcite-tile-select
    checked
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    icon="layers"
    name="dark"
    input-alignment="${select("show-input", ["left", "right", "none"], "left")}"
    theme="dark"
    type="${select("type", ["radio", "checkbox"], "radio")}"
    value="one"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    name="dark"
    input-alignment="${select("show-input", ["left", "right", "none"], "left")}"
    theme="dark"
    type="${select("type", ["radio", "checkbox"], "radio")}"
    value="two"
  >
  </calcite-tile-select>
  <calcite-tile-select
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum"
    icon="layers"
    name="dark"
    input-alignment="${select("show-input", ["left", "right", "none"], "left")}"
    theme="dark"
    type="${select("type", ["radio", "checkbox"], "radio")}"
    value="three"
  >
  </calcite-tile-select>
  <calcite-tile-select
    checked
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
    heading="Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    icon="layers"
    name="dark"
    input-alignment="${select("show-input", ["left", "right", "none"], "left")}"
    theme="dark"
    type="${select("type", ["radio", "checkbox"], "radio")}"
    value="four"
  >
</calcite-tile-select-group>
`;

Dark.story = {
  parameters: { backgrounds: darkBackground }
};
