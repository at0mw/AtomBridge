import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpandParagraphService {
  expandCellId: WritableSignal<string> = signal<string>("")

  expandIssue(cellId: string) {
    if(cellId === this.expandCellId()) {
      cellId = "";
    }
    this.expandCellId.set(cellId);
  }
}
