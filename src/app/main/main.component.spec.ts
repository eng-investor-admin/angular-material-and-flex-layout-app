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

  it("should have no data", () => {
    // 準備

    // テストしたい処理

    // 確認
    expect(component.esppDataList.length).toEqual(0);
  });

  it("should copy marketPrice to purchasePrice", () => {
    // 準備
    component.esppForm.get("marketPrice")?.setValue(120);

    // テストしたい処理
    component.copyToPurchasePrice();

    // 確認
    expect(component.esppForm.get("purchasePrice")?.value).toEqual(120);
  });

  it("should not copy marketPrice to purchasePrice if user change purchasePrice value", () => {
    // 準備
    fixture.componentInstance.esppForm.get("marketPrice")?.setValue(120);
    fixture.componentInstance.esppForm.get("purchasePrice")?.markAsTouched();

    // テストしたい処理
    fixture.componentInstance.copyToPurchasePrice();

    // 確認
    expect(
      fixture.componentInstance.esppForm.get("purchasePrice")?.value
    ).toEqual(0);
  });

  it("should save a new espp data", () => {
    // 準備
    fixture.componentInstance.esppForm.get("name")?.setValue("ABC");
    fixture.componentInstance.esppForm.get("purchaseDate")?.setValue(0);
    fixture.componentInstance.esppForm.get("quantity")?.setValue(10);
    fixture.componentInstance.esppForm.get("marketPrice")?.setValue(120);
    fixture.componentInstance.esppForm.get("purchasePrice")?.setValue(100);

    // テストしたい処理
    fixture.componentInstance.save();

    // 確認
    expect(fixture.componentInstance.esppDataList.length).toEqual(1);
  });

  it("should calculate profit", () => {
    // 準備
    fixture.componentInstance.esppForm.get("name")?.setValue("ABC");
    fixture.componentInstance.esppForm.get("purchaseDate")?.setValue(0);
    fixture.componentInstance.esppForm.get("quantity")?.setValue(10);
    fixture.componentInstance.esppForm.get("marketPrice")?.setValue(120);
    fixture.componentInstance.esppForm.get("purchasePrice")?.setValue(100);

    // テストしたい処理
    fixture.componentInstance.save();

    // 確認
    expect(fixture.componentInstance.esppDataList[0].profit).toEqual(200);
  });
});
