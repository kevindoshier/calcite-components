import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";

import { CSS, DEFAULT_STORAGE_KEY_PREFIX, DIMENSIONS, TEXT } from "./resources";
import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { ColorValue } from "./interfaces";
import SpyInstance = jest.SpyInstance;

describe("calcite-color", () => {
  it("is accessible", async () => {
    await accessible("calcite-color");
    await accessible("<calcite-color allow-empty value=''></calcite-color>");
  });

  it("can be hidden", async () => hidden("calcite-color"));

  it("reflects", async () =>
    reflects("calcite-color", [
      {
        propertyName: "appearance",
        value: "minimal"
      },
      {
        propertyName: "scale",
        value: "m"
      },
      {
        propertyName: "theme",
        value: "light"
      }
    ]));

  it("renders", async () => renders("calcite-color"));

  it("has defaults", async () =>
    defaults("calcite-color", [
      {
        propertyName: "allowEmpty",
        defaultValue: false
      },
      {
        propertyName: "appearance",
        defaultValue: "default"
      },
      {
        propertyName: "format",
        defaultValue: "auto"
      },
      {
        propertyName: "intlB",
        defaultValue: TEXT.b
      },
      {
        propertyName: "intlBlue",
        defaultValue: TEXT.blue
      },
      {
        propertyName: "intlDeleteColor",
        defaultValue: TEXT["deleteColor"]
      },
      {
        propertyName: "intlG",
        defaultValue: TEXT.g
      },
      {
        propertyName: "intlGreen",
        defaultValue: TEXT.green
      },
      {
        propertyName: "intlH",
        defaultValue: TEXT.h
      },
      {
        propertyName: "intlHsv",
        defaultValue: TEXT["hsv"]
      },
      {
        propertyName: "intlHex",
        defaultValue: TEXT.hex
      },
      {
        propertyName: "intlHue",
        defaultValue: TEXT.hue
      },
      {
        propertyName: "intlNoColor",
        defaultValue: TEXT.noColor
      },
      {
        propertyName: "intlR",
        defaultValue: TEXT.r
      },
      {
        propertyName: "intlRed",
        defaultValue: TEXT.red
      },
      {
        propertyName: "intlRgb",
        defaultValue: TEXT.rgb
      },
      {
        propertyName: "intlS",
        defaultValue: TEXT.s
      },
      {
        propertyName: "intlSaturation",
        defaultValue: TEXT.saturation
      },
      {
        propertyName: "intlSaveColor",
        defaultValue: TEXT.saveColor
      },
      {
        propertyName: "intlSaved",
        defaultValue: TEXT.saved
      },
      {
        propertyName: "intlV",
        defaultValue: TEXT.v
      },
      {
        propertyName: "intlValue",
        defaultValue: TEXT.value
      },
      {
        propertyName: "scale",
        defaultValue: "m"
      },
      {
        propertyName: "theme",
        defaultValue: "light"
      },
      {
        propertyName: "value",
        defaultValue: "#007ac2"
      }
    ]));

  it("emits color selection change", async () => {
    const page = await newE2EPage({
      html: "<calcite-color></calcite-color>"
    });
    const picker = await page.find("calcite-color");

    const spy = await picker.spyOnEvent("calciteColorChange");

    picker.setProperty("value", "#FF00FF");
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });

  const supportedFormatToSampleValue = {
    hex: "#ffffff",
    "rgb-css": "rgb(255, 255, 255)",
    "hsl-css": "hsl(0, 0%, 100%)",
    rgb: { r: 255, g: 255, b: 255 },
    hsl: { h: 0, s: 0, l: 100 },
    hsv: { h: 0, s: 0, v: 100 }
  };

  describe("color format", () => {
    it("allows specifying the color value format", async () => {
      const page = await newE2EPage({
        html: "<calcite-color></calcite-color>"
      });

      const color = await page.find("calcite-color");

      for (const format in supportedFormatToSampleValue) {
        const expectedValue = supportedFormatToSampleValue[format];

        // set base format and value to test setting different format values
        color.setProperty("format", format);
        color.setProperty("value", expectedValue);
        await page.waitForChanges();

        for (const format in supportedFormatToSampleValue) {
          const currentTestValue = supportedFormatToSampleValue[format];
          color.setProperty("value", currentTestValue);
          await page.waitForChanges();

          // non-matching formats are ignored
          expect(await color.getProperty("value")).toEqual(expectedValue);
        }
      }
    });

    it("changing format updates value", async () => {
      const page = await newE2EPage({
        html: `<calcite-color value=${supportedFormatToSampleValue["hex"]}></calcite-color>`
      });
      const color = await page.find("calcite-color");

      for (const format in supportedFormatToSampleValue) {
        color.setProperty("format", format);
        await page.waitForChanges();

        expect(await color.getProperty("value")).toEqual(supportedFormatToSampleValue[format]);
      }
    });
  });

  it("accepts multiple color value formats", async () => {
    const page = await newE2EPage({
      html: "<calcite-color></calcite-color>"
    });
    const picker = await page.find("calcite-color");
    const spy = await picker.spyOnEvent("calciteColorChange");

    const supportedStringFormats = [
      supportedFormatToSampleValue.hex,
      supportedFormatToSampleValue["rgb-css"],
      supportedFormatToSampleValue["hsl-css"]
    ];

    for (const value of supportedStringFormats) {
      picker.setProperty("value", value);
      await page.waitForChanges();

      expect(await picker.getProperty("value")).toBe(value);
    }

    const supportedObjectFormats = [
      supportedFormatToSampleValue.rgb,
      supportedFormatToSampleValue.hsl,
      supportedFormatToSampleValue.hsv
    ];

    for (const value of supportedObjectFormats) {
      picker.setProperty("value", value);
      await page.waitForChanges();

      expect(await picker.getProperty("value")).toMatchObject(value);
    }

    expect(spy).toHaveReceivedEventTimes(supportedStringFormats.length + supportedObjectFormats.length);
  });

  it("allows selecting colors via color field/slider", async () => {
    const page = await newE2EPage({
      html: "<calcite-color value='#000' scale='m'></calcite-color>"
    });
    const picker = await page.find(`calcite-color`);
    const spy = await picker.spyOnEvent("calciteColorChange");
    let changes = 0;
    const mediumScaleDimensions = DIMENSIONS.m;
    const widthOffset = 0.5;
    const [fieldAndSliderX, fieldAndSliderY] = await page.evaluate(() => {
      const color = document.querySelector("calcite-color");
      const fieldAndSliderArea = color.shadowRoot.querySelector("canvas");
      const { x, y } = fieldAndSliderArea.getBoundingClientRect();

      return [x, y];
    });

    // clicking color field colors to pick a color
    await page.mouse.click(fieldAndSliderX, fieldAndSliderY);
    expect(await picker.getProperty("value")).toBe("#ffffff");
    expect(spy).toHaveReceivedEventTimes(++changes);

    await page.mouse.click(fieldAndSliderX, fieldAndSliderY + mediumScaleDimensions.colorField.height);
    expect(await picker.getProperty("value")).toBe("#000000");
    expect(spy).toHaveReceivedEventTimes(++changes);

    await page.mouse.click(fieldAndSliderX + mediumScaleDimensions.colorField.width - widthOffset, fieldAndSliderY);
    expect(await picker.getProperty("value")).toBe("#ff0000");
    expect(spy).toHaveReceivedEventTimes(++changes);

    await page.mouse.click(
      fieldAndSliderX + mediumScaleDimensions.colorField.width - widthOffset,
      fieldAndSliderY + mediumScaleDimensions.colorField.height
    );
    expect(await picker.getProperty("value")).toBe("#000000");
    expect(spy).toHaveReceivedEventTimes(++changes);

    // set to corner right value that's not red (first value)
    picker.setProperty("value", "#ff0");
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(++changes);

    // clicking on color slider to set hue
    const colorsToSample = 7;
    const offsetX = (mediumScaleDimensions.slider.width - widthOffset) / colorsToSample;
    let x = fieldAndSliderX;

    const sliderHeight =
      fieldAndSliderY + mediumScaleDimensions.colorField.height + mediumScaleDimensions.slider.height;

    const expectedColorSamples = [
      "#ff0000",
      "#ffdb00",
      "#47ff00",
      "#00ff8e",
      "#0094ff",
      "#4700ff",
      "#ff00db",
      "#ff0000"
    ];

    for (let i = 0; i < expectedColorSamples.length; i++) {
      const expectedColor = expectedColorSamples[i];

      await page.mouse.click(x, sliderHeight);
      expect(await picker.getProperty("value")).toBe(expectedColor);
      expect(spy).toHaveReceivedEventTimes(++changes);

      x += offsetX;
    }
  });

  describe("unsupported value handling", () => {
    let page: E2EPage;
    let consoleSpy: SpyInstance;

    async function assertUnsupportedValue(page: E2EPage, unsupportedValue: string | null): Promise<void> {
      const picker = await page.find("calcite-color");
      const spy = await picker.spyOnEvent("calciteColorChange");
      const currentValue = await picker.getProperty("value");
      picker.setProperty("value", unsupportedValue);
      await page.waitForChanges();

      expect(await picker.getProperty("value")).toBe(currentValue);
      expect(spy).toHaveReceivedEventTimes(0);

      expect(consoleSpy).toBeCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(`ignoring invalid color value: ${unsupportedValue}`)
      );
    }

    beforeEach(async () => {
      page = await newE2EPage({
        html: "<calcite-color></calcite-color>"
      });
      consoleSpy = jest.spyOn(console, "warn");
    });

    afterEach(() => jest.clearAllMocks());

    it("ignores unsupported value types", () => assertUnsupportedValue(page, "unsupported-color-format"));

    it("ignores null when not allowed", () => assertUnsupportedValue(page, null));
  });

  it("normalizes shorthand CSS hex", async () => {
    const page = await newE2EPage({
      html: "<calcite-color></calcite-color>"
    });
    const picker = await page.find("calcite-color");

    picker.setProperty("value", "#ABC");
    await page.waitForChanges();

    expect(await picker.getProperty("value")).toBe("#aabbcc");
  });

  it("has backdoor color prop for advanced use cases", async () => {
    const page = await newE2EPage({
      html: "<calcite-color></calcite-color>"
    });
    const picker = await page.find("calcite-color");

    expect(await picker.getProperty("color")).toBeTruthy();
  });

  describe("initial value used to initialize internal color", () => {
    const initialColor = supportedFormatToSampleValue.hex;

    async function getInternalColorAsHex(page: E2EPage): Promise<string> {
      return page.$eval("calcite-color", (picker: HTMLCalciteColorElement) => picker.color.hex().toLowerCase());
    }

    it("value as attribute", async () => {
      const page = await newE2EPage({
        html: `<calcite-color value="${initialColor}"></calcite-color>`
      });

      expect(await getInternalColorAsHex(page)).toBe(initialColor);
    });

    it("value as property", async () => {
      // initialize page with calcite-color to make it available in the evaluate callback below
      const page = await newE2EPage({
        html: "<calcite-color></calcite-color>"
      });
      await page.setContent("");

      await page.evaluate(async (color) => {
        const picker = document.createElement("calcite-color");
        picker.value = color;
        document.body.append(picker);

        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      }, initialColor);

      expect(await getInternalColorAsHex(page)).toBe(initialColor);
    });
  });

  describe("color inputs", () => {
    const clearAndEnterValue = async (page: E2EPage, inputOrHexInput: E2EElement, value: string): Promise<void> => {
      await inputOrHexInput.callMethod("setFocus");
      await page.waitForChanges();

      const currentValue = await inputOrHexInput.getProperty("value");

      for (let i = 0; i < currentValue.length; i++) {
        await page.keyboard.press("Backspace");
        await page.waitForChanges();
      }

      await inputOrHexInput.type(value);
      await page.waitForChanges();

      await page.keyboard.press("Enter");
      await page.waitForChanges();
    };

    describe("keeps value in same format when applying updates", () => {
      let page: E2EPage;
      let picker: E2EElement;

      beforeEach(async () => {
        page = await newE2EPage({
          html: "<calcite-color></calcite-color>"
        });
        picker = await page.find("calcite-color");
      });

      const updateColorWithAllInputs = async (assertColorUpdate: (value: ColorValue) => void): Promise<void> => {
        const hexInput = await page.find(`calcite-color >>> calcite-color-hex-input`);

        await clearAndEnterValue(page, hexInput, "abc");

        assertColorUpdate(await picker.getProperty("value"));

        const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

        await rgbModeButton.click();
        await page.waitForChanges();

        const [rInput, gInput, bInput, hInput, sInput, vInput] = await page.findAll(
          `calcite-color >>> calcite-input.${CSS.channel}`
        );

        await clearAndEnterValue(page, rInput, "128");
        await clearAndEnterValue(page, gInput, "64");
        await clearAndEnterValue(page, bInput, "32");

        assertColorUpdate(await picker.getProperty("value"));

        await hsvModeButton.click();
        await page.waitForChanges();

        await clearAndEnterValue(page, hInput, "180");
        await clearAndEnterValue(page, sInput, "90");
        await clearAndEnterValue(page, vInput, "45");

        assertColorUpdate(await picker.getProperty("value"));
      };

      // see https://jasmine.github.io/tutorials/custom_argument_matchers for more info
      function toBeInteger(): any {
        return {
          asymmetricMatch(abc): boolean {
            return Number.isInteger(abc);
          },

          jasmineToString(): string {
            return `Expected value to be an integer.`;
          }
        };
      }

      it("supports hex", async () => {
        const hex = supportedFormatToSampleValue.hex;
        picker.setProperty("value", hex);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toBe(hex);
          expect(value).toMatch(/^#[a-f0-9]{6}$/);
        });
      });

      it("supports rgb", async () => {
        const rgbCss = supportedFormatToSampleValue["rgb-css"];
        picker.setProperty("value", rgbCss);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toBe(rgbCss);
          expect(value).toMatch(/^rgb\(\d+, \d+, \d+\)/);
        });
      });

      it("supports hsl", async () => {
        const hslCss = supportedFormatToSampleValue["hsl-css"];
        picker.setProperty("value", hslCss);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toBe(hslCss);
          expect(value).toMatch(/^hsl\([0-9.]+, [0-9.]+%, [0-9.]+%\)/);
        });
      });

      it("supports rgb (object)", async () => {
        const rgbObject = supportedFormatToSampleValue.rgb;
        picker.setProperty("value", rgbObject);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toMatchObject(rgbObject);
          expect(value).toMatchObject({
            r: toBeInteger(),
            g: toBeInteger(),
            b: toBeInteger()
          });
        });
      });

      it("supports hsl (object)", async () => {
        const hslObject = supportedFormatToSampleValue.hsl;
        picker.setProperty("value", hslObject);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toMatchObject(hslObject);
          expect(value).toMatchObject({
            h: toBeInteger(),
            s: toBeInteger(),
            l: toBeInteger()
          });
        });
      });

      it("supports hsv (object)", async () => {
        const hsvObject = supportedFormatToSampleValue.hsv;
        picker.setProperty("value", hsvObject);
        await page.waitForChanges();

        await updateColorWithAllInputs((value: ColorValue) => {
          expect(value).not.toMatchObject(hsvObject);
          expect(value).toMatchObject({
            h: toBeInteger(),
            s: toBeInteger(),
            v: toBeInteger()
          });
        });
      });
    });

    describe("color gets propagated to support inputs", () => {
      describe("valid color", () => {
        it("color gets propagated to hex, RGB & HSV inputs", async () => {
          const page = await newE2EPage({
            html: "<calcite-color value='#fff000'></calcite-color>"
          });

          const hexInput = await page.find(`calcite-color >>> calcite-color-hex-input`);

          expect(await hexInput.getProperty("value")).toBe("#fff000");

          const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

          await rgbModeButton.click();
          const [rInput, gInput, bInput] = await page.findAll(`calcite-color >>> calcite-input.${CSS.channel}`);

          expect(await rInput.getProperty("value")).toBe("255");
          expect(await gInput.getProperty("value")).toBe("240");
          expect(await bInput.getProperty("value")).toBe("0");

          await hsvModeButton.click();
          const [hInput, sInput, vInput] = await page.findAll(`calcite-color >>> calcite-input.${CSS.channel}`);

          expect(await hInput.getProperty("value")).toBe("56");
          expect(await sInput.getProperty("value")).toBe("100");
          expect(await vInput.getProperty("value")).toBe("100");
        });

        it("allows modifying color via hex, RGB, HSV inputs", async () => {
          const page = await newE2EPage({
            html: "<calcite-color value='#fff'></calcite-color>"
          });
          const picker = await page.find("calcite-color");

          const hexInput = await page.find(`calcite-color >>> calcite-color-hex-input`);
          await clearAndEnterValue(page, hexInput, "abc");

          expect(await picker.getProperty("value")).toBe("#aabbcc");

          const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

          await rgbModeButton.click();

          const [rInput, gInput, bInput, hInput, sInput, vInput] = await page.findAll(
            `calcite-color >>> calcite-input.${CSS.channel}`
          );

          await clearAndEnterValue(page, rInput, "128");
          await clearAndEnterValue(page, gInput, "64");
          await clearAndEnterValue(page, bInput, "32");

          expect(await picker.getProperty("value")).toBe("#804020");

          await hsvModeButton.click();

          await clearAndEnterValue(page, hInput, "180");
          await clearAndEnterValue(page, sInput, "90");
          await clearAndEnterValue(page, vInput, "45");

          expect(await picker.getProperty("value")).toBe("#0b7373");
        });

        it("allows nudging values", async () => {
          const assertChannelValueNudge = async (page: E2EPage, calciteInput: E2EElement): Promise<void> => {
            await calciteInput.callMethod("setFocus");
            await page.waitForChanges();

            const currentValue = await calciteInput.getProperty("value");

            await page.keyboard.press("ArrowUp");
            await page.waitForChanges();
            expect(await calciteInput.getProperty("value")).toBe(`${Number(currentValue) + 1}`);

            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();
            expect(await calciteInput.getProperty("value")).toBe(currentValue);

            await page.keyboard.down("Shift");
            await page.keyboard.press("ArrowUp");
            await page.keyboard.up("Shift");
            await page.waitForChanges();
            expect(await calciteInput.getProperty("value")).toBe(`${Number(currentValue) + 10}`);

            await page.keyboard.down("Shift");
            await page.keyboard.press("ArrowDown");
            await page.keyboard.up("Shift");
            await page.waitForChanges();
            expect(await calciteInput.getProperty("value")).toBe(currentValue);
          };

          const page = await newE2EPage({
            html: "<calcite-color value='#408048'></calcite-color>"
          });

          const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

          await rgbModeButton.click();
          await page.waitForChanges();

          const [rInput, gInput, bInput, hInput, sInput, vInput] = await page.findAll(
            `calcite-color >>> calcite-input.${CSS.channel}`
          );

          await assertChannelValueNudge(page, rInput);
          await assertChannelValueNudge(page, gInput);
          await assertChannelValueNudge(page, bInput);

          await hsvModeButton.click();
          await page.waitForChanges();

          await assertChannelValueNudge(page, hInput);
          await assertChannelValueNudge(page, sInput);
          await assertChannelValueNudge(page, vInput);
        });
      });

      describe("when no-color", () => {
        it("color gets propagated to hex, RGB & HSV inputs", async () => {
          const page = await newE2EPage({
            html: "<calcite-color allow-empty value=''></calcite-color>"
          });

          const hexInput = await page.find(`calcite-color >>> calcite-color-hex-input`);

          expect(await hexInput.getProperty("value")).toBe(null);

          const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

          await rgbModeButton.click();
          const [rInput, gInput, bInput] = await page.findAll(`calcite-color >>> calcite-input.${CSS.channel}`);

          expect(await rInput.getProperty("value")).toBe("");
          expect(await gInput.getProperty("value")).toBe("");
          expect(await bInput.getProperty("value")).toBe("");

          await hsvModeButton.click();
          const [hInput, sInput, vInput] = await page.findAll(`calcite-color >>> calcite-input.${CSS.channel}`);

          expect(await hInput.getProperty("value")).toBe("");
          expect(await sInput.getProperty("value")).toBe("");
          expect(await vInput.getProperty("value")).toBe("");
        });

        describe("clearing color via supporting inputs", () => {
          it("clears color via hex input", async () => {
            const page = await newE2EPage({
              html: "<calcite-color allow-empty value='#c0ff33'></calcite-color>"
            });
            const picker = await page.find("calcite-color");

            const hexInput = await page.find(`calcite-color >>> calcite-color-hex-input`);
            await clearAndEnterValue(page, hexInput, "");

            expect(await picker.getProperty("value")).toBe(null);
          });

          it("clears color via RGB channel inputs", async () => {
            const page = await newE2EPage({
              html: "<calcite-color allow-empty value='#c0ff33'></calcite-color>"
            });
            const picker = await page.find("calcite-color");

            const [rgbModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

            await rgbModeButton.click();

            const [rInput, gInput, bInput] = await page.findAll(`calcite-color >>> calcite-input.${CSS.channel}`);

            await clearAndEnterValue(page, rInput, "");

            // clearing one clears the rest
            expect(await gInput.getProperty("value")).toBe("");
            expect(await bInput.getProperty("value")).toBe("");

            expect(await picker.getProperty("value")).toBe(null);
          });

          it("clears color via HSV channel inputs", async () => {
            const page = await newE2EPage({
              html: "<calcite-color allow-empty value='#c0ff33'></calcite-color>"
            });
            const picker = await page.find("calcite-color");

            const [, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

            const [, , , hInput, sInput, vInput] = await page.findAll(`calcite-color >>> calcite-input.${CSS.channel}`);

            await hsvModeButton.click();

            await clearAndEnterValue(page, hInput, "");

            // clearing one clears the rest
            expect(await sInput.getProperty("value")).toBe("");
            expect(await vInput.getProperty("value")).toBe("");

            expect(await picker.getProperty("value")).toBe(null);
          });
        });

        it("does not allow nudging values", async () => {
          const assertChannelValueNudge = async (page: E2EPage, calciteInput: E2EElement): Promise<void> => {
            await calciteInput.callMethod("setFocus");
            await page.waitForChanges();

            await page.keyboard.press("ArrowUp");
            await page.waitForChanges();
            expect(await calciteInput.getProperty("value")).toBe("");

            await page.keyboard.press("ArrowDown");
            await page.waitForChanges();
            expect(await calciteInput.getProperty("value")).toBe("");

            await page.keyboard.down("Shift");
            await page.keyboard.press("ArrowUp");
            await page.keyboard.up("Shift");
            await page.waitForChanges();
            expect(await calciteInput.getProperty("value")).toBe("");

            await page.keyboard.down("Shift");
            await page.keyboard.press("ArrowDown");
            await page.keyboard.up("Shift");
            await page.waitForChanges();
            expect(await calciteInput.getProperty("value")).toBe("");
          };

          const page = await newE2EPage({
            html: "<calcite-color allow-empty value=''></calcite-color>"
          });

          const [rgbModeButton, hsvModeButton] = await page.findAll(`calcite-color >>> .${CSS.colorMode}`);

          await rgbModeButton.click();
          await page.waitForChanges();

          const [rInput, gInput, bInput, hInput, sInput, vInput] = await page.findAll(
            `calcite-color >>> calcite-input.${CSS.channel}`
          );

          await assertChannelValueNudge(page, rInput);
          await assertChannelValueNudge(page, gInput);
          await assertChannelValueNudge(page, bInput);

          await hsvModeButton.click();
          await page.waitForChanges();

          await assertChannelValueNudge(page, hInput);
          await assertChannelValueNudge(page, sInput);
          await assertChannelValueNudge(page, vInput);
        });
      });
    });
  });

  describe("color storage", () => {
    const storageId = "test-storage-id";
    const color1 = "#ff00ff";
    const color2 = "#beefee";

    async function clearStorage(): Promise<void> {
      const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${storageId}`;
      const page = await newE2EPage({
        html: `<calcite-color></calcite-color>`
      });
      await page.evaluate((storageKey) => localStorage.removeItem(storageKey), [storageKey]);
    }

    beforeAll(clearStorage);
    afterAll(clearStorage);

    it("allows saving unique colors", async () => {
      const page = await newE2EPage({
        html: `<calcite-color storage-id=${storageId}></calcite-color>`
      });

      const picker = await page.find("calcite-color");
      const saveColor = await page.find(`calcite-color >>> .${CSS.saveColor}`);
      await saveColor.click();

      picker.setProperty("value", color1);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color2);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color1);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color2);
      await page.waitForChanges();
      await saveColor.click();

      const savedColors = await page.findAll(`calcite-color >>> .${CSS.savedColors} calcite-color-swatch`);
      expect(savedColors).toHaveLength(3);
    });

    it("loads saved colors", async () => {
      const page = await newE2EPage({
        html: `<calcite-color storage-id=${storageId}></calcite-color>`
      });

      const savedColors = await page.findAll(`calcite-color >>> .${CSS.savedColors} calcite-color-swatch`);
      expect(savedColors).toHaveLength(3);
    });

    it("allows removing stored colors", async () => {
      const page = await newE2EPage({
        html: `<calcite-color storage-id=${storageId}></calcite-color>`
      });

      const picker = await page.find("calcite-color");
      const saveColor = await page.find(`calcite-color >>> .${CSS.saveColor}`);
      await saveColor.click();

      picker.setProperty("value", color1);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color2);
      await page.waitForChanges();
      await saveColor.click();

      const saved: E2EElement[] = await page.findAll(`calcite-color >>> .${CSS.savedColors} calcite-color-swatch`);
      let expectedSaved = 3;

      const removeColor = await page.find(`calcite-color >>> .${CSS.deleteColor}`);

      for (const swatch of saved) {
        await swatch.click();
        await removeColor.click();

        expect(await page.findAll(`calcite-color >>> .${CSS.savedColors} calcite-color-swatch`)).toHaveLength(
          --expectedSaved
        );
      }
    });

    it("does not allow saving/removing when no-color is set", async () => {
      const page = await newE2EPage({
        html: `<calcite-color allow-empty value=""></calcite-color>`
      });

      const saveColor = await page.find(`calcite-color >>> .${CSS.saveColor}`);
      const removeColor = await page.find(`calcite-color >>> .${CSS.deleteColor}`);

      expect(await saveColor.getProperty("disabled")).toBe(true);
      expect(await removeColor.getProperty("disabled")).toBe(true);
    });
  });

  it("allows setting no-color", async () => {
    const page = await newE2EPage({
      html: `<calcite-color allow-empty></calcite-color>`
    });

    const color = await page.find("calcite-color");

    expect(await color.getProperty("value")).not.toBe(null);
    expect(await color.getProperty("color")).not.toBe(null);

    color.setProperty("value", null);
    await page.waitForChanges();

    expect(await color.getProperty("value")).toBe(null);
    expect(await color.getProperty("color")).toBe(null);
  });

  it("allows hiding sections", async () => {
    const page = await newE2EPage({
      html: `<calcite-color></calcite-color>`
    });

    type HiddenSection = "hex" | "channels" | "saved";

    async function assertHiddenSection(hiddenSections: HiddenSection[]): Promise<void> {
      const sectionVisibility: Record<HiddenSection, boolean> = {
        hex: true,
        channels: true,
        saved: true
      };

      hiddenSections.forEach((section) => (sectionVisibility[section] = false));

      const color = await page.find("calcite-color");
      const sections = Object.keys(sectionVisibility);

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const hideSectionProp = `hide${section.charAt(0).toUpperCase() + section.slice(1)}`;

        color.setProperty(hideSectionProp, !sectionVisibility[section]);
        await page.waitForChanges();
      }

      const [hex, channels, saved] = await Promise.all([
        page.find(`calcite-color >>> .${CSS.hexOptions}`),
        page.find(`calcite-color >>> .${CSS.colorModeContainer}`),
        page.find(`calcite-color >>> .${CSS.savedColors}`)
      ]);

      const sectionNodes: Record<HiddenSection, E2EElement> = {
        hex,
        channels,
        saved
      };

      sections.forEach((section) => {
        const node = sectionNodes[section];
        const visible = sectionVisibility[section];

        expect(node)[visible ? "toBeDefined" : "toBeNull"]();
      });
    }

    await assertHiddenSection(["hex", "channels", "saved"]);
    await assertHiddenSection(["hex", "channels"]);
    await assertHiddenSection(["hex", "saved"]);
    await assertHiddenSection(["hex"]);
    await assertHiddenSection(["channels", "saved"]);
    await assertHiddenSection(["saved"]);
    await assertHiddenSection(["channels"]);
    await assertHiddenSection([]);
  });
});
