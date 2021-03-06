import { Component, Element, h, Host, Method, Prop, Build, State, VNode } from "@stencil/core";
import { CSS, TEXT } from "./resources";
import { getElementDir } from "../../utils/dom";
import { ButtonAlignment, ButtonAppearance, ButtonColor } from "./interfaces";
import { FlipContext, Scale, Theme, Width } from "../interfaces";

@Component({
  tag: "calcite-button",
  styleUrl: "calcite-button.scss",
  shadow: true
})

/** @slot default text slot for button text */

/** Any attributes placed on <calcite-button> component will propagate to the rendered child */
/** Passing a 'href' will render an anchor link, instead of a button. Role will be set to link, or button, depending on this. */
/** It is the consumers responsibility to add aria information, rel, target, for links, and any button attributes for form submission */
export class CalciteButton {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteButtonElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** specify the appearance style of the button, defaults to solid. */
  @Prop({ reflect: true }) appearance: ButtonAppearance = "solid";

  /** specify the color of the button, defaults to blue */
  @Prop({ reflect: true }) color: ButtonColor = "blue";

  /** is the button disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  /** optionally pass a href - used to determine if the component should render as a button or an anchor */
  @Prop({ reflect: true }) href?: string;

  /** optionally pass an icon to display at the end of a button - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconEnd?: string;

  /** flip the icon(s) in rtl */
  @Prop({ reflect: true }) iconFlipRtl?: FlipContext;

  /** optionally pass an icon to display at the start of a button - accepts calcite ui icon names  */
  @Prop({ reflect: true }) iconStart?: string;

  /** string to override English loading text */
  @Prop() intlLoading?: string = TEXT.loading;

  /** optionally specify alignment of button elements. */
  @Prop({ reflect: true }) alignment?: ButtonAlignment = "center";

  /** optionally add a calcite-loader component to the button, disabling interaction.  */
  @Prop({ reflect: true }) loading?: boolean = false;

  /** optionally add a round style to the button  */
  @Prop({ reflect: true }) round?: boolean = false;

  /** specify the scale of the button, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** is the button a child of a calcite-split-button */
  @Prop({ reflect: true }) splitChild?: "primary" | "secondary" | false = false;

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: Theme;

  /** specify the width of the button, defaults to auto */
  @Prop({ reflect: true }) width: Width = "auto";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.childElType = this.href ? "a" : "button";
    this.setupTextContentObserver();
  }

  disconnectedCallback(): void {
    this.observer.disconnect();
  }

  componentWillLoad(): void {
    if (Build.isBrowser) {
      this.updateHasText();
      const elType = this.el.getAttribute("type");
      this.type = this.childElType === "button" && elType ? elType : "submit";
    }
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const attributes = this.getAttributes();
    const Tag = this.childElType;

    const loader = (
      <div class={CSS.buttonLoader}>
        <calcite-loader active inline label={this.intlLoading} />
      </div>
    );

    const iconScale = this.scale === "l" ? "m" : "s";

    const iconStartEl = (
      <calcite-icon
        class={{ [CSS.icon]: true, [CSS.iconStart]: true }}
        dir={dir}
        flipRtl={this.iconFlipRtl === "start" || this.iconFlipRtl === "both"}
        icon={this.iconStart}
        scale={iconScale}
      />
    );

    const iconEndEl = (
      <calcite-icon
        class={{ [CSS.icon]: true, [CSS.iconEnd]: true }}
        dir={dir}
        flipRtl={this.iconFlipRtl === "end" || this.iconFlipRtl === "both"}
        icon={this.iconEnd}
        scale={iconScale}
      />
    );

    const contentEl = (
      <span class={CSS.content}>
        <slot />
      </span>
    );

    return (
      <Host dir={dir} hasText={this.hasText}>
        <Tag
          {...attributes}
          disabled={this.disabled}
          onClick={this.handleClick}
          ref={(el) => (this.childEl = el)}
          tabIndex={this.disabled ? -1 : null}
        >
          {this.loading ? loader : null}
          {this.iconStart ? iconStartEl : null}
          {this.hasText ? contentEl : null}
          {this.iconEnd ? iconEndEl : null}
        </Tag>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    this.childEl.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** watches for changing text content **/
  private observer: MutationObserver;

  /** if button type is present, assign as prop */
  private type?: string;

  /** the rendered child element */
  private childEl?: HTMLElement;

  /** the node type of the rendered child element */
  private childElType?: "a" | "button" = "button";

  /** determine if there is slotted text for styling purposes */
  @State() private hasText?: boolean = false;

  private updateHasText() {
    this.hasText = this.el.textContent.trim().length > 0;
  }

  private setupTextContentObserver() {
    if (Build.isBrowser) {
      this.observer = new MutationObserver(() => {
        this.updateHasText();
      });
      this.observer.observe(this.el, { childList: true, subtree: true });
    }
  }

  private getAttributes(): Record<string, any> {
    // spread attributes from the component to rendered child, filtering out props
    const props = [
      "appearance",
      "color",
      "dir",
      "hasText",
      "icon-start",
      "icon-end",
      "id",
      "splitChild",
      "loading",
      "scale",
      "slot",
      "width",
      "theme"
    ];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  // act on a requested or nearby form based on type
  private handleClick = (e: Event): void => {
    // this.type refers to type attribute, not child element type
    if (this.childElType === "button" && this.type !== "button") {
      const requestedForm = this.el.getAttribute("form");
      const targetForm = requestedForm
        ? (document.getElementsByName(`${requestedForm}`)[0] as HTMLFormElement)
        : (this.el.closest("form") as HTMLFormElement);

      if (targetForm) {
        const targetFormSubmitFunction = targetForm.onsubmit as () => void;
        switch (this.type) {
          case "submit":
            if (targetFormSubmitFunction) targetFormSubmitFunction();
            else if (targetForm.checkValidity()) targetForm.submit();
            else targetForm.reportValidity();
            break;
          case "reset":
            targetForm.reset();
            break;
        }
      }
      e.preventDefault();
    }
  };
}
