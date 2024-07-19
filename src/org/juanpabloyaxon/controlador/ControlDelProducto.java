
package org.juanpabloyaxon.controlador;

import org.juanpabloyaxon.modelo.Producto;
import org.juanpabloyaxon.db.Conexion;
import java.sql.PreparedStatement;
import javax.swing.JOptionPane;

public class ControlDelProducto {
    
    public void ingresarProducto(Producto producto){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_ingresar_registroProducto(?,?,?,?,?,?);");
            sentencia.setString(1, producto.getNombreProducto());
            sentencia.setString(2, producto.getDescripcionProducto());
            sentencia.setInt(3, producto.getPrecioProducto());
            sentencia.setInt(4, producto.getFechaElaboracion());
            sentencia.setInt(5, producto.getStock());
            sentencia.setBoolean(6, true);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Cargado a la base de datos.");
        }catch (Exception error){
            error.printStackTrace();
        }
    }
    
    public void actualizarProducto (Producto producto){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_actualizarRegistroProducto(?,?,?,?,?,?,?);");
            sentencia.setInt(1, producto.getIdProducto());
            sentencia.setString(2, producto.getNombreProducto());
            sentencia.setString(3, producto.getDescripcionProducto());
            sentencia.setInt(4, producto.getPrecioProducto());
            sentencia.setInt(5, producto.getFechaElaboracion());
            sentencia.setInt(6, producto.getStock());
            sentencia.setBoolean(7, true);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Actualizado a la base de datos. ");
        }catch (Exception error){
            error.printStackTrace();
        }
    } 
    
    public void eliminarProducto (Producto producto){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_eliminarRegistroProducto(?,?);");
            sentencia.setInt(1, producto.getIdProducto());
            sentencia.setBoolean(2, false);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Inactivo en la base de datos. ");
        }catch (Exception error){
            error.printStackTrace();
        }
    }
}
