import { Component, Host, h, Element, Prop } from "@stencil/core";
import { CSS, ICONS, SLOTS, TEXT } from "./resources";
import { focusElement, getSlotted } from "../../utils/dom";
import { VNode } from "@stencil/core/internal";
import { getRoundRobinIndex } from "../../utils/array";

const SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];

@Component({
  tag: "calcite-action-group",
  styleUrl: "calcite-action-group.scss",
  shadow: true
})
/**
 * @slot - A slot for adding a group of `calcite-action`s.
 * @slot menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 */
export class CalciteActionGroup {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * 'Options' text string for the actions menu.
   */
  @Prop() intlOptions?: string = TEXT.options;

  /**
   * 'Close' text string for the menu.
   */
  @Prop() intlClose?: string;

  /**
   * 'Open' text string for the menu.
   */
  @Prop() intlOpen?: string;

  /**
   * Opens the action menu.
   */
  @Prop({ reflect: true }) menuOpen = false;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionGroupElement;

  menuButtonEl: HTMLCalciteActionElement;

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  renderMenuButton(): VNode {
    const { menuOpen, intlOpen, intlClose } = this;
    const closeLabel = intlClose || TEXT.close;
    const openLabel = intlOpen || TEXT.open;

    const menuLabel = menuOpen ? closeLabel : openLabel;

    return (
      <calcite-action
        aria-label={menuLabel}
        class={CSS.menuButton}
        icon={ICONS.menu}
        onClick={this.toggleMenuOpen}
        onKeyDown={this.menuButtonKeyDown}
        ref={this.setMenuButonRef}
        text={menuLabel}
      />
    );
  }

  renderMenu(): VNode {
    const { el } = this;

    return getSlotted(el, SLOTS.menuActions) ? (
      <div class={CSS.menuContainer} onKeyDown={this.menuActionsContainerKeyDown}>
        {this.renderMenuButton()}
        {this.renderMenuItems()}
      </div>
    ) : null;
  }

  renderMenuItems(): VNode {
    const { menuOpen, menuButtonEl, intlOptions } = this;

    return (
      <calcite-popover
        disablePointer={true}
        flipPlacements={["left", "right"]}
        label={intlOptions}
        offsetDistance={8}
        onKeyDown={this.menuActionsKeydown}
        open={menuOpen}
        placement="leading"
        referenceElement={menuButtonEl}
      >
        <div class={CSS.menu}>
          <slot name={SLOTS.menuActions} />
        </div>
      </calcite-popover>
    );
  }

  render(): VNode {
    return (
      <Host>
        <slot />
        {this.renderMenu()}
      </Host>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setMenuButonRef = (node: HTMLCalciteActionElement): void => {
    this.menuButtonEl = node;
  };

  queryActions(): HTMLCalciteActionElement[] {
    return getSlotted<HTMLCalciteActionElement>(this.el, SLOTS.menuActions, {
      all: true
    });
  }

  isValidKey(key: string, supportedKeys: string[]): boolean {
    return !!supportedKeys.find((k) => k === key);
  }

  menuActionsKeydown = (event: KeyboardEvent): void => {
    const { key, target } = event;

    if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
      return;
    }

    const actions = this.queryActions();
    const { length } = actions;
    const currentIndex = actions.indexOf(target as HTMLCalciteActionElement);

    if (!length || currentIndex === -1) {
      return;
    }

    event.preventDefault();

    if (key === "ArrowUp") {
      const value = getRoundRobinIndex(currentIndex - 1, length);
      const previousAction = actions[value];
      focusElement(previousAction);
    }

    if (key === "ArrowDown") {
      const value = getRoundRobinIndex(currentIndex + 1, length);
      const nextAction = actions[value];
      focusElement(nextAction);
    }
  };

  menuActionsContainerKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (key === "Escape") {
      this.menuOpen = false;
    }
  };

  toggleMenuOpen = (): void => {
    this.menuOpen = !this.menuOpen;
  };

  menuButtonKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { menuOpen } = this;

    if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
      return;
    }

    const actions = this.queryActions();
    const { length } = actions;

    if (!length) {
      return;
    }

    event.preventDefault();

    if (!menuOpen) {
      this.menuOpen = true;
    }

    if (key === "ArrowUp") {
      const lastAction = actions[length - 1];
      focusElement(lastAction);
    }

    if (key === "ArrowDown") {
      const firstAction = actions[0];
      focusElement(firstAction);
    }
  };
}
