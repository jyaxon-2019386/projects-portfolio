package org.juanpabloyaxon.db;


import java.sql.DriverManager;
import java.sql.Connection;



public class Conexion {
    
   private Connection conexion;
   private static Conexion instancia;
    
    public Conexion() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexion = DriverManager.getConnection("jdbc:mysql://localhost:3306/db_proyecto_final?useSSL=false", "root", "admin");
        }
        catch (Exception error) {
            error.printStackTrace();
        }
    }
    
    public static synchronized Conexion getInstancia() {
        if (instancia == null) 
            instancia = new Conexion();
        return instancia;
        }
        
    public Connection getConexion() {
        return conexion;
    }
    
    public void setConexion(Connection conexion) {
        this.conexion = conexion;
        
    }
}

