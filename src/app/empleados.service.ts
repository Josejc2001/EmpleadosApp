import { Injectable } from "@angular/core";
import { DataServices } from "./data.sevices";
import { Empleado } from "./empleado.model";
import { ServicioEmpleadosService } from "./servicio-empleados.service";

@Injectable()
export class EmpleadosService{

    constructor(private servicioAlert: ServicioEmpleadosService, private dataService:DataServices){}

    empleados:Empleado[]=[];
    /*
    empleados:Empleado[]=[
        new Empleado("Juan", "Diaz", "Presidente", 7500),
        new Empleado("Marta", "Gonzales", "Limpiadora", 1500),
        new Empleado("Jose", "Jimenez", "Director", 4000),
        new Empleado("Luis", "Guerra", "Gerente", 3000)
    ];
    */

    obtenerEmpleados(){
        return this.dataService.cargarEmpleados();
    }

    setEmpleados(misEmpleados:Empleado[]){
        this.empleados = misEmpleados;
    }

    agregarEmpleadoServicio(miEmpleado:Empleado){
        this.servicioAlert.muestraMensaje("Persona que se va a agregar: " + "\n" +
        miEmpleado.nombre + "\n" + "Salario: " + miEmpleado.salario);
        this.empleados.push(miEmpleado);
        this.dataService.guardarEmpleados(this.empleados);
    }

    encontrarEmpleado(indice:number){
        let empleado:Empleado=this.empleados[indice];

        return empleado;
    }

    actualizarEmpleado(indice:number, empleado:Empleado){
        let empleadoModificado= this.empleados[indice];

        empleadoModificado.nombre = empleado.nombre;
        empleadoModificado.apellido = empleado.apellido;
        empleadoModificado.cargo = empleado.cargo;
        empleadoModificado.salario = empleado.salario;

        this.dataService.actualizarEmpleado(indice, empleado);
    }

    eliminarEmpleado(indice:number){
        this.empleados.splice(indice,1);
        this.dataService.eliminarEmpleado(indice);
        if (this.empleados != null) this.dataService.guardarEmpleados(this.empleados);
    }
}