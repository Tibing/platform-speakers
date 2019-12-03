import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Renderer2, RendererFactory2, RendererStyleFlags2, RendererType2 } from '@angular/core';

import { AppComponent } from './app.component';
import * as Tone from 'tone';

export interface Note {
  note: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
  octave: number;
  length: number;
}

export class RendererFactory implements RendererFactory2 {
  private synth = new Tone.FMSynth().toMaster();
  private notes: Note[] = [];

  end(): void {
    let i = 0;
    for (const { note, octave, length } of this.notes) {
      this.synth.triggerAttackRelease(note + octave, length, i);
      i += Number.parseInt(length + '', 10);
    }
  }

  createRenderer(hostElement: any, type: RendererType2): Renderer2 {
    return new Renderer(this.synth, this.notes);
  }
}

export class Renderer implements Renderer2 {
  data: { [key: string]: any };
  destroyNode: (node: any) => void;

  constructor(private synth: Tone, private notes: Note[]) {
  }

  destroy(): void {
  }

  createElement(name: string, namespace?: string) {
    const note = {};
    this.notes.push(note as Note);
    return note as Note;
  }

  createComment(value: string) {
    return {};
  }

  createText(value: string) {
    return {};
  }

  appendChild(parent: any, newChild: any): void {
  }

  insertBefore(parent: any, newChild: any, refChild: any): void {
  }

  removeChild(parent: any, oldChild: any, isHostElement?: boolean): void {
  }

  selectRootElement(selectorOrNode: any, preserveContent?: boolean) {
  }

  parentNode(node: any) {
  }

  nextSibling(node: any) {
  }

  setAttribute(el: any, name: string, value: string, namespace?: string): void {
    el[name] = value;
  }

  removeAttribute(el: any, name: string, namespace?: string): void {
  }

  addClass(el: any, name: string): void {
  }

  removeClass(el: any, name: string): void {
  }

  setStyle(
    el: any,
    style: string,
    value: any,
    flags?: RendererStyleFlags2,
  ): void {
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
  }

  setProperty(el: any, name: string, value: any): void {
  }

  setValue(node: any, value: string): void {
  }

  listen(
    target: any,
    eventName: string,
    callback: (event: any) => boolean | void,
  ): () => void {
    return null;
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [{ provide: RendererFactory2, useClass: RendererFactory }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
