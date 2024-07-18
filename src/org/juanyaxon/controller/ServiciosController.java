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
import org.juanyaxon.bean.Empresa;
import org.juanyaxon.bean.Servicios;
import org.juanyaxon.db.Conexion;
import org.juanyaxon.main.Principal;
import org.juanyaxon.report.GenerarReporte;

public class ServiciosController implements Initializable{
    private enum operaciones {GUARDAR, ELIMINAR, ACTUALIZAR, NINGUNO, CANCELAR};
    private operaciones tipoDeOperacion = operaciones.NINGUNO;
    private Principal escenarioPrincipal;
    private ObservableList<Servicios>  listaServicios;
    private ObservableList<Empresa> listaEmpresa;
    
    @FXML private TextField txtCodigoServicio;
    @FXML private TextField txtTipoServicio;
    @FXML private TextField txtTelefonoContacto;
    @FXML private TextField txtLugarServicio;
    @FXML private JFXTimePicker jfxHoraServicio;
    @FXML private ComboBox cmbCodigoEmpresa;
    @FXML private JFXDatePicker jfxFechaServicio;
    @FXML private TableView tblServicios;
    @FXML private TableColumn colCodigoServicio;
    @FXML private TableColumn colFechaServicio;
    @FXML private TableColumn colTipoServicio;
    @FXML private TableColumn colHoraServicio;
    @FXML private TableColumn colLugarServicio;
    @FXML private TableColumn colTelefono;
    @FXML private TableColumn colCodigoEmpresa;
    @FXML private Button btnNuevo;
    @FXML private Button btnEliminar;
    @FXML private Button btnEditar;
    @FXML private Button btnReporte;
    @FXML private ImageView imgNuevo;
    @FXML private ImageView imgEliminar;
    @FXML private ImageView imgEditar;
    @FXML private ImageView imgReporte;
    
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {   
        cmbCodigoEmpresa.setItems(getEmpresa());
        jfxHoraServicio.setDisable(true);
        jfxFechaServicio.setDisable(true);
        cmbCodigoEmpresa.setDisable(true);
        cargarDatos();
    }
    
