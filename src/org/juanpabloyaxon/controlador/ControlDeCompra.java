
package org.juanpabloyaxon.controlador;

import org.juanpabloyaxon.modelo.Compra;
import org.juanpabloyaxon.db.Conexion;
import java.sql.PreparedStatement;
import javax.swing.JOptionPane;


public class ControlDeCompra {
    
    public void ingresarCompra(Compra compra){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_ingresar_registroCompra(?,?,?);");
            sentencia.setString(1, compra.getDescripcionCompra());
            sentencia.setInt(2, compra.getFechaCompra());
            sentencia.setBoolean(3, true);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Cargado a la base de datos.");
        }catch (Exception error){
            error.printStackTrace();
        }
    }
    
    public void actualizarCompra (Compra compra){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_actualizarRegistroCompra(?,?,?,?);");
            sentencia.setInt(1, compra.getIdCompra());
            sentencia.setString(2, compra.getDescripcionCompra());
            sentencia.setInt(3, compra.getFechaCompra());
            sentencia.setBoolean(4, true);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Actualizado a la base de datos. ");
        }catch (Exception error){
            error.printStackTrace();
        }
    } 
    
    public void eliminarCompra (Compra compra){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_eliminarRegistroCompra(?,?);");
            sentencia.setInt(1, compra.getIdCompra());
            sentencia.setBoolean(2, false);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Inactivo en la base de datos. ");
        }catch (Exception error){
            error.printStackTrace();
        }
    }
}

