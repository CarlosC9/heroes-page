import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {IHeroModel} from "../../models/hero.model";
import {BackendService} from "../../services/backend.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  private readonly route = inject(ActivatedRoute)
  private readonly backendService = inject(BackendService)
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private matSnackBar = inject(MatSnackBar)

  loading = true
  hero: IHeroModel | undefined
  form: UntypedFormGroup = this.fb.group({
    name: [''],
  })

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams
    if (queryParams['id']) {
      const id = Number(queryParams['id'])
      this.getHero(id)
    } else {
      this.loading = false
    }
  }

  editFormByHero() {
    this.form.get('name')?.setValue(this.hero?.name ?? '')
  }

  getHero(id: number) {
    this.backendService.getHeroById(id).subscribe({
      next: response => {
        this.hero = response
        this.editFormByHero()
      }, complete: () => {
        this.loading = false
      }
    })
  }

  onAcceptForm(){
    if (this.hero) {
      // Logic for modify hero
      this.matSnackBar.open("Se ha modificado el heroe con éxito.")
    } else {
      // Logic for new hero
      this.matSnackBar.open("Se ha creado el nuevo heroe")
    }
    this.router.navigate(['home'])
  }

  onCancelForm() {
    this.router.navigate(['home'])
  }

}