    public void seleccionarElemento(){
        if(tblServicios.getSelectionModel().getSelectedItem()!= null){
            txtCodigoServicio.setText(String.valueOf(((Servicios)tblServicios.getSelectionModel().getSelectedItem()).getCodigoServicio()));
            txtLugarServicio.setText(String.valueOf(((Servicios)tblServicios.getSelectionModel().getSelectedItem()).getLugarServicio()));
            txtTipoServicio.setText(String.valueOf(((Servicios)tblServicios.getSelectionModel().getSelectedItem()).getTipoServicio()));
            txtTelefonoContacto.setText(String.valueOf(((Servicios)tblServicios.getSelectionModel().getSelectedItem()).getTelefonoContacto()));
            jfxHoraServicio.setValue(LocalTime.parse(((Servicios)tblServicios.getSelectionModel().getSelectedItem()).getHoraServicio()));
            jfxFechaServicio.setValue(LocalDate.parse(((Servicios)tblServicios.getSelectionModel().getSelectedItem()).getFechaServicio()));
            cmbCodigoEmpresa.getSelectionModel().select(buscarEmpresa(((Servicios)(tblServicios.getSelectionModel().getSelectedItem())).getCodigoEmpresa()));  
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
        tblServicios.setItems(getServicios());
        colCodigoServicio.setCellValueFactory(new PropertyValueFactory<Servicios, Integer>("codigoServicio"));
        colFechaServicio.setCellValueFactory(new PropertyValueFactory<Servicios, Date>("fechaServicio"));
        colHoraServicio.setCellValueFactory(new PropertyValueFactory<Servicios, String>("horaServicio"));
        colLugarServicio.setCellValueFactory(new PropertyValueFactory<Servicios, String>("lugarServicio"));
        colTipoServicio.setCellValueFactory(new PropertyValueFactory<Servicios, String>("tipoServicio"));
        colTelefono.setCellValueFactory(new PropertyValueFactory<Servicios, String>("telefonoContacto"));
        colCodigoEmpresa.setCellValueFactory(new PropertyValueFactory<Servicios, Integer>("codigoEmpresa"));
    }
    
     public void nuevo(){
        switch (tipoDeOperacion){
            case NINGUNO:
                activarControles();
                btnNuevo.setText("Guardar");
                btnEliminar.setText("Cancelar");
                btnEditar.setDisable(true);
                btnReporte.setDisable(true);
                imgNuevo.setImage(new Image("/org/juanyaxon/image/save.png"));
                imgEliminar.setImage(new Image("/org/juanyaxon/image/cancel.png"));
                tipoDeOperacion = operaciones.GUARDAR;
                break;
            case GUARDAR:
                guardar();
                limpiarControles();
                desactivarControles();
                btnNuevo.setText("Nuevo");
                btnEliminar.setText("Eliminar");
                btnEditar.setDisable(false);
                btnReporte.setDisable(false);
                imgNuevo.setImage(new Image("/org/juanyaxon/image/nuevo.png"));
                imgEliminar.setImage(new Image("/org/juanyaxon/image/eliminar.png"));
                tipoDeOperacion = operaciones.NINGUNO;
                cargarDatos();       
                break;
        }
    }
    
     public void guardar(){
        Servicios registro = new Servicios();
        if(txtTipoServicio.getText().isEmpty() || jfxFechaServicio.getValue() == null || jfxHoraServicio.getValue() == null || txtLugarServicio.getText().isEmpty() || txtTelefonoContacto.getText().isEmpty() || cmbCodigoEmpresa.getSelectionModel().isEmpty()){
            Alert alert = new Alert(Alert.AlertType.WARNING);
            Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
            stage.getIcons().add(new Image("/org/juanyaxon/image/advertencia.png"));
            alert.setHeaderText(null);
            alert.setContentText("Porfavor, ingresa los datos en todos los campos. ");
            alert.showAndWait();  
        }else{
            registro.setFechaServicio(String.valueOf(jfxFechaServicio.getValue()));
            registro.setTipoServicio(txtTipoServicio.getText());
            registro.setHoraServicio(String.valueOf(jfxHoraServicio.getValue()));
            registro.setLugarServicio(txtLugarServicio.getText());
            registro.setTelefonoContacto(txtTelefonoContacto.getText());
            registro.setCodigoEmpresa(((Empresa)cmbCodigoEmpresa.getSelectionModel().getSelectedItem()).getCodigoEmpresa());
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_AgregarServicio(?,?,?,?,?,?)");
            procedimiento.setString(1, registro.getFechaServicio());
            procedimiento.setString(2, registro.getTipoServicio());
            procedimiento.setString(3, registro.getHoraServicio());
            procedimiento.setString(4, registro.getLugarServicio());
            procedimiento.setString(5, registro.getTelefonoContacto());
            procedimiento.setInt(6, registro.getCodigoEmpresa());
            procedimiento.execute();
            listaServicios.add(registro);
        }catch(Exception e){
            e.printStackTrace();
            }
        }
    }

