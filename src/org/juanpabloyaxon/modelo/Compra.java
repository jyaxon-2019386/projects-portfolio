
package org.juanpabloyaxon.modelo;

public class Compra {
    
    private int idCompra;
    private String descripcionCompra;
    private int fechaCompra;
    private boolean estado_activo;
    
    public Compra() {}
    
    public Compra(String descripcionCompra, int fechaCompra, boolean estado_activo) {
        this.descripcionCompra = descripcionCompra;
        this.fechaCompra = fechaCompra;
        this.estado_activo = estado_activo;
    }

    public int getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }

    public String getDescripcionCompra() {
        return descripcionCompra;
    }

    public void setDescripcionCompra(String descripcionCompra) {
        this.descripcionCompra = descripcionCompra;
    }

    public int getFechaCompra() {
        return fechaCompra;
    }

    public void setFechaCompra(int fechaCompra) {
        this.fechaCompra = fechaCompra;
    }

    public boolean getEstado_activo() {
        return estado_activo;
    }

    public void setEstado_activo(boolean estado_activo) {
        this.estado_activo = estado_activo;
    }
    
    
}    


