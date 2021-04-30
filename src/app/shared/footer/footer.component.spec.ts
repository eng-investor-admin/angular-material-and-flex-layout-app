import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should have text "Angular Materialテストアプリ" in footer', () => {
    expect(fixture.nativeElement.querySelector("footer").textContent).toContain(
      "Angular Materialテストアプリ"
    );
  });
});
