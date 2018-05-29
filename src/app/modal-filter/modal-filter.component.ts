import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'modal-filter',
    templateUrl: './modal-filter.component.html'
})
export class ModalFilterComponent implements OnInit {

    public visible = false;
    public visibleAnimate = false;
    options = [];
    optionSelected: any;
    public parentElem: string;

    @Output() loadData = new EventEmitter<any>();
    constructor() {
        this.options.push(1, 2, 3);
        this.optionSelected = 1;
    }

    ngOnInit() {
    }

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) {
            this.hide();
        }
    }

    public fetchData() {
        this.loadData.emit({parent: this.parentElem, depth: this.optionSelected});
        // this.hide();
    }
}
