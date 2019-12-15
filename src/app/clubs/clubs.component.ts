import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Club } from 'src/abstractions/club';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { Country } from 'src/abstractions/country';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ["./clubs.component.scss"]
})
export class ClubsComponent {
  public clubs: Club[];
  public countries: Country[];
  public displayedColumns: string[] = ["checked", "id", "name", "countryId", "numberOfGroup", "expectingMoney", "edit-button", "delete-button"];
  public addForm: FormGroup;
  public mode?: "add" | "edit";

  constructor(
    private readonly dataService: DataService,
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.getClubs();
    this.getCountries();
  }

  public getClubs(): void {
    this.dataService.getClubs().pipe(
      take(1),
      map((value: Club[]) => value.map(item => ({ ...item, checked: false })))
    ).subscribe(data => {
      this.clubs = data;
      this.changeDetectorRef.detectChanges();
    })
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
    if (this.clubs) {
      const a = this.clubs.reduce((acc, curr) => curr.checked ? acc.concat(curr.checked) : acc, []);
      return a.length === this.clubs.length ? "full" : a.length === 0 ? "empty" : "inter";
    } else {
      return "empty";
    }
  }

  public getCountryById(id: string): string {
    return this.countries ? this.countries.find(value => value._id === id).name : "";
  }

  public checkAll(flag: boolean): void {
    this.clubs.forEach(item => item.checked = flag);
  }

  public onAddClicked() {
    this.addForm = this.getAddForm();
    this.mode = "add";
  }

  public addCountry() {
    if (this.addForm.valid) {
      const value = this.addForm.getRawValue();
      this.dataService.addClub
        (value).subscribe(() => {
          this.closeForm();
          this.getClubs();
        });
    }
  }

  public onEditClicked(item: Club) {
    this.addForm = this.getAddForm(item);
    this.mode = "edit";
  }

  public editCountry() {
    if (this.addForm.valid) {
      const value = this.addForm.getRawValue();
      this.dataService.editClub(value).subscribe(() => {
        this.closeForm();
        this.getClubs();
      });
    }
  }

  public delete(id: string) {
    this.dataService.deleteClub(id).subscribe(() => {
      this.getClubs();
    });
  }

  public closeForm() {
    this.addForm = undefined;
    this.mode = undefined;
  }

  public getAddForm(initValue?: Club) {
    return this.formBuilder.group({
      _id: [initValue && initValue._id],
      name: [initValue && initValue.name, Validators.required],
      countryId: [initValue && initValue.countryId, Validators.required],
      nextMatchDay: [initValue && initValue.nextMatchDay, Validators.required],
      numberOfGroup: [initValue && initValue.numberOfGroup, Validators.required],
      expectingMoney: [initValue && initValue.expectingMoney, Validators.required],
    })
  }
}