    public void eliminar(){
        switch(tipoDeOperacion){
            case GUARDAR:
                limpiarControles();
                desactivarControles();
                btnNuevo.setText("Nuevo");
                btnEliminar.setText("Eliminar");
                btnEditar.setDisable(false);
                btnReporte.setDisable(false);
                imgNuevo.setImage(new Image("/org/juanyaxon/image/nuevo.png"));
                imgEliminar.setImage(new Image("/org/juanyaxon/image/eliminar.png"));
                tipoDeOperacion = operaciones.NINGUNO;
                break;
            default:
                if(tblServicios.getSelectionModel().getSelectedItem() != null){
                    int respuesta = JOptionPane.showConfirmDialog(null, "¿Estás seguro de Eliminar este registro?", "Eliminar Servicios", JOptionPane.YES_OPTION, JOptionPane.QUESTION_MESSAGE);
                    if(respuesta == JOptionPane.YES_OPTION){
                        try{
                            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_EliminarServicio(?)");
                            procedimiento.setInt(1,((Servicios)tblServicios.getSelectionModel().getSelectedItem()).getCodigoServicio());
                            procedimiento.execute();
                            listaServicios.remove(tblServicios.getSelectionModel().getSelectedIndex());
                            limpiarControles();
                            tblServicios.getSelectionModel().clearSelection();
                            procedimiento.execute();
                        }catch(SQLException e){
                            Alert alert = new Alert(Alert.AlertType.WARNING);
                            Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
                            stage.getIcons().add(new Image("/org/juanyaxon/image/advertencia.png"));
                            alert.setTitle("Advertencia");
                            alert.setContentText("No es posible eliminar este registro porque se relaciona con otro. ");
                            alert.showAndWait();
                        }catch(Exception e){
                            e.printStackTrace();
                        }
                    }else{
                        limpiarControles();
                        desactivarControles();
                        tblServicios.getSelectionModel().clearSelection();
                    }
                }else{
                     Alert alert = new Alert(Alert.AlertType.WARNING);
                     Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
                     stage.getIcons().add(new Image("/org/juanyaxon/image/advertencia.png"));
                     alert.setTitle("Advertencia");
                     alert.setHeaderText("Selecciona un registro de la tabla");
                     alert.setContentText("Debes seleccionar un registro para eliminar");
                     alert.showAndWait(); 
                } 
        }
    }

    public void editar(){
        switch(tipoDeOperacion){
            case NINGUNO:
                if(tblServicios.getSelectionModel().getSelectedItem() != null){
                    btnNuevo.setDisable(true);
                    btnEliminar.setDisable(true);
                    btnEditar.setText("Actualizar");
                    btnReporte.setText("Cancelar");
                    imgEditar.setImage(new Image("/org/juanyaxon/image/update.png"));
                    imgReporte.setImage(new Image("/org/juanyaxon/image/cancel.png"));
                    activarControles();
                    cmbCodigoEmpresa.setDisable(true);
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
                btnEliminar.setDisable(false);
                btnEditar.setText("Editar");
                btnReporte.setText("Reporte");
                imgEditar.setImage(new Image("/org/juanyaxon/image/editar.png"));
                imgReporte.setImage(new Image("/org/juanyaxon/image/reporte.png"));
                tipoDeOperacion = operaciones.NINGUNO;
                cargarDatos();
                break;
            case CANCELAR:
                btnNuevo.setDisable(false);
                btnEliminar.setDisable(false);
                btnEditar.setText("Editar");
                btnReporte.setText("Reporte");
                imgEditar.setImage(new Image("/org/juanyaxon/image/editar.png"));
                imgReporte.setImage(new Image("/org/juanyaxon/image/reporte.png"));
                tipoDeOperacion = operaciones.NINGUNO;
                tblServicios.getSelectionModel().clearSelection();
                break;
        }
    }
    
    public void actualizar(){
        if(txtTipoServicio.getText().isEmpty() || jfxFechaServicio.getValue() == null || jfxHoraServicio.getValue() == null || txtLugarServicio.getText().isEmpty() || txtTelefonoContacto.getText().isEmpty()){
            Alert alert = new Alert(Alert.AlertType.WARNING);
            Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
            stage.getIcons().add(new Image("/org/juanyaxon/image/advertencia.png"));
            alert.setHeaderText(null);
            alert.setContentText("Porfavor, ingresa los datos en todos los campos. ");
            alert.showAndWait();
        }else{
            try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_EditarServicio(?,?,?,?,?,?)");
            Servicios registro = (Servicios)tblServicios.getSelectionModel().getSelectedItem();
            registro.setTipoServicio(txtTipoServicio.getText());
            registro.setHoraServicio(String.valueOf(jfxHoraServicio.getValue()));
            registro.setLugarServicio(txtLugarServicio.getText());
            registro.setTelefonoContacto(txtTelefonoContacto.getText());
            registro.setFechaServicio(String.valueOf(jfxFechaServicio.getValue())); 
            procedimiento.setInt(1, registro.getCodigoServicio());
            procedimiento.setString(2, registro.getFechaServicio());
            procedimiento.setString(3, registro.getTipoServicio());
            procedimiento.setString(4, registro.getHoraServicio());
            procedimiento.setString(5, registro.getLugarServicio());
            procedimiento.setString(6, registro.getTelefonoContacto());
            procedimiento.execute();
            }catch(Exception e){
                e.printStackTrace();
            }
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
                btnEliminar.setDisable(false);
                btnEditar.setText("Editar");
                btnReporte.setText("Reporte");
                imgEditar.setImage(new Image("/org/juanyaxon/image/editar.png"));
                imgReporte.setImage(new Image("/org/juanyaxon/image/reporte.png"));
                tipoDeOperacion = operaciones.NINGUNO;
                tblServicios.getSelectionModel().clearSelection();
                break;
        }
    }
    
