import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders } from "../../tests/commonTests";
import { dragAndDrop } from "../../tests/utils";

describe("calcite-sortable-list", () => {
  it("renders", async () => renders("calcite-sortable-list"));

  it("honors hidden attribute", async () => hidden("calcite-sortable-list"));

  it("is accessible", async () => accessible(`<calcite-sortable-list></calcite-sortable-list>`));

  describe("drag and drop", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage({
        html: `<calcite-sortable-list>
        <div id="one"><calcite-handle></calcite-handle>1</div>
        <div id="two"><calcite-handle></calcite-handle>2</div>
        <div id="three"><calcite-handle></calcite-handle>3</div>
      </calcite-sortable-list>`
      });
    });

    it("works using a mouse", async () => {
      await dragAndDrop(page, `#one calcite-handle`, `#two calcite-handle`);

      const [first, second] = await page.findAll("div");
      expect(await first.getProperty("id")).toBe("two");
      expect(await second.getProperty("id")).toBe("one");
    });

    it("works using a keyboard", async () => {
      await page.keyboard.press("Tab");
      await page.keyboard.press("Space");
      await page.waitForChanges();
      await page.keyboard.press("ArrowDown");
      const itemsAfter = await page.findAll("div");
      expect(await itemsAfter[0].getProperty("id")).toBe("two");
      expect(await itemsAfter[1].getProperty("id")).toBe("one");
    });
  });
});
