import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  BehaviorSubject,
  EMPTY,
  empty,
  fromEvent,
  interval,
  mapTo,
  merge,
  Observable,
  scan,
  startWith,
  switchMap,
  takeWhile
} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({

    });
  }

  ngOnInit(): void {

  }

}
