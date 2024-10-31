package com.example.AnuncioCamisetaProject.repository;

import com.example.AnuncioCamisetaProject.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
