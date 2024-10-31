package com.example.AnuncioCamisetaProject.model;

import com.example.AnuncioCamisetaProject.DTOs.CamisetaRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Camiseta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Camiseta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String image;
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    public Camiseta(CamisetaRequestDTO data, Categoria categoria) {
        this.title = data.title();
        this.image = data.image();
        this.price = data.price();
        this.categoria = categoria;
    }
}
