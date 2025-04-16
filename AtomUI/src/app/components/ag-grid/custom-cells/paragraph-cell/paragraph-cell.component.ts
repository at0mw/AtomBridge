import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {ExpandParagraphService} from "./expand-paragraph.service";
import {Subscription} from "rxjs";
import {LoggingService} from "@services/logging/logging.service";

export interface CustomCellRendererParams extends ICellRendererParams {
  expanded?: boolean; // Add your custom property
}

@Component({
  selector: 'proActiV-paragraph-cell',
  imports: [],
  templateUrl: './paragraph-cell.component.html',
  styleUrl: './paragraph-cell.component.scss'
})
export class ParagraphCellComponent implements OnInit, AfterViewInit, OnDestroy, ICellRendererAngularComp {
  private readonly expandParagraphService = inject(ExpandParagraphService);
  private readonly logger = inject(LoggingService);
  @ViewChild('paragraphCell') paragraphCell!: ElementRef | undefined;
  @Input() public value!: any;
  expandedCellSubscription!: Subscription;
  cellId: string = "";
  text: string = "";
  resizeObserver: ResizeObserver | undefined;

  shouldExpandCell = computed(() => this.expandParagraphService.expandCellId() === this.cellId);
  signalExpandable: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.text = this.safeStringify(this.value);
  }

  ngAfterViewInit() {
    this.observeHeightChanges();
  }

  private observeHeightChanges() {
    if (this.paragraphCell?.nativeElement) {
      this.resizeObserver = new ResizeObserver(() => this.checkHeight());
      this.resizeObserver.observe(this.paragraphCell.nativeElement);
    }
  }

  private checkHeight() {
    this.signalExpandable.set(this.isTextOverflowing());
  }

  ngOnDestroy() {
    this.expandedCellSubscription?.unsubscribe();
  }

  agInit(params: CustomCellRendererParams): void {
    this.value = params.value;
    this.cellId = `${params.node.rowIndex}-${params.colDef?.field}`;
  }

  refresh(params: CustomCellRendererParams): boolean {
    return true;
  }

  /** Function to safely stringify objects with circular references */
  safeStringify(obj: any, space = 2) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]"; // Replace circular references
        seen.add(value);
      }
      return value;
    }, space);
  }

  toggleExpand() {
    this.expandParagraphService.expandIssue(this.cellId);
  }

  private isTextOverflowing() {
    return this.paragraphCell?.nativeElement?.clientHeight > 80;
  }
}
