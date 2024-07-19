
package org.juanpabloyaxon.modelo;

public class Cliente {
    
    private int idCliente;
    private String nombreDelCliente;
    private String apellidoDelCliente;
    private int documentoDeIdentificacion;
    private int telefonoCliente;
    private String correoElectronico;
    private boolean estado_activo;
    
    public Cliente() {}
    
    public Cliente(String nombreDelCliente,  String apellidoDelCliente,  int documentoDeIdentificacion,  int telefonoCliente, String correoElectronico, boolean estado_activo) {
        this.nombreDelCliente = nombreDelCliente;
        this.apellidoDelCliente = apellidoDelCliente;
        this.documentoDeIdentificacion = documentoDeIdentificacion;
        this.telefonoCliente = telefonoCliente;
        this.correoElectronico = correoElectronico;
        this.estado_activo = estado_activo;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public String getNombreDelCliente() {
        return nombreDelCliente;
    }

    public void setNombreDelCliente(String nombreDelCliente) {
        this.nombreDelCliente = nombreDelCliente;
    }

    public String getApellidoDelCliente() {
        return apellidoDelCliente;
    }

    public void setApellidoDelCliente(String apellidoDelCliente) {
        this.apellidoDelCliente = apellidoDelCliente;
    }

    public int getDocumentoDeIdentificacion() {
        return documentoDeIdentificacion;
    }

    public void setDocumentoDeIdentificacion(int documentoDeIdentificacion) {
        this.documentoDeIdentificacion = documentoDeIdentificacion;
    }

    public int getTelefonoCliente() {
        return telefonoCliente;
    }

    public void setTelefonoCliente(int telefonoCliente) {
        this.telefonoCliente = telefonoCliente;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public boolean isEstado_activo() {
        return estado_activo;
    }

    public void setEstado_activo(boolean estado_activo) {
        this.estado_activo = estado_activo;
    }
   
}    


