import {Component} from '@angular/core';
import {ILoadingOverlayAngularComp} from "ag-grid-angular";
import {ILoadingOverlayParams} from 'ag-grid-community';

type CustomLoadingOverlayParams = ILoadingOverlayParams & { loadingMessage: string };

@Component({
  selector: 'proActiV-custom-loading-overlay',
  imports: [],
  templateUrl: './custom-loading-overlay.component.html',
  styleUrl: './custom-loading-overlay.component.scss'
})
export class CustomLoadingOverlayComponent implements ILoadingOverlayAngularComp {
  public params!: CustomLoadingOverlayParams;

  agInit(params: CustomLoadingOverlayParams): void {
    this.refresh(params);
  }

  refresh(params: CustomLoadingOverlayParams): void {
    this.params = params;
  }
}
