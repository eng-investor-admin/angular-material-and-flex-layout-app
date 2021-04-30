import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MainComponent } from "./main.component";

describe("MainComponent", () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have no data in esppDataList", () => {
    expect(fixture.componentInstance.esppDataList.length).toEqual(0);
  });

  it("should copy marketPrice to purchasePrice", () => {
    fixture.componentInstance.esppForm.get("marketPrice")?.setValue(120);
    fixture.componentInstance.copyToPurchasePrice()
    expect(fixture.componentInstance.esppForm.get("purchasePrice")?.value).toEqual(120);
  });

  it("should not copy marketPrice to purchasePrice if user change purchasePrice value", () => {
    fixture.componentInstance.esppForm.get("marketPrice")?.setValue(120);
    fixture.componentInstance.esppForm.get("purchasePrice")?.markAsTouched();
    fixture.componentInstance.copyToPurchasePrice()
    expect(fixture.componentInstance.esppForm.get("purchasePrice")?.value).toEqual(0);
  });

  it("should save a new espp data", () => {
    fixture.componentInstance.esppForm.get("name")?.setValue("ABC");
    fixture.componentInstance.esppForm.get("purchaseDate")?.setValue(0);
    fixture.componentInstance.esppForm.get("quantity")?.setValue(10);
    fixture.componentInstance.esppForm.get("marketPrice")?.setValue(120);
    fixture.componentInstance.esppForm.get("purchasePrice")?.setValue(100);
    fixture.componentInstance.save();
    expect(fixture.componentInstance.esppDataList.length).toEqual(1);
  });

  it("should calculate profit", () => {
    fixture.componentInstance.esppForm.get("name")?.setValue("ABC");
    fixture.componentInstance.esppForm.get("purchaseDate")?.setValue(0);
    fixture.componentInstance.esppForm.get("quantity")?.setValue(10);
    fixture.componentInstance.esppForm.get("marketPrice")?.setValue(120);
    fixture.componentInstance.esppForm.get("purchasePrice")?.setValue(100);
    fixture.componentInstance.save();
    expect(fixture.componentInstance.esppDataList[0].profit).toEqual(200);
  });
});
