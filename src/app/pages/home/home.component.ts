import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackendService} from "../../services/backend.service";
import {Subscription} from "rxjs";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormsModule} from "@angular/forms";
import {FirstLetterUpperCasePipe} from "../../pipes/first-letter-upper-case.pipe";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DeleteHeroDialogComponent} from "../../components/delete-hero-dialog/delete-hero-dialog.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {IHeroModel} from "../../models/hero.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
    FirstLetterUpperCasePipe,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private readonly backendService = inject(BackendService)
  private readonly matDialog = inject(MatDialog)
  private readonly matSnackbar = inject(MatSnackBar)
  private readonly router = inject(Router)

  private lastRequest: Subscription | undefined
  pageIndex = 0
  pageSize = 20
  totalItems = 0
  listHeroes: IHeroModel[] = []
  loadingListHeroes = false
  searchName: string = ''

  ngOnInit() {
    this.searchHeroes()
  }

  searchHeroes() {
    this.loadingListHeroes = true
    if (this.lastRequest) this.lastRequest.unsubscribe()
    this.lastRequest = this.backendService
      .getHeroes({pageIndex: this.pageIndex, pageSize: this.pageSize, name: this.searchName})
      .subscribe({
        next: response => {
          this.listHeroes = response.data
          this.totalItems = response.totalItems
          console.log(response)
        }, error: () => {
        },
        complete: () => {
          this.loadingListHeroes = false
        }
      })
  }

  resetPagination() {
    this.pageIndex = 0
  }

  pageChange(event: PageEvent) {
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize
      this.resetPagination()
    } else if (this.pageIndex !== event.pageIndex) {
      this.pageIndex = event.pageIndex
    }
    this.searchHeroes()
  }

  onClickRemoveHero(hero: IHeroModel) {
    const dialogRef = this.matDialog.open(DeleteHeroDialogComponent, {
      data: { id: hero.id, name: hero.name }
    })
    dialogRef.afterClosed().subscribe( (result) =>  {
      if (result.remove) {
        // Logic here research

        this.matSnackbar.open(`El héroe ${result.hero.name} se ha borrado correctamente.`, undefined, {
          duration: 3000
        })
      }
    })
  }

  onClickEditHero(hero: IHeroModel) {
    this.router.navigate(['edit'], { queryParams: {id: hero.id} })
  }

  onClickNewHero() {
    this.router.navigate(['create'])
  }

}
