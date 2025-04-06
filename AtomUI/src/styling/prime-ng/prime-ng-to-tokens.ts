import {definePreset} from "@primeng/themes";
import Aura from "@primeng/themes/aura";

export const primeNgToTokens = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: "0",
      xs: "2px",
      sm: "4px",
      md: "1rem",
      lg: "8px",
      xl: "12px"
    },
  },
  semantic: {
    list: {
      padding: '0',
      option: {
        padding: '1rem'
      }
    },
    primary: {
      50: '{sys-color-surface-container}',
      100: '{sys-color-primary-container}',
      200: '{sys-color-outline}',
      300: 'yellow',
      400: 'yellow',
      500: 'yellow',
      600: 'yellow',
      700: 'yellow',
      800: 'yellow',
      900: 'yellow',
      950: 'yellow',
    },
    surface: {
      50: 'purple',
      100: 'purple',
      200: 'purple',
      300: 'purple',
      400: 'purple',
      500: 'purple',
      600: 'purple',
      700: 'purple',
      800: 'purple',
      900: 'purple',
      950: 'purple',
    },
    colorScheme: {
      light: {
        surface: {
          0: "{sys-color-surface}",
          50: "{sys-color-secondary-container}",
          100: "{sys-color-surface-container-high}",
          200: "{sys-color-surface-variant}",
          300: "{sys-color-secondary}",
          400: "{sys-color-primary}",
          500: "{sys-color-on-surface`}",
          600: "{sys-color-outline`}",
          700: "{sys-color-outline}",
          800: "{sys-color-on-surface}",
          900: "{sys-color-on-surface}",
          950: "{sys-color-on-surface}"
        },
        primary: {
          color: "{sys-color-on-surface-variant}",
          contrastColor: "{sys-color-on-primary}",
          hoverColor: "{sys-color-outline}",
          activeColor: "{sys-color-outline-variant}"
        },
        highlight: {
          background: "{sys-color-secondary-container}",
          focusBackground: "{sys-color-secondary}",
          color: "{sys-color-on-primary}",
          focusColor: "{sys-color-on-secondary}"
        },
        mask: {
          background: "rgba(0,0,0,0.4)",
          color: "{sys-color-on-surface}"
        },
        formField: {
          background: "{sys-color-surface-container}",
          disabledBackground: "{sys-color-surface-container-high}",
          filledBackground: "{sys-color-surface-container-high}",
          filledHoverBackground: "{surface.50}",
          filledFocusBackground: "{surface.50}",
          borderColor: "{sys-color-outline-variant}",
          hoverBorderColor: "{sys-color-primary}",
          focusBorderColor: "{sys-color-primary}",
          invalidBorderColor: "{sys-color-error}",
          color: "{sys-color-on-surface}",
          disabledColor: "{sys-color-error}",
          placeholderColor: "{sys-color-outline}",
          invalidPlaceholderColor: "{sys-color-error}",
          floatLabelColor: "{sys-color-outline}",
          floatLabelFocusColor: "{sys-color-primary}",
          floatLabelActiveColor: "{sys-color-primary}",
          floatLabelInvalidColor: "{sys-color-error}",
          iconColor: "{sys-color-outline}",
          shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"
        },
        text: {
          color: "{sys-color-on-surface}",
          hoverColor: "{sys-color-primary}",
          mutedColor: "{sys-color-outline}",
          hoverMutedColor: "{sys-color-primary}"
        },
        content: {
          background: "{sys-color-surface}",
          hoverBackground: "{sys-color-surface-container}",
          borderColor: "{sys-color-outline-variant}",
          color: "{sys-color-on-surface}",
          hoverColor: "{sys-color-primary}"
        },
        overlay: {
          select: {
            background: "{sys-color-surface}",
            borderColor: "{sys-color-outline-variant}",
            color: "{sys-color-outline-variant}"
          },
          popover: {
            background: "{sys-color-surface}",
            borderColor: "{sys-color-outline-variant}",
            color: "{sys-color-on-surface}"
          },
          modal: {
            background: "{sys-color-surface}",
            borderColor: "{border-color-main}",
            color: "{sys-color-on-surface}"
          },
          // tooltip: {
          //   background: "red",
          // }
        },
        list: {
          option: {
            focusBackground: "{sys-color-outline-variant}",
            selectedBackground: "{sys-color-secondary-container}",
            selectedColor: "{sys-color-on-secondary-container}",
            selectedFocusBackground: "{sys-color-secondary-container}",
            selectedFocusColor: "{sys-color-on-secondary-container}",
            color: "{sys-color-on-surface}",
            focusColor: "{sys-color-on-surface}",
            icon: {
              color: "{sys-color-outline}",
              focusColor: "{sys-color-secondary}"
            }
          },
          optionGroup: {
            background: "transparent",
            color: "{text.muted.color}"
          }
        },
        navigation: {
          item: {
            focusBackground: "{sys-color-outline-variant}",
            activeBackground: "red",
            color: "{sys-color-on-surface}",
            focusColor: "{sys-color-on-surface}",
            activeColor: "red",
            icon: {
              color: "{surface.400}",
              focusColor: "{surface.500}",
              activeColor: "{surface.500}"
            }
          },
          submenuLabel: {
            background: "transparent",
            color: "{text.muted.color}"
          },
          submenuIcon: {
            color: "{surface.400}",
            focusColor: "{surface.500}",
            activeColor: "{surface.500}"
          }
        },
        // tooltip: {
        //   background: "{sys-color-surface}",
        //   color: "{sys-color-on-surface}",
        //   // focusBackground: "{surface.0}",
        //   // focusColor: "{sys-color-on-surface}",
        //   // focusBorderColor: "{sys-color-outline-variant}",
        //   // focusShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"
        // }
      },
    }
  },
  // components: {
  //   progressspinner: {
  //     style: {
  //       "--progress-spinner-color": "black",
  //       "--p-progressspinner-color-1": "black",
  //       "--p-progressspinner-color-2": "black"
  //     },
  //     colorScheme: {
  //       light: {
  //         root: {
  //           1: "red",
  //           2: "red",
  //           3: "red",
  //           4: "red"
  //         },
  //         color: "red"
  //       },
  //       dark: {
  //         color: "red"
  //       }
  //     },
  //     light: {
  //       color: {
  //         1: "red",
  //         2: "red",
  //         3: "red",
  //         4: "red"
  //       }
  //     },
  //     dark: {
  //       color: {
  //         1: "red",
  //         2: "red",
  //         3: "red",
  //         4: "red"
  //       }
  //     }
  //   }
  // }
});
