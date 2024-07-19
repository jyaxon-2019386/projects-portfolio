
package org.juanpabloyaxon.modelo;

public class Producto {
    
    private int idProducto;
    private String nombreProducto;
    private String descripcionProducto;
    private int precioProducto;
    private int fechaElaboracion;
    private int stock;
    private boolean estado_activo;
    
    public Producto() {}
    
    public Producto(String nombreProducto,  String descripcionProducto,  int precioProducto,  int fechaElaboracion, int stock, boolean estado_activo) {
        this.nombreProducto = nombreProducto;
        this.descripcionProducto = descripcionProducto;
        this.precioProducto = precioProducto;
        this.fechaElaboracion = fechaElaboracion;
        this.stock = stock;
        this.estado_activo = estado_activo;
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getDescripcionProducto() {
        return descripcionProducto;
    }

    public void setDescripcionProducto(String descripcionProducto) {
        this.descripcionProducto = descripcionProducto;
    }

    public int getPrecioProducto() {
        return precioProducto;
    }

    public void setPrecioProducto(int precioProducto) {
        this.precioProducto = precioProducto;
    }

    public int getFechaElaboracion() {
        return fechaElaboracion;
    }

    public void setFechaElaboracion(int fechaElaboracion) {
        this.fechaElaboracion = fechaElaboracion;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public boolean isEstado_activo() {
        return estado_activo;
    }

    public void setEstado_activo(boolean estado_activo) {
        this.estado_activo = estado_activo;
    }

   
   
}    


