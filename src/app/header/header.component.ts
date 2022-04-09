import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  show:boolean = false;
  overlayRef: OverlayRef;
  @ViewChild('overlayTemplate') overlayTemplate: TemplatePortalDirective;

  constructor(private overlay: Overlay) { }

  ngOnInit(): void {}

  showpages(){
  this.show = !this.show;
  this.openTemplateOverlay()
  }

  openTemplateOverlay() {
  if(this.show){
    const positionStrategy = this.overlay
    .position()
    .global()
    .centerHorizontally()
    .centerVertically();

  const overlayConfig = new OverlayConfig({
    positionStrategy,
  });

  overlayConfig.hasBackdrop = true;

  this.overlayRef = this.overlay.create(overlayConfig);

  this.overlayRef.backdropClick().subscribe(() => {
    this.overlayRef.dispose();
    this.show = false
  });

  this.overlayRef.attach(this.overlayTemplate);
  } else {
    this.overlayRef.dispose();
  }
  }
}
