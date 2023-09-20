import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {FormGroup, RequiredValidator, UntypedFormBuilder, Validators} from "@angular/forms";
import {catchError, delay, finalize, tap} from "rxjs";
import {UtilsService} from "../../services/utils.service";
import {ChatSentenceDto} from "../../dtos/chat-sentence-dto";
import {ToastService} from "../../services/toast.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CommonService} from "../../services/common.service";
import {Constants} from "../../utils/constants";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  form: FormGroup;

  responseText = "";

  constructor(private http: HttpService,
              private fb: UntypedFormBuilder,
              private utils: UtilsService,
              public toastService: ToastService,
              private spinner: NgxSpinnerService,
              private common: CommonService
              ) {
    this.form = this.fb.group({
      input: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.common.page.next(Constants.EMAIL);
  }

  get input() { return this.form.get('input') }

  onSubmit() {
    this.responseText = "";
    if (this.input?.valid) {
      this.spinner.show();
      this.http.postEmailResponse(this.form.getRawValue())
        .pipe(
          tap((res: ChatSentenceDto) =>
            this.responseText = res.assistent
          ),
          catchError(this.utils.handleError()),
          finalize(() => {
            this.input?.setValue("");
            this.spinner.hide();
          })
        )
        .subscribe();
    } else {
      this.toastService.showError("Please enter some text");
    }
  }
}
