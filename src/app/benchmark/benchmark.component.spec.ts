import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BenchmarkComponent} from './benchmark.component';
import {APP_BASE_HREF} from '@angular/common';
import {environment} from '../../environments/environment';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BenchmarkComponent', () => {
  let component: BenchmarkComponent;
  let fixture: ComponentFixture<BenchmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BenchmarkComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: APP_BASE_HREF, useValue: environment.baseHref}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
