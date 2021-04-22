import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
];

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

  private subscriptions = new Subscription();

  constructor(private fb: FormBuilder) {
    this.esppForm = this.fb.group({
      name: ["", Validators.required],
      purchaseDate: ["", Validators.required],
      quantity: [0, [Validators.required, IntegerValidation(1)]],
      marketPrice: [0, [Validators.required, Validators.min(0)]],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
    });
  }

  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource = ELEMENT_DATA;

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
          .subscribe(() => this.updateProfit())
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
}
