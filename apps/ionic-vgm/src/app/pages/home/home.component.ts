import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, DataFetchService } from '@vgm/xplat/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  styles: [
    `
      ion-content {
        --background: #fff url('../../assets/imgs/home-bg.png') no-repeat center
          center / cover;
      }
      .responsive-logo {
        width: 200px;
      }
    `,
  ],
})
export class HomeComponent extends BaseComponent implements OnInit {
  redirectTo: string = 'muc-luc';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dataFetchService: DataFetchService
  ) {
    super();
  }

  ngOnInit(): void {
    this.dataFetchService.init();
    const { redirectTo } = this.activatedRoute.snapshot.queryParams;
    if (redirectTo) {
      this.redirectTo = redirectTo;
    }
  }

  handleEnter() {
    this.router.navigateByUrl(this.redirectTo, { replaceUrl: true });
  }
}
