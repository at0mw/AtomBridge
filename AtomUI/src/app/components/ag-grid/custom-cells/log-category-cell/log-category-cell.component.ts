import {
  Component,
  inject,
  Input,
} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {LoggingService} from "@services/logging/logging.service";
import {NgClass} from "@angular/common";

export interface CustomCellRendererParams extends ICellRendererParams {
  expanded?: boolean; // Add your custom property
}

@Component({
  selector: 'proActiV-paragraph-cell',
  imports: [
    NgClass
  ],
  templateUrl: './log-category-cell.component.html',
  styleUrl: './log-category-cell.component.scss'
})
export class LogCategoryCellComponent implements ICellRendererAngularComp {
  private readonly logger = inject(LoggingService);

  @Input() public value!: any;
  colour: string = "#000";
  background: string = "surface";

  agInit(params: CustomCellRendererParams): void {
    this.colour = params.data?.categoryColour ?? "#000";
    const needsLightText = this.isDarkColor(this.colour);
    this.background = needsLightText ? 'on-primary-text' : 'on-surface-text';
    this.value = params.value;
  }

  refresh(params: CustomCellRendererParams): boolean {
    return true;
  }

  /**
   * Determines if a given hex color is dark
   */
  private isDarkColor(hex: string): boolean {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return false;


    const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
    return luminance < 0.5;
  }

  /**
   * Converts a hex color string to an RGB object
   */
  private hexToRgb(hex: string): { r: number, g: number, b: number } | null {
    // Expand shorthand (e.g., "#03F") to full form "#0033FF"
    if (hex.length === 4) {
      hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }

    // Match hex pattern
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return match
      ? {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
      }
      : null;
  }

  private hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }

    // Convert to 0-255 range
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }
}
