
package org.juanpabloyaxon.controlador;

import org.juanpabloyaxon.modelo.Cliente;
import org.juanpabloyaxon.db.Conexion;
import java.sql.PreparedStatement;
import javax.swing.JOptionPane;


public class ControlDelCliente {
    
    public void ingresarCliente(Cliente cliente){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_ingresar_registroCliente(?,?,?,?,?,?);");
            sentencia.setString(1, cliente.getNombreDelCliente());
            sentencia.setString(2, cliente.getApellidoDelCliente());
            sentencia.setInt(3, cliente.getDocumentoDeIdentificacion());
            sentencia.setInt(4, cliente.getTelefonoCliente());
            sentencia.setString(5, cliente.getCorreoElectronico());
            sentencia.setBoolean(6, true);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Cargado a la base de datos.");
        }catch (Exception error){
            error.printStackTrace();
        }
    }
    
    public void actualizarCliente (Cliente cliente){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_actualizarRegistroCliente(?,?,?,?,?,?,?);");
            sentencia.setInt(1, cliente.getIdCliente());
            sentencia.setString(2, cliente.getNombreDelCliente());
            sentencia.setString(3, cliente.getApellidoDelCliente());
            sentencia.setInt(4, cliente.getDocumentoDeIdentificacion());
            sentencia.setInt(5, cliente.getTelefonoCliente());
            sentencia.setString(6, cliente.getCorreoElectronico());
            sentencia.setBoolean(7, true);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Actualizado a la base de datos. ");
        }catch (Exception error){
            error.printStackTrace();
        }
    } 
    
    public void eliminarCliente (Cliente cliente){
        try{
            PreparedStatement sentencia = Conexion.getInstancia().getConexion().prepareCall("call sp_eliminarRegistroCliente(?,?);");
            sentencia.setInt(1, cliente.getIdCliente());
            sentencia.setBoolean(2, false);
            sentencia.execute();
            JOptionPane.showMessageDialog(null, "Inactivo en la base de datos. ");
        }catch (Exception error){
            error.printStackTrace();
        }
    }
}

