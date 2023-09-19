import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Container } from './container.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [Container]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Container);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Small Streaming Service'`, () => {
    const fixture = TestBed.createComponent(Container);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Small Streaming Service');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(Container);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('front app is running!');
  // });
});
