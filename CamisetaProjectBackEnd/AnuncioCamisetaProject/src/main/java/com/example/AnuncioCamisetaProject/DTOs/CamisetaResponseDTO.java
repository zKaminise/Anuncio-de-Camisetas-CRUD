package com.example.AnuncioCamisetaProject.DTOs;

import com.example.AnuncioCamisetaProject.model.Camiseta;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CamisetaResponseDTO {
    private Long id;
    private String title;
    private String image;
    private Integer price;
    private Long categoria_id;

    public CamisetaResponseDTO(Camiseta camiseta) {
        this.id = camiseta.getId();
        this.title = camiseta.getTitle();
        this.image = camiseta.getImage();
        this.price = camiseta.getPrice();
        this.categoria_id = camiseta.getCategoria() != null ? camiseta.getCategoria().getId() : null;
    }
}
