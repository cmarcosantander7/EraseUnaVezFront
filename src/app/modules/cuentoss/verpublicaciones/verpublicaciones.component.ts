import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentRequest, Post} from "../../../models/post";
import {PublicarService} from "../../../services/publicar.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {map, Observable, startWith} from "rxjs";
import {DateAdapter} from "@angular/material/core";
import {Comentario} from "../../../models/comentario";
import {Image} from "../../../models/image";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {ImagenesService} from "../../../services/imagenes.service";

@Component({
  selector: 'app-verpublicaciones',
  templateUrl: './verpublicaciones.component.html',
  styleUrls: ['./verpublicaciones.component.css']
})
export class VerpublicacionesComponent implements OnInit {
  activar?: boolean = false;
  sum = 0;
  isLinear = true;
  panelOpenState = true;
  isexist?: boolean;
  canBotton: boolean = false
  numerominimo = 0;
  issloading = true;
  myControl = new FormControl();
  filteredOptions?: Observable<Post[]>;
  username?: String;
  posteos: Post[] = [];
  posteo?: Number;
  idimage?:Number;
  seleccionims:Image[]=[];
  constructor(private publicarService: PublicarService,
              private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>, private router: Router, private httpClient: HttpClient,
              private domSanitizer: DomSanitizer,private imagenService:ImagenesService) {
    this._adapter.setLocale('es-ec');

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      let username = params['username']
      this.username = username;

      console.log(username)

      this.publicarService.getAllPosts().subscribe(p => {
        this.posteos = p;

        p.filter(value => {value.id!=0})
        console.log(p)
        this.isexist = p.length != 0;
        this.issloading = false;



        // @ts-ignore
        p.forEach(element => {this.posteo=element.idimage

          console.log(this.posteo+"kjhgfd")

/////

            this.imagenService.getimg(this.posteo)
              .subscribe(
                res => {
                  this.receivedImageData  = res;
                  this.base64Data = this.receivedImageData.image;
                  this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                }
              );


//////////
        });




        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        console.log(this.posteos)
      })
    })

  }


  ngAfterViewInit(): void {
    setTimeout(() => {

    }, 1000)
  }

  filter(value: any): Post[] {
    const filterValue = value.toLowerCase();
    return this.posteos.filter(option => option.postName?.toLowerCase().includes(filterValue)

      // ||option.url?.toLocaleLowerCase().includes(filterValue)
    );
  }


  // @ts-ignore
  uploadedImage: File;
  dbImage?:string;
  // @ts-ignore
  postResponse:Image=new Image()
  // @ts-ignore
  successResponse: string;
  image: any;

  // @ts-ignore
  public selectedFile;
  imgURL: any;
  receivedImageData: Image=new Image();
  base64Data: any;
  convertedImage: any;
  retrieveResonse: any;
  retrievedImage:any;


  viewImage() {
    this.imagenService.getimg(this.image)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }



}
