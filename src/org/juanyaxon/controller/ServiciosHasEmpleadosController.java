package org.juanyaxon.controller;

import com.jfoenix.controls.JFXDatePicker;
import com.jfoenix.controls.JFXTimePicker;
import java.net.URL;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;
import javax.swing.JOptionPane;
import org.juanyaxon.bean.Empleados;
import org.juanyaxon.bean.Servicios;
import org.juanyaxon.bean.ServiciosHasEmpleados;
import org.juanyaxon.db.Conexion;
import org.juanyaxon.main.Principal;
import org.juanyaxon.report.GenerarReporte;

public class ServiciosHasEmpleadosController implements Initializable{ 
    
    private Principal escenarioPrincipal; 
    private enum operaciones {GUARDAR, NINGUNO, ACTUALIZAR};
    private operaciones tipoDeOperacion = operaciones.NINGUNO;
    private ObservableList <ServiciosHasEmpleados>listaServiciosHasEmpleados;
    private ObservableList <Empleados>listaEmpleado;
    private ObservableList <Servicios>listaServicio;
    
    @FXML private TextField txtServiciosCodServicios;
    @FXML private JFXTimePicker jfxHoraEvento;
    @FXML private JFXDatePicker jfxFechaEvento;
    @FXML private ComboBox cmbCodigoEmpleado;
    @FXML private ComboBox cmbCodigoServicio;
    @FXML private TextField txtLugarEvento;
    @FXML private TableView tblServiciosHasEmpleados;
    @FXML private TableColumn colServiciosCodServicio;
    @FXML private TableColumn colCodServicio;
    @FXML private TableColumn colCodEmpleado;
    @FXML private TableColumn colFechaEvento;
    @FXML private TableColumn colHoraEvento;
    @FXML private TableColumn colLugarEvento;
    @FXML private Button btnNuevo;
    @FXML private Button btnEditar;
    @FXML private Button btnReporte;
    @FXML private ImageView imgNuevo;
    @FXML private ImageView imgEditar;
    @FXML private ImageView imgReporte;
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        cargarDatos();
        cmbCodigoEmpleado.setItems(getEmpleado());
        cmbCodigoServicio.setItems(getServicio());
        jfxFechaEvento.setDisable(true);
        jfxHoraEvento.setDisable(true);
    }
    
    public void seleccionarElemento(){
        if(tblServiciosHasEmpleados.getSelectionModel().getSelectedItem() != null){
            txtServiciosCodServicios.setText(String.valueOf(((ServiciosHasEmpleados)tblServiciosHasEmpleados.getSelectionModel().getSelectedItem()).getServicios_codigoServicio()));
            cmbCodigoServicio.getSelectionModel().select(buscarServicio(((ServiciosHasEmpleados)tblServiciosHasEmpleados.getSelectionModel().getSelectedItem()).getCodigoServicio()));
            cmbCodigoEmpleado.getSelectionModel().select(buscarEmpleado(((ServiciosHasEmpleados)tblServiciosHasEmpleados.getSelectionModel().getSelectedItem()).getCodigoEmpleado()));
            jfxFechaEvento.setValue(LocalDate.parse(((ServiciosHasEmpleados)tblServiciosHasEmpleados.getSelectionModel().getSelectedItem()).getFechaEvento()));
            jfxHoraEvento.setValue(LocalTime.parse(((ServiciosHasEmpleados)tblServiciosHasEmpleados.getSelectionModel().getSelectedItem()).getHoraEvento()));
            txtLugarEvento.setText(((ServiciosHasEmpleados)tblServiciosHasEmpleados.getSelectionModel().getSelectedItem()).getLugarEvento());
        }else{
            Alert alert = new Alert(Alert.AlertType.WARNING);
            Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
            stage.getIcons().add(new Image("/org/juanyaxon/image/advertencia.png"));
            alert.setHeaderText(null);
            alert.setContentText("Debes seleccionar un registro. ");
            alert.showAndWait();
        }
    }
    
    public void cargarDatos(){
        tblServiciosHasEmpleados.setItems(getServiciosHasEmpleados());
        colServiciosCodServicio.setCellValueFactory(new PropertyValueFactory <ServiciosHasEmpleados, Integer>("Servicios_codigoServicio"));
        colCodServicio.setCellValueFactory(new PropertyValueFactory <ServiciosHasEmpleados, Integer>("codigoServicio"));
        colCodEmpleado.setCellValueFactory(new PropertyValueFactory <ServiciosHasEmpleados, Integer>("codigoEmpleado"));
        colFechaEvento.setCellValueFactory(new PropertyValueFactory <ServiciosHasEmpleados, Date>("fechaEvento"));
        colHoraEvento.setCellValueFactory(new PropertyValueFactory <ServiciosHasEmpleados, String>("horaEvento"));
        colLugarEvento.setCellValueFactory(new PropertyValueFactory<ServiciosHasEmpleados, String>("lugarEvento"));
    }
 
    public void nuevo(){
        switch(tipoDeOperacion){
            case NINGUNO:
                activarControles();
                limpiarControles();
                btnNuevo.setText("Guardar");
                btnReporte.setText("Cancelar");
                btnEditar.setDisable(true);
                imgNuevo.setImage(new Image("/org/juanyaxon/image/save.png"));
                imgReporte.setImage(new Image("/org/juanyaxon/image/cancel.png"));
                tipoDeOperacion = operaciones.GUARDAR;
                break;
            case GUARDAR:
                guardar();
                limpiarControles();
                desactivarControles();
                btnNuevo.setText("Nuevo");
                btnEditar.setDisable(false);
                btnReporte.setText("Reporte");
                imgNuevo.setImage(new Image("/org/juanyaxon/image/nuevo.png"));
                imgReporte.setImage(new Image("/org/juanyaxon/image/reporte.png"));
                tipoDeOperacion = operaciones.NINGUNO;
                cargarDatos();
                break;
        }
    }
    
    public void guardar(){
        ServiciosHasEmpleados registro = new ServiciosHasEmpleados();
            registro.setServicios_codigoServicio(Integer.parseInt(txtServiciosCodServicios.getText()));
            registro.setCodigoServicio(((Servicios)cmbCodigoServicio.getSelectionModel().getSelectedItem()).getCodigoServicio());
            registro.setCodigoEmpleado(((Empleados)cmbCodigoEmpleado.getSelectionModel().getSelectedItem()).getCodigoEmpleado());
            registro.setFechaEvento(String.valueOf(jfxFechaEvento.getValue()));
            registro.setHoraEvento(String.valueOf(jfxHoraEvento.getValue()));
            registro.setLugarEvento(txtLugarEvento.getText());
            try{
                PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_AgregarServicios_has_Empleados(?,?,?,?,?,?)");
                procedimiento.setInt(1, registro.getServicios_codigoServicio());
                procedimiento.setInt(2, registro.getCodigoServicio());
                procedimiento.setInt(3, registro.getCodigoEmpleado());
                procedimiento.setString(4, registro.getFechaEvento());
                procedimiento.setString(5, registro.getHoraEvento());
                procedimiento.setString(6, registro.getLugarEvento());
                procedimiento.execute();
                listaServiciosHasEmpleados.add(registro);
            }catch(SQLException e){
                JOptionPane.showMessageDialog(null, "Los datos no pueden ser iguales. ");
            }catch(Exception e){
                e.printStackTrace();
            }
    }
    
    public void editar(){
        switch(tipoDeOperacion){
            case NINGUNO:
                if(tblServiciosHasEmpleados.getSelectionModel().getSelectedItem() != null){
                    btnNuevo.setDisable(true);
                    btnNuevo.setText("Nuevo");
                    btnReporte.setText("Eliminar");
                    imgEditar.setImage(new Image("/org/juanyaxon/image/update.png"));
                    imgReporte.setImage(new Image("/org/juanyaxon/image/cancel.png"));
                    activarControles();
                    txtServiciosCodServicios.setEditable(false);
                    cmbCodigoServicio.setDisable(true);
                    cmbCodigoEmpleado.setDisable(true);
                    tipoDeOperacion = operaciones.ACTUALIZAR;
                }else{
                    Alert alert = new Alert(Alert.AlertType.WARNING);
                    Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
                    stage.getIcons().add(new Image("/org/juanyaxon/image/advertencia.png"));
                    alert.setTitle("Advertencia");
                    alert.setHeaderText("Selecciona un registro de la tabla");
                    alert.setContentText("Debe seleccionar un registro para editar");
                    alert.showAndWait(); 
                }
                break;
            case ACTUALIZAR:
                actualizar();
                limpiarControles();
                desactivarControles();
                btnNuevo.setDisable(false);
                btnEditar.setText("Editar");
                btnReporte.setText("Reporte");
                imgEditar.setImage(new Image("/org/juanyaxon/image/editar.png"));
                imgReporte.setImage(new Image("/org/juanyaxon/image/reporte.png"));
                tipoDeOperacion = operaciones.NINGUNO;
                cargarDatos();
                break;
        }
    }
    
    public void actualizar(){
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_Servicios_has_Empleado(?,?,?,?)");
            ServiciosHasEmpleados registro = (ServiciosHasEmpleados)tblServiciosHasEmpleados.getSelectionModel().getSelectedItem();
            registro.setFechaEvento(String.valueOf(jfxFechaEvento.getValue())); 
            registro.setHoraEvento(String.valueOf(jfxHoraEvento.getValue()));
            registro.setLugarEvento(txtLugarEvento.getText());
            procedimiento.setInt(1, registro.getServicios_codigoServicio());
            procedimiento.setString(2, registro.getFechaEvento());
            procedimiento.setString(3, registro.getHoraEvento());
            procedimiento.setString(4, registro.getLugarEvento());
            procedimiento.execute();
        }catch(Exception e){
            e.printStackTrace();
        }    
    }
   
    public void generarReporte(){
        switch(tipoDeOperacion){
            case NINGUNO:
                imprimirReporte();
                break;
            case ACTUALIZAR:
                limpiarControles();
                desactivarControles();
                btnNuevo.setDisable(false);
                btnEditar.setText("Editar");
                btnReporte.setText("Reporte");
                imgEditar.setImage(new Image("/org/juanyaxon/image/editar.png"));
                imgReporte.setImage(new Image("/org/juanyaxon/image/reporte.png"));
                tipoDeOperacion = operaciones.NINGUNO;
                tblServiciosHasEmpleados.getSelectionModel().clearSelection();
                break;
        }
    }
    
    public void imprimirReporte(){
        Map parametros = new HashMap();
        parametros.put("RUTA_IMAGEN", PresupuestoController.class.getResource("/org/juanyaxon/image/logoBackground.png"));
        GenerarReporte.mostrarReporte("ReporteServiciosHasEmpleados.jasper", "Reporte de Servicios Has Empleados", parametros);
    }
    
    public Empleados buscarEmpleado(int codigoEmpleado) {
        Empleados registro = null;

        try {
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_BuscarEmpleado(?)");
            procedimiento.setInt(1, codigoEmpleado);
            ResultSet resultado = procedimiento.executeQuery();
            while (resultado.next()) {
                registro = new Empleados(resultado.getInt("codigoEmpleado"),
                                        resultado.getInt("numeroEmpleado"), 
                                        resultado.getString("apellidoEmpleado"), 
                                        resultado.getString("nombresEmpleado"), 
                                        resultado.getString("direccionEmpleado"),
                                        resultado.getString("telefonoContacto"), 
                                        resultado.getString("gradoCocinero"),
                                        resultado.getInt("codigoTipoEmpleado"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return registro;
    }
    
    public Servicios buscarServicio(int codigoServicio){
        Servicios registro = null;
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_BuscarServicio(?)");
            procedimiento.setInt(1, codigoServicio);
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                registro = new Servicios(resultado.getInt("codigoServicio"),
                    resultado.getString("fechaServicio"), 
                    resultado.getString("tipoServicio"),
                    resultado.getString("horaServicio"), 
                    resultado.getString("lugarServicio"),
                    resultado.getString("telefonoContacto"), 
                    resultado.getInt("codigoEmpresa")
                );
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return registro;
    }
    
    public ObservableList<ServiciosHasEmpleados> getServiciosHasEmpleados(){
        ArrayList<ServiciosHasEmpleados> lista  =  new ArrayList <ServiciosHasEmpleados>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_ListarServicios_has_Empleados()");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new ServiciosHasEmpleados(resultado.getInt("Servicios_codigoServicio"),
                        resultado.getInt("codigoEmpleado"),
                        resultado.getInt("codigoServicio"),
                        resultado.getString("fechaEvento"),
                        resultado.getString("horaEvento"),
                        resultado.getString("lugarEvento")));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaServiciosHasEmpleados = FXCollections.observableArrayList(lista);
    }
    
    public ObservableList<Empleados> getEmpleado(){
        ArrayList <Empleados> lista = new ArrayList<Empleados>();
        try{
            PreparedStatement procedimiento =  Conexion.getInstance().getConexion().prepareCall("call sp_ListarEmpleados()");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new Empleados (resultado.getInt("codigoEmpleado"),
                        resultado.getInt("numeroEmpleado"),
                        resultado.getString("apellidoEmpleado"),
                        resultado.getString("nombresEmpleado"),
                        resultado.getString("direccionEmpleado"),
                        resultado.getString("telefonoContacto"),
                        resultado.getString("gradoCocinero"),
                        resultado.getInt("codigoTipoEmpleado")));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaEmpleado = FXCollections.observableArrayList(lista);
    }
    
    public ObservableList <Servicios> getServicio(){
        ArrayList<Servicios> lista = new ArrayList<Servicios>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_ListarServicios()");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new Servicios (resultado.getInt("codigoServicio"),
                        resultado.getString("fechaServicio"),
                        resultado.getString("tipoServicio"),
                        resultado.getString("horaServicio"),
                        resultado.getString("lugarServicio"),
                        resultado.getString("telefonoContacto"),
                        resultado.getInt("codigoEmpresa")));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaServicio =  FXCollections.observableArrayList(lista);
    }
    
    public void desactivarControles(){
        txtServiciosCodServicios.setEditable(false);
        txtLugarEvento.setEditable(false);
        jfxFechaEvento.setDisable(true);
        jfxHoraEvento.setDisable(true);
        cmbCodigoEmpleado.setDisable(true);
        cmbCodigoServicio.setDisable(true);
    }

    public void activarControles(){
        txtServiciosCodServicios.setEditable(true);
        txtLugarEvento.setEditable(true);
        jfxFechaEvento.setDisable(false);
        jfxHoraEvento.setDisable(false);
        cmbCodigoEmpleado.setDisable(false);
        cmbCodigoServicio.setDisable(false);
        
    }
    
    public void limpiarControles(){
        txtServiciosCodServicios.clear();
        txtLugarEvento.clear();
        jfxHoraEvento.setValue(null);
        jfxFechaEvento.setValue(null);
        cmbCodigoEmpleado.setValue(null);
        cmbCodigoServicio.setValue(null);
    }

    public Principal getEscenarioPrincipal() {
        return escenarioPrincipal;
    }

    public void setEscenarioPrincipal(Principal escenarioPrincipal) {
        this.escenarioPrincipal = escenarioPrincipal;
    }
    
    public void menuPrincipal(){
        escenarioPrincipal.menuPrincipal();
    }
}
