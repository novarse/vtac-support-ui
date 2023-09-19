import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {FormGroup, UntypedFormBuilder} from "@angular/forms";
import {catchError, tap} from "rxjs";
import {UtilsService} from "../../services/utils.service";
import {ChatSentenceDto} from "../../dtos/chat-sentence-dto";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  form: FormGroup;

  constructor(private http: HttpService,
              private fb: UntypedFormBuilder,
              private utils: UtilsService
              ) {
    this.form = this.fb.group({
      inputText: null,
      responseText: null
    })
  }

  ngOnInit(): void {

  }

  get inputText() { return this.form.get('inputText') }
  get responseText() { return this.form.get('responseText') }

  onSubmit() {
    this.http.postEmailResponse(JSON.stringify({'input': 'ghffgddf'}))
      .pipe(
        tap((res: ChatSentenceDto) =>
          this.responseText?.setValue(res.assistent)
        ),
        catchError(this.utils.handleError())
      )
      .subscribe();
  }
}
