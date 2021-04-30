import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

export interface EsppData {
  name: string;
  purchaseDate: number;
  quantity: number;
  marketPrice: number;
  purchasePrice: number;
  profit: number;
}

function IntegerValidation(min: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } | null => {
    if (parseFloat(c.value) == parseInt(c.value) && !isNaN(c.value) && c.value >= min) {
      return null;
    }
    return { integerValiation: true };
  };
}

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
  yen = 0;
  profit = 0;
  esppForm: FormGroup;
  esppDataList: EsppData[] = [];
  dataSource: MatTableDataSource<EsppData>;
  displayedColumns: string[] = [
    "name",
    "purchaseDate",
    "quantity",
    "marketPrice",
    "purchasePrice",
    "profit",
  ];

  private subscriptions = new Subscription();

  constructor(private fb: FormBuilder) {
    this.esppForm = this.fb.group({
      name: ["", Validators.required],
      purchaseDate: ["", Validators.required],
      quantity: [0, [Validators.required, IntegerValidation(1)]],
      marketPrice: [0, [Validators.required, Validators.min(0)]],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
    });
    this.dataSource = new MatTableDataSource<EsppData>(this.esppDataList);
  }

  ngOnInit(): void {
    const quantityControl = this.esppForm.get("quantity");
    if (quantityControl) {
      this.subscriptions.add(
        quantityControl.valueChanges
          .pipe(debounceTime(500))
          .subscribe(() => this.updateProfit())
      );
    }
    const marketPriceControl = this.esppForm.get("marketPrice");
    if (marketPriceControl) {
      this.subscriptions.add(
        marketPriceControl.valueChanges
          .pipe(debounceTime(500))
          .subscribe(() => {
            this.copyToPurchasePrice();
            this.updateProfit();
          })
      );
    }
    const purchasePriceControl = this.esppForm.get("purchasePrice");
    if (purchasePriceControl) {
      this.subscriptions.add(
        purchasePriceControl.valueChanges
          .pipe(debounceTime(500))
          .subscribe(() => this.updateProfit())
      );
    }
  }
  updateProfit(): void {
    const quantity = this.esppForm.get("quantity")?.value || 0;
    const marketPrice = this.esppForm.get("marketPrice")?.value || 0;
    const purchasePrice = this.esppForm.get("purchasePrice")?.value || 0;
    this.profit = quantity * (marketPrice - purchasePrice) * 105;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  save(): void {
    const name = this.esppForm.get("name")?.value || "";
    const purchaseDate = this.esppForm.get("purchaseDate")?.value || 0;
    const quantity = this.esppForm.get("quantity")?.value || 0;
    const marketPrice = this.esppForm.get("marketPrice")?.value || 0;
    const purchasePrice = this.esppForm.get("purchasePrice")?.value || 0;
    this.esppDataList.push({
      name: name,
      purchaseDate: purchaseDate,
      quantity: quantity,
      marketPrice: marketPrice,
      purchasePrice: purchasePrice,
      profit: (marketPrice - purchasePrice) * quantity,
    });

    this.esppForm.reset({
      name: name,
      purchaseDate: purchaseDate,
      quantity: 1,
      marketPrice: 0,
      purchasePrice: 0,
    });

    this.dataSource = new MatTableDataSource<EsppData>(this.esppDataList);
  }

  copyToPurchasePrice(): void {
    const marketPriceControl = this.esppForm.get("marketPrice");
    const purchasePriceControl = this.esppForm.get("purchasePrice");
    if (marketPriceControl && purchasePriceControl && purchasePriceControl.untouched) {
      purchasePriceControl.setValue(marketPriceControl.value);
    }
  }
}