    public void imprimirReporte(){
        Map parametros = new HashMap();
        int codEmpresa = Integer.valueOf(((Empresa)cmbCodigoEmpresa.getSelectionModel().getSelectedItem()).getCodigoEmpresa());
        parametros.put("codEmpresa", codEmpresa);
        parametros.put("RUTA_IMAGEN", ServiciosController.class.getResource("/org/juanyaxon/image/MenuLogo.png"));
        parametros.put("RUTA_IMAGEN", ServiciosController.class.getResource("/org/juanyaxon/image/logoBackground.png"));
        GenerarReporte.mostrarReporte("ReporteFinal.jasper", "Reporte Final", parametros);
    }
    
    public Empresa buscarEmpresa(int codigoEmpresa){
        Empresa resultado = null;
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_BuscarEmpresa(?)");
            procedimiento.setInt(1, codigoEmpresa);
            ResultSet registro = procedimiento.executeQuery();
            while (registro.next()){
                resultado = new Empresa(registro.getInt("codigoempresa"),
                                        registro.getString("nombreEmpresa"),
                                        registro.getString("direccion"),
                                        registro.getString("telefono"));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return resultado;
    }
    
    public ObservableList<Servicios> getServicios(){
        ArrayList<Servicios> lista = new ArrayList<Servicios>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_ListarServicios()");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new Servicios(resultado.getInt("codigoServicio"),
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
        return listaServicios = FXCollections.observableArrayList(lista);
    }
    
    public ObservableList<Empresa> getEmpresa(){
        ArrayList<Empresa> lista = new ArrayList<Empresa>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_ListarEmpresas");
            ResultSet resultado = procedimiento.executeQuery();
            while (resultado.next()){
                lista.add(new Empresa(resultado.getInt("codigoEmpresa"),
                                        resultado.getString("nombreEmpresa"),
                                        resultado.getString("direccion"),
                                        resultado.getString("telefono")));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaEmpresa = FXCollections.observableArrayList(lista);
    }

    public void desactivarControles(){
        txtCodigoServicio.setEditable(false);
        txtLugarServicio.setEditable(false);
        txtTipoServicio.setEditable(false);
        txtTelefonoContacto.setEditable(false);
        jfxHoraServicio.setDisable(true);
        jfxFechaServicio.setDisable(true);
        cmbCodigoEmpresa.setDisable(true);
    }
    
    public void activarControles(){
        txtCodigoServicio.setEditable(false);
        txtLugarServicio.setEditable(true);
        txtTipoServicio.setEditable(true);
        txtTelefonoContacto.setEditable(true);
        jfxHoraServicio.setDisable(false);
        jfxFechaServicio.setDisable(false);
        cmbCodigoEmpresa.setDisable(false);
    }
    
    public void limpiarControles(){
        txtCodigoServicio.clear();
        txtLugarServicio.clear();
        txtTipoServicio.clear();
        txtTelefonoContacto.clear();
        jfxHoraServicio.setValue(null);
        jfxFechaServicio.setValue(null);
        cmbCodigoEmpresa.setValue(null);
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
    
    public void ventanaEmpresas(){
        escenarioPrincipal.ventanaEmpresas();
    }
}

