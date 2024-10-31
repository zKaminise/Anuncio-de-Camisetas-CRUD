package com.example.AnuncioCamisetaProject.repository;

import com.example.AnuncioCamisetaProject.model.Camiseta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CamisetaRepository extends JpaRepository<Camiseta, Long> {
}
