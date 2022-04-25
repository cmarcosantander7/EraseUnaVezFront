import { Component, OnInit } from '@angular/core';
import {PublicarService} from "../../../services/publicar.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../../models/post";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {HttpClient} from "@angular/common/http";
import {Image} from "../../../models/image";
import {Categoria} from "../../../models/categoria";
import {CategoriasService} from "../../../services/categorias.service";
import {ImagenesService} from "../../../services/imagenes.service";

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  isLinear = true;
  firstFormGroup?: FormGroup;
  fFormGroup?: FormGroup;
  issloading = true;
  posteo:Post []=[];
  categoria:Categoria=new Categoria();
  ca:Categoria[]=[];
  userName?:String;
  email?:String;
  userId?:String;
  fecha?:Date;
  idimage?:Number;




  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,
              private publicarService:PublicarService, private fechaService:FechaService,
              private httpClient:HttpClient,
              private categoriaService:CategoriasService,
              private imagenService: ImagenesService) { }

  // @ts-ignore
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let userId=params['userId']
      let userName = params['userName']
      let idimage = params['idimage']
      this.userName=userName;
      this.userId=userId;
      this.idimage=idimage;
      console.log(this.userName+'ffff',this.userId+'ffffd',this.email)
      this.publicarService.getAllPosts().subscribe(value => {
        this.posteo= value.filter(value => value.userId== userId);
      })
      this.categoriaService.getAllCate().subscribe(value => {
        this.ca=value
      })
      this.fechaService.getSysdate().subscribe(value => {
        this.fecha=value.fecha;
      })
    })
    this.fFormGroup = this._formBuilder.group({
      nombre: [''],
      descripcion: [''],
    });
    this.firstFormGroup = this._formBuilder.group({
      postName: ['', Validators.required],
      idSubreddit: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  selectOpcion(event:any){
    this.categoriaService.getid(event.target.value).subscribe(data=>{
      this.categoria=data
      console.log("fffff"+this.categoria.id)
    })

  }


  categorias:Categoria = new Categoria();
  obtnerdatosC(){
    // @ts-ignore
    this.categorias.userId = this.userId;
    this.categorias.createdDate=this.fecha;
    return this.categorias;
  }

  post:Post = new Post();
  obtnerdatos(){
    // @ts-ignore
    this.post.userId = this.userId;
    this.post.userName=this.userName;
    this.post.createdDate=this.fecha;
    this.post.idSubreddit=this.categoria.id;
    return this.post;
  }




  createc(){
    var cate=this.obtnerdatosC();
    this.categoriaService.createCategoria(cate).subscribe(value => {
      console.log(this.obtnerdatosC())
      Swal.fire({
        title: 'Exito',
        text: 'CATEGORIA AÑADIDA',
        icon: 'success',
        iconColor :'#17550c',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
      window.location.reload();


    },error => {
      Swal.fire({
        title: 'Error',
        text: 'No se ha podido añadir categoria '+error.error.message,
        icon: 'error',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
      this.issloading=false;
    })
  }


  create(){
    var post=this.obtnerdatos();
    this.publicarService.createPost(post).subscribe(value => {
      console.log(this.obtnerdatos())
      Swal.fire({
        title: 'Éxito',
        text: 'CUENTO PUBLICADO',
        icon: 'success',
        iconColor :'#17550c',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "white",
      })
      this.router.navigate(['/panel/cuentoss/verpublicaciones',post.userId]);


    },error => {
      Swal.fire({
        title: 'Error',
        text: 'No se ha podido publicar el cuento '+error.error.message,
        icon: 'error',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "white",
      })
      this.issloading=false;
    })
  }


  // @ts-ignore
  uploadedImage: File;
  dbImage: any;
  // @ts-ignore
  postResponse: any
  // @ts-ignore
  successResponse: string;
  image: any;
  i:Image=new Image();

  public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
  }




  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);


    this.imagenService.agregarimagen(imageFormData)
      .subscribe(response => {
          this.postResponse = response;
          this.post.idimage = this.postResponse.id;

          console.log(this.postResponse.id + "sfffff")
          this.successResponse = this.postResponse;

          console.log(this.successResponse + "ssss")
          this.issloading = false;
        }
      );

  }

  viewImage() {
    this.httpClient.get('http://localhost:8080/get/image/info/' + this.image)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }




}
