/*
    Juan Pablo Ángel Yaxón Taquirá
    IN5AM
    2019386
    Fecha de Creación:
        11-04-2023
    Fecha de Modificación:
        06-06-2023
*/

package org.juanyaxon.main;

import java.io.IOException;
import java.io.InputStream;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.fxml.JavaFXBuilderFactory;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import org.juanyaxon.controller.EmpleadosController;
import org.juanyaxon.controller.EmpresaController;
import org.juanyaxon.controller.LoginController;
import org.juanyaxon.controller.MenuPrincipalController;
import org.juanyaxon.controller.PlatosController;
import org.juanyaxon.controller.PresupuestoController;
import org.juanyaxon.controller.ProductoController;
import org.juanyaxon.controller.ProductosHasPlatosController;
import org.juanyaxon.controller.ProgramadorController;
import org.juanyaxon.controller.ServiciosController;
import org.juanyaxon.controller.ServiciosHasEmpleadosController;
import org.juanyaxon.controller.ServiciosHasPlatosController;
import org.juanyaxon.controller.TipoEmpleadoController;
import org.juanyaxon.controller.TipoPlatoController;
import org.juanyaxon.controller.UsuarioController;

public class Principal extends Application {
    private final String PAQUETE_VISTA = "/org/juanyaxon/view/";
    private Stage escenarioPrincipal;
    private Scene escena;
    
    @Override
    public void start(Stage escenarioPrincipal) throws IOException {
        this.escenarioPrincipal = escenarioPrincipal;
        this.escenarioPrincipal.setTitle("Tony's Kinal 2023");
        escenarioPrincipal.getIcons().add(new Image("/org/juanyaxon/image/favicon.png"));
        login();
        escenarioPrincipal.show();
    }
    
    
    public void menuPrincipal(){
        try{
            MenuPrincipalController menu = (MenuPrincipalController)cambiarEscena("MenuPrincipalView.fxml", 614, 494);
            menu.setEscenarioPrincipal(this);  
        }catch(Exception e){
                e.printStackTrace(); 
        }
    }
    
    public void ventanaProgramador(){
        try{
            ProgramadorController programador = (ProgramadorController)cambiarEscena("ProgramadorView.fxml", 600, 492);
            programador.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    public void ventanaEmpresas(){
        try{
            EmpresaController empresa = (EmpresaController)cambiarEscena("EmpresaView.fxml", 1072, 564);
            empresa.setEscenarioPrincipal(this);
            
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    public void ventanaTipoEmpleado(){
        try{
            TipoEmpleadoController tipoEmpleado = (TipoEmpleadoController)cambiarEscena("TipoEmpleadoView.fxml", 1072, 564);
            tipoEmpleado.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
     
    public void ventanaTipoPlato(){
         try{
             TipoPlatoController tipoPlato = (TipoPlatoController)cambiarEscena("TipoPlatoView.fxml", 1072, 601);
             tipoPlato.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
    
    public void ventanaServiciosHasEmpleados(){
         try{
             ServiciosHasEmpleadosController serviciosHasEmpleados = (ServiciosHasEmpleadosController)cambiarEscena("ServiciosHasEmpleadosView.fxml", 1072, 599);
             serviciosHasEmpleados.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
    
    public void ventanaServiciosHasPlatos(){
         try{
             ServiciosHasPlatosController serviciosHasPlatos = (ServiciosHasPlatosController)cambiarEscena("ServiciosHasPlatosView.fxml", 1072, 599);
             serviciosHasPlatos.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
    
    public void ventanaProductosHasPlatos(){
         try{
             ProductosHasPlatosController productosHasPlatos = (ProductosHasPlatosController)cambiarEscena("ProductosHasPlatosView.fxml", 1072, 599);
             productosHasPlatos.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
     
     public void ventanaProductos(){
         try{
             ProductoController producto = (ProductoController)cambiarEscena("ProductosView.fxml", 1072, 599);
             producto.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
     
     public void ventanaPresupuesto(){
         try{
             PresupuestoController presupuesto = (PresupuestoController)cambiarEscena("PresupuestoView.fxml", 1072, 564);
             presupuesto.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
     
     public void ventanaEmpleados(){
         try{
             EmpleadosController empleados = (EmpleadosController) cambiarEscena("EmpleadosView.fxml", 1209, 657);
             empleados.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
     
     public void ventanaPlatos(){
         try{
             PlatosController platos = (PlatosController) cambiarEscena("PlatosView.fxml", 1072, 564);
             platos.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
     
     public void ventanaServicios(){
         try{
             ServiciosController servicios = (ServiciosController)cambiarEscena("ServiciosView.fxml", 1194, 645);
             servicios.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
     
     public void login(){
         try{
             LoginController login = (LoginController)cambiarEscena("LoginView.fxml", 812,633);
             login.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
     
     public void ventanaUsuario(){
         try{
             UsuarioController usuario = (UsuarioController) cambiarEscena("UsuarioView.fxml", 887, 604);
             usuario.setEscenarioPrincipal(this);
         }catch(Exception e){
             e.printStackTrace();
         }
     }
     
     
    
    public Initializable cambiarEscena(String fxml, int ancho, int alto) throws Exception{
        Initializable resultado = null;
        FXMLLoader cargadorFXML = new FXMLLoader();
        InputStream archivo = Principal.class.getResourceAsStream(PAQUETE_VISTA+fxml);
        cargadorFXML.setBuilderFactory(new JavaFXBuilderFactory());
        cargadorFXML.setLocation(Principal.class.getResource(PAQUETE_VISTA+fxml));
        escena = new Scene((AnchorPane)cargadorFXML.load(archivo), ancho, alto);
        escenarioPrincipal.setScene(escena);
        escenarioPrincipal.sizeToScene();
        resultado = (Initializable)cargadorFXML.getController();
        
        
        return resultado;
    }

  
    public static void main(String[] args) {
        launch(args);
    }
    
    
}
