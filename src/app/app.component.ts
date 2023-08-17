import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  yourForm: FormGroup;
  title = 'Rooms & Guests';
  selectedCountry = new FormControl();
  // countryControl = new FormControl();
  countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'kabal',
    'pakistan',
    'psjk'
  ];

  filteredCountries: string[] = [];

  constructor(private fb: FormBuilder) {
    this.yourForm = this.fb.group({
      selectedCountry: this.selectedCountry,
      selectedRoom: ['1'], // Form control for selected room
      roomDetails: this.fb.array([]),
      inputField: [''], // initial value for input field
      start: [''], // Initial value for start date
      end: [''], // Initial value for end date
      country: [''], // Initial value for country
    });

    this.selectedCountry.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      )
      .subscribe((filtered) => (this.filteredCountries = filtered));
  }

  toggleCountryList() {
    this.filteredCountries = this.countries;
  }

  selectCountry(country: string) {
    this.selectedCountry.setValue(country);

    this.filteredCountries = [];
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter((country) =>
      country.toLowerCase().includes(filterValue)
    );
  }

  get roomDetails(): FormArray {
    return this.yourForm.get('roomDetails') as FormArray;
  }

  onRoomSelect(selectedValue: string) {
    this.roomDetails.clear();

    for (let i = 0; i < +selectedValue; i++) {
      this.roomDetails.push(
        this.fb.group({
          adults: [''],
          childrens: [''],
          childAges: [''],
        })
      );
    }
  }

  onSubmit() {
    alert('Submit Successfully');

    console.log(this.yourForm.value);
    this.yourForm.reset({
      inputField: '',
      start: null, // Set null or empty value for specific form controls
      end: null,
      selectedCountry: '',
      adults: '',
      childrens: '',
      childAges: '',
      roomsSelect: '',
    });

    // const destination = this.yourForm.get('inputField')?.value;
    // const startValue = this.yourForm.get('start')?.value;
    // const endValue = this.yourForm.get('end')?.value;
    // const selectedCountry = this.selectedCountry.value;

    // console.log('Selected Country:', selectedCountry);

    // console.log('Destination Value:', destination);
    // console.log('Date: ' + startValue + ' - ' + endValue);

    // const roomDetailsArray = this.roomDetails.controls;
    // for (let i = 0; i < roomDetailsArray.length; i++) {
    //   const roomDetail = roomDetailsArray[i] as FormGroup;
    //   const childrensValue = roomDetail.get('childrens')?.value;
    //   const adultValue = roomDetail.get('adults')?.value;
    //   const childrensAge = roomDetail.get('childAges')?.value;

    //   console.log('Room', i + 1, 'Adults Value:', adultValue);
    //   console.log('Room', i + 1, 'Childrens Value:', childrensValue);
    //   console.log('Room', i + 1, 'Childrens-Age:', childrensAge);
    // }

    // this.yourForm.reset();
  }
}
