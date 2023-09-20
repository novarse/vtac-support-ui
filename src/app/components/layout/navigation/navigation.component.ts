import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public common: CommonService) { }

  ngOnInit(): void {
  }


}
