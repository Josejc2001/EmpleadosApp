import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../empleado.model';
import { EmpleadosService } from '../empleados.service';
import { ServicioEmpleadosService } from '../servicio-empleados.service';

@Component({
  selector: 'app-actualiza-component',
  templateUrl: './actualiza-component.component.html',
  styleUrls: ['./actualiza-component.component.css']
})
export class ActualizaComponentComponent {
  constructor(private router:Router, private route:ActivatedRoute, private miServicio:ServicioEmpleadosService, private empleadosService:EmpleadosService){}

  empleados:Empleado[]=[];

  accion:number;

  ngOnInit(): void {
    this.accion = parseInt(this.route.snapshot.queryParams['accion']);
    this.empleados = this.empleadosService.empleados;
    this.indice = this.route.snapshot.params['id'];

    let empleado:Empleado=this.empleadosService.encontrarEmpleado(this.indice);

    this.cuadroNombre=empleado.nombre;
    this.cuadroApellido=empleado.apellido;
    this.cuadroCargo=empleado.cargo;
    this.cuadroSalario=empleado.salario;
  }

  volverHome(){
    this.router.navigate(['']);
    //window.location.reload();
    setTimeout(function reset() {
      location.reload();
    },100);
    
  }

  titulo = 'Listado de Empleados';

  cuadroNombre:string="";
  cuadroApellido:string="";
  cuadroCargo:string="";
  cuadroSalario:number=0;
  indice:number;

  /*
  actualizarEmpleado(){
    let miEmpleado=new Empleado(this.cuadroNombre, this.cuadroApellido, this.cuadroCargo, this.cuadroSalario);

    this.empleadosService.actualizarEmpleado(this.indice,miEmpleado)

    this.router.navigate(['']);
  }

  eliminarEmpleado(){
    this.empleadosService.eliminarEmpleado(this.indice);

    this.router.navigate(['']);
  }
  */

  actualizarEmpleado(){
    if(this.accion==1){
      let miEmpleado=new Empleado(this.cuadroNombre, this.cuadroApellido, this.cuadroCargo, this.cuadroSalario);

      this.empleadosService.actualizarEmpleado(this.indice,miEmpleado)
      this.volverHome();

    } else{
      this.empleadosService.eliminarEmpleado(this.indice);
      this.volverHome();
    }
  }
}
