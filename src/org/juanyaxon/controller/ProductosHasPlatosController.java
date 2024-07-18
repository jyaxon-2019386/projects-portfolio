package org.juanyaxon.controller;


import java.net.URL;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
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
import org.juanyaxon.bean.Platos;
import org.juanyaxon.bean.Producto;
import org.juanyaxon.bean.ProductosHasPlatos;
import org.juanyaxon.db.Conexion;
import org.juanyaxon.main.Principal;
import org.juanyaxon.report.GenerarReporte;

public class ProductosHasPlatosController implements Initializable{ 
    
    private Principal escenarioPrincipal; 
    private enum operaciones {GUARDAR, NINGUNO, ACTUALIZAR};
    private operaciones tipoDeOperacion = operaciones.NINGUNO;
    private ObservableList <ProductosHasPlatos>listaProductosHasPlatos;
    private ObservableList <Platos>listaPlato;
    private ObservableList <Producto>listaProducto;
    
    @FXML private TextField txtProductosCodProductos;
    @FXML private ComboBox cmbCodigoPlato;
    @FXML private ComboBox cmbCodigoProducto;
    @FXML private TableView tblProductosHasPlatos;
    @FXML private TableColumn colProductosCodProducto;
    @FXML private TableColumn colCodPlato;
    @FXML private TableColumn colCodProducto;
    @FXML private Button btnNuevo;
    @FXML private Button btnReporte;
    @FXML private ImageView imgNuevo;
    @FXML private ImageView imgReporte;
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        cargarDatos();
        cmbCodigoPlato.setItems(getPlato());
        cmbCodigoProducto.setItems(getProducto());
    }
    
    public void seleccionarElemento(){
        if(tblProductosHasPlatos.getSelectionModel().getSelectedItem() != null){
            txtProductosCodProductos.setText(String.valueOf(((ProductosHasPlatos)tblProductosHasPlatos.getSelectionModel().getSelectedItem()).getProductos_codigoProducto()));
            cmbCodigoPlato.getSelectionModel().select(buscarPlato(((ProductosHasPlatos)tblProductosHasPlatos.getSelectionModel().getSelectedItem()).getCodigoPlato()));
            cmbCodigoProducto.getSelectionModel().select(buscarProducto(((ProductosHasPlatos)tblProductosHasPlatos.getSelectionModel().getSelectedItem()).getCodigoProducto()));
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
        tblProductosHasPlatos.setItems(getProductosHasPlatos());
        colProductosCodProducto.setCellValueFactory(new PropertyValueFactory <ProductosHasPlatos, Integer>("Productos_codigoProducto"));
        colCodPlato.setCellValueFactory(new PropertyValueFactory <ProductosHasPlatos, Integer>("codigoPlato"));;
        colCodProducto.setCellValueFactory(new PropertyValueFactory <ProductosHasPlatos, Integer>("codigoProducto"));
    }
 
    public void nuevo(){
        switch(tipoDeOperacion){
            case NINGUNO:
                activarControles();
                limpiarControles();
                btnNuevo.setText("Guardar");
                btnReporte.setText("Cancelar");
                imgNuevo.setImage(new Image("/org/juanyaxon/image/save.png"));
                imgReporte.setImage(new Image("/org/juanyaxon/image/cancel.png"));
                tipoDeOperacion = operaciones.GUARDAR;
                break;
            case GUARDAR:
                guardar();
                limpiarControles();
                desactivarControles();
                btnNuevo.setText("Nuevo");
                btnReporte.setText("Reporte");
                imgNuevo.setImage(new Image("/org/juanyaxon/image/nuevo.png"));
                imgReporte.setImage(new Image("/org/juanyaxon/image/reporte.png"));
                tipoDeOperacion = operaciones.NINGUNO;
                cargarDatos();
                break;
        }
    }
    
    public void guardar(){
        ProductosHasPlatos registro = new ProductosHasPlatos();
        registro.setProductos_codigoProducto(Integer.parseInt(txtProductosCodProductos.getText()));
        registro.setCodigoProducto(((Producto)cmbCodigoProducto.getSelectionModel().getSelectedItem()).getCodigoProducto());
        registro.setCodigoPlato(((Platos)cmbCodigoPlato.getSelectionModel().getSelectedItem()).getCodigoPlato());
            try{
                PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_AgregarProductos_has_Plato(?,?,?)");
                procedimiento.setInt(1, registro.getProductos_codigoProducto());
                procedimiento.setInt(2, registro.getCodigoProducto());
                procedimiento.setInt(3, registro.getCodigoPlato());
                procedimiento.execute();
                listaProductosHasPlatos.add(registro);
            }catch(SQLException e){
                JOptionPane.showMessageDialog(null, "Los datos no pueden ser iguales. ");
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
                btnReporte.setText("Reporte");
                imgReporte.setImage(new Image("/org/juanyaxon/image/reporte.png"));
                tipoDeOperacion = operaciones.NINGUNO;
                tblProductosHasPlatos.getSelectionModel().clearSelection();
                break;
        }
    }
    
    public void imprimirReporte(){
        Map parametros = new HashMap();
        parametros.put("RUTA_IMAGEN", PresupuestoController.class.getResource("/org/juanyaxon/image/logoBackground.png"));
        GenerarReporte.mostrarReporte("ReporteProductosHasPlatos.jasper", "Reporte de Productos Has Platos", parametros);
    }
    
    
    
    public Platos buscarPlato(int codigoPlato) {
        Platos registro = null;

        try {
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_BuscarPlato(?)");
            procedimiento.setInt(1, codigoPlato);
            ResultSet resultado = procedimiento.executeQuery();
            while (resultado.next()) {
                registro = new Platos(resultado.getInt("codigoPlato"),
                        resultado.getInt("cantidadPlato"), 
                        resultado.getString("nombrePlato"), 
                        resultado.getString("descripcionPlato"),
                        resultado.getDouble("precioPlato"),
                        resultado.getInt("codigoTipoPlato"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return registro;
    }
    
    public Producto buscarProducto(int codigoProducto){
        Producto registro = null;
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_BuscarProducto(?)");
            procedimiento.setInt(1, codigoProducto);
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                registro = new Producto(resultado.getInt("codigoProducto"),
                    resultado.getString("nombreProducto"), 
                    resultado.getInt("cantidad")
                );
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return registro;
    }
    
    public ObservableList<ProductosHasPlatos> getProductosHasPlatos(){
        ArrayList<ProductosHasPlatos> lista  =  new ArrayList <ProductosHasPlatos>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_ListarProductos_has_Platos()");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new ProductosHasPlatos(resultado.getInt("Productos_codigoProducto"),
                        resultado.getInt("codigoPlato"),
                        resultado.getInt("codigoProducto")));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaProductosHasPlatos = FXCollections.observableArrayList(lista);
    }
    
    public ObservableList<Platos> getPlato(){
        ArrayList <Platos> lista = new ArrayList<Platos>();
        try{
            PreparedStatement procedimiento =  Conexion.getInstance().getConexion().prepareCall("call sp_ListarPlatos()");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new Platos (resultado.getInt("codigoPlato"),
                        resultado.getInt("cantidadPlato"),
                        resultado.getString("nombrePlato"),
                        resultado.getString("descripcionPlato"),
                        resultado.getDouble("precioPlato"),
                        resultado.getInt("codigoTipoPlato")));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaPlato = FXCollections.observableArrayList(lista);
    }
    
    public ObservableList <Producto> getProducto(){
        ArrayList<Producto> lista = new ArrayList<Producto>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("call sp_ListarProductos()");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new Producto (resultado.getInt("codigoProducto"),
                        resultado.getString("nombreProducto"),
                        resultado.getInt("cantidad")));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaProducto =  FXCollections.observableArrayList(lista);
    }
    
    public void desactivarControles(){
        txtProductosCodProductos.setEditable(false);
        cmbCodigoPlato.setDisable(true);
        cmbCodigoProducto.setDisable(true);
    }

    public void activarControles(){
        txtProductosCodProductos.setEditable(true);
        cmbCodigoPlato.setDisable(false);
        cmbCodigoProducto.setDisable(false);
        
    }
    
    public void limpiarControles(){
        txtProductosCodProductos.clear();
        cmbCodigoPlato.setValue(null);
        cmbCodigoProducto.setValue(null);
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


