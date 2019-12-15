import { Component, ChangeDetectorRef } from '@angular/core';
import { Country } from 'src/abstractions/country';
import { DataService } from '../services/data.service.js';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ["./countries.component.scss"]
})
export class CountriesComponent {
  public countries: Country[];
  public displayedColumns: string[] = ["checked", "id", "name", "countryCode", "isoCode", "population", "area", "gdp", "edit-button", "delete-button"];
  public addForm: FormGroup;
  public mode?: "add" | "edit";

  constructor(
    private readonly dataService: DataService,
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.getCountries();
  }

  public getCountries(): void {
    this.dataService.getCountries().pipe(
      take(1),
      map((value: Country[]) => value.map(item => ({ ...item, checked: false })))
    ).subscribe(data => {
      this.countries = data;

      this.changeDetectorRef.detectChanges();
    });
  }

  public isAllSelected(): string {
    if (this.countries) {
      const a = this.countries.reduce((acc, curr) => curr.checked ? acc.concat(curr.checked) : acc, []);
      return a.length === this.countries.length ? "full" : a.length === 0 ? "empty" : "inter";
    } else {
      return "empty";
    }
  }

  public checkAll(flag: boolean): void {
    this.countries.forEach(item => item.checked = flag);
  }


  public onAddClicked() {
    this.addForm = this.getAddForm();
    this.mode = "add";
  }

  public addCountry() {
    if (this.addForm.valid) {
      const value = this.addForm.getRawValue();
      this.dataService.addCountry(value).subscribe(() => {
        this.closeForm();
        this.getCountries();
      });
    }
  }

  public onEditClicked(item: Country) {
    this.addForm = this.getAddForm(item);
    this.mode = "edit";
  }

  public editCountry() {
    if (this.addForm.valid) {
      const value = this.addForm.getRawValue();
      this.dataService.editCountry(value).subscribe(() => {
        this.closeForm();
        this.getCountries();
      });
    }
  }

  public delete(id: string) {
    this.dataService.deleteCountry(id).subscribe(() => {
      this.getCountries();
    });
  }

  public closeForm() {
    this.addForm = undefined;
    this.mode = undefined;
  }

  public getAddForm(initValue?: Country) {
    return this.formBuilder.group({
      _id: [initValue && initValue._id],
      name: [initValue && initValue.name, Validators.required],
      countryCode: [initValue && initValue.countryCode, Validators.required],
      isoCode: [initValue && initValue.isoCode, Validators.required],
      population: [initValue && initValue.population, Validators.required],
      area: [initValue && initValue.area, Validators.required],
      gdp: [initValue && initValue.gdp, Validators.required],
    })
  }
}
