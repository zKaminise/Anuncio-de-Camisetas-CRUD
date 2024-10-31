package com.example.AnuncioCamisetaProject.controller;

import com.example.AnuncioCamisetaProject.model.Categoria;
import com.example.AnuncioCamisetaProject.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("categoria")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @CrossOrigin("*")
    @GetMapping
    public List<Categoria> getAllCategoria() {
        return categoriaRepository.findAll();
    }
}
