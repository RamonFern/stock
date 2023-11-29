/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabVendasComponent } from './tab-vendas.component';

describe('TabVendasComponent', () => {
  let component: TabVendasComponent;
  let fixture: ComponentFixture<TabVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
