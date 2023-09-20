import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {UtilsService} from "../../services/utils.service";
import {catchError, delay, finalize, tap} from "rxjs";
import {ChatSentenceDto} from "../../dtos/chat-sentence-dto";
import {ToastService} from "../../services/toast.service";
import {Constants} from "../../utils/constants";
import {NgxSpinner, NgxSpinnerService} from "ngx-spinner";
import {CommonService} from "../../services/common.service";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  form: FormGroup;
  historyList: HistoryText[] = [];
  // historyList: HistoryText[] = [new HistoryText(Constants.HISTORYTYPE_CALL, "ghfgf"),
  //   new HistoryText(Constants.HISTORYTYPE_RESPONSE, "<strong>rgfdrsffgrgd hgtgth ghcg h</strong>"),
  //   new HistoryText(Constants.HISTORYTYPE_CALL, "ujyhgrgt fgdt gdhtfhfvcth df"),
  //   new HistoryText(Constants.HISTORYTYPE_RESPONSE, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad atque, delectus, distinctio enim facere id iusto maxime minus optio reiciendis suscipit totam ut. Ad aliquid animi aperiam aspernatur consectetur consequatur consequuntur cupiditate debitis earum ex facilis maiores minima molestiae neque nihil nobis nulla numquam omnis praesentium quaerat quibusdam, quis quod? Asperiores et eum excepturi magnam molestias nemo repellat, repellendus ullam. Accusantium amet aspernatur, consequatur dicta eius illo ipsum magnam molestias nam nemo nostrum quas quia quis quod reiciendis rem repudiandae rerum temporibus totam ut! Ab alias assumenda at dignissimos, distinctio dolore eos esse excepturi facere inventore ipsum iste iure nulla, odit perferendis perspiciatis ratione reprehenderit sapiente voluptas voluptates. Alias delectus, doloremque doloribus, eaque esse eveniet harum maxime nobis officiis perspiciatis quibusdam, rem similique tempore tenetur velit? Ad at facilis in inventore minima, odit placeat possimus tenetur. Accusantium blanditiis commodi culpa cupiditate dolores eos error est excepturi explicabo id, incidunt magnam molestias quis recusandae reprehenderit similique tempora temporibus velit! Ad, at corporis earum est necessitatibus praesentium recusandae ut? Autem, beatae blanditiis delectus dolor est eum excepturi facere facilis itaque laborum minima minus nobis officia officiis quam quas repellendus reprehenderit temporibus unde vitae. Amet deserunt dignissimos dolor dolorum ea est eveniet ex exercitationem explicabo facilis incidunt, inventore ipsa labore minima molestiae porro provident quas quos ratione, sit temporibus ut voluptatum. Ab animi at delectus deleniti doloribus earum eius eos error ex facere illo impedit iusto maxime modi molestiae nostrum nulla optio perferendis placeat praesentium qui quia, quidem quod ratione repellendus suscipit tempora tempore temporibus, voluptas voluptatem! Alias asperiores expedita fugit illum iure labore laboriosam libero natus officiis quisquam. Facere, minima, unde. Animi autem dolor eos facilis ipsa placeat quasi sed sint ullam veritatis. Architecto dolore enim facilis nam officia, quidem repudiandae similique voluptatibus! At atque ea eaque error libero quidem recusandae sint."),
  //   new HistoryText(Constants.HISTORYTYPE_CALL, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad atque, delectus, distinctio enim facere id iusto maxime minus optio reiciendis suscipit totam ut. Ad aliquid animi aperiam aspernatur consectetur consequatur consequuntur cupiditate debitis earum ex facilis maiores minima molestiae neque nihil nobis nulla numquam omnis praesentium quaerat quibusdam, quis quod? Asperiores et eum excepturi magnam molestias nemo repellat, repellendus ullam. Accusantium amet aspernatur, consequatur dicta eius illo ipsum magnam molestias nam nemo nostrum quas quia quis quod reiciendis rem repudiandae rerum temporibus totam ut! Ab alias assumenda at dignissimos, distinctio dolore eos esse excepturi facere inventore ipsum iste iure nulla, odit perferendis perspiciatis ratione reprehenderit sapiente voluptas voluptates. Alias delectus, doloremque doloribus, eaque esse eveniet harum maxime nobis officiis perspiciatis quibusdam, rem similique tempore tenetur velit? Ad at facilis in inventore minima, odit placeat possimus tenetur. Accusantium blanditiis commodi culpa cupiditate dolores eos error est excepturi explicabo id, incidunt magnam molestias quis recusandae reprehenderit similique tempora temporibus velit! Ad, at corporis earum est necessitatibus praesentium recusandae ut? Autem, beatae blanditiis delectus dolor est eum excepturi facere facilis itaque laborum minima minus nobis officia officiis quam quas repellendus reprehenderit temporibus unde vitae. Amet deserunt dignissimos dolor dolorum ea est eveniet ex exercitationem explicabo facilis incidunt, inventore ipsa labore minima molestiae porro provident quas quos ratione, sit temporibus ut voluptatum. Ab animi at delectus deleniti doloribus earum eius eos error ex facere illo impedit iusto maxime modi molestiae nostrum nulla optio perferendis placeat praesentium qui quia, quidem quod ratione repellendus suscipit tempora tempore temporibus, voluptas voluptatem! Alias asperiores expedita fugit illum iure labore laboriosam libero natus officiis quisquam. Facere, minima, unde. Animi autem dolor eos facilis ipsa placeat quasi sed sint ullam veritatis. Architecto dolore enim facilis nam officia, quidem repudiandae similique voluptatibus! At atque ea eaque error libero quidem recusandae sint."),
  //   new HistoryText(Constants.HISTORYTYPE_RESPONSE, "<h4>gg  g g jgh bc</h4>"),
  //   new HistoryText(Constants.HISTORYTYPE_CALL, "uiytgfbv hgfdcx")
  // ];

  constructor(private http: HttpService,
              private fb: UntypedFormBuilder,
              private utils: UtilsService,
              public toastService: ToastService,
              private spinner: NgxSpinnerService,
              private common: CommonService,
              private viewportScroller: ViewportScroller
  ) {
    this.form = this.fb.group({
      input: [null, Validators.required],
      responseText: null,
    })
  }

  ngOnInit(): void {
    this.common.page.next(Constants.CHAT)
  }

  get input() { return this.form.get('input') }
  get responseText() { return this.form.get('responseText') }

  onSubmit() {
    if (this.input?.valid) {
      this.historyList.push(new HistoryText(Constants.HISTORYTYPE_CALL, this.input.value));
      this.spinner.show();
      this.http.postChatResponse(JSON.stringify(this.form.getRawValue()))
        .pipe(
          tap((res: ChatSentenceDto) => {
              this.historyList.push(new HistoryText(Constants.HISTORYTYPE_RESPONSE, res.assistent));
            document.querySelector('#afterInputLine')?.scrollIntoView()
            }
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

  protected readonly Constants = Constants;
}

class HistoryText {
  type!: string;
  text!: string;

  constructor(type: string, text: string) {
    this.type = type;
    this.text = text;
  }
}
