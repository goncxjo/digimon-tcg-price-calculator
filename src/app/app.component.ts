import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Cargando...';

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let title: string | null = null;
        let showPageTitle = true;

        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        if (child?.snapshot.data['title']) {
          title = child.snapshot.data['title'];
        }
        if (child?.snapshot.data['pageTitleHidden']) {
          showPageTitle = !child.snapshot.data['pageTitleHidden'];
        }
        return { title, showPageTitle };
      }),
    ).subscribe((cfg) => this.setTitle(cfg));
  }

  private setTitle(cfg: any) {
    this.title = cfg.showPageTitle ? cfg.title : '';
    this.titleService.setTitle('Price Calculator' + (cfg.title ? ' - ' + cfg.title : ''));
  }
}
