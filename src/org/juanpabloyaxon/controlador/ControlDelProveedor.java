
package org.juanpabloyaxon.controlador;

import org.juanpabloyaxon.modelo.Proveedor;
import org.juanpabloyaxon.db.Conexion;
import java.sql.PreparedStatement;
import javax.swing.JOptionPane;

public class ControlDelProveedor {
    
    public void ingresarProveedor(Proveedor proveedor){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_ingresar_registroProveedores(?,?,?,?);");
            sentencia.setString(1, proveedor.getNombreProveedor());
            sentencia.setInt(2, proveedor.getTelefonoProveedor());
            sentencia.setString(3, proveedor.getCorreoProveedor());
            sentencia.setBoolean(4, true);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Cargado a la base de datos.");
        }catch (Exception error){
            error.printStackTrace();
        }
    }
    
    public void actualizarProveedor (Proveedor proveedor){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_actualizarRegistroProveedores(?,?,?,?,?);");
            sentencia.setInt(1, proveedor.getIdProveedor());
            sentencia.setString(2, proveedor.getNombreProveedor());
            sentencia.setInt(3, proveedor.getTelefonoProveedor());
            sentencia.setString(4, proveedor.getCorreoProveedor());
            sentencia.setBoolean(5, true);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Actualizado a la base de datos. ");
        }catch (Exception error){
            error.printStackTrace();
        }
    } 
    
    public void eliminarProveedor (Proveedor proveedor){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_eliminarRegistroProveedores(?,?);");
            sentencia.setInt(1, proveedor.getIdProveedor());
            sentencia.setBoolean(2, false);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Inactivo en la base de datos. ");
        }catch (Exception error){
            error.printStackTrace();
        }
    }
}
