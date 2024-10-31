package com.example.AnuncioCamisetaProject.controller;

import com.example.AnuncioCamisetaProject.DTOs.CamisetaRequestDTO;
import com.example.AnuncioCamisetaProject.DTOs.CamisetaResponseDTO;
import com.example.AnuncioCamisetaProject.model.Camiseta;
import com.example.AnuncioCamisetaProject.model.Categoria;
import com.example.AnuncioCamisetaProject.repository.CamisetaRepository;
import com.example.AnuncioCamisetaProject.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("camiseta")

public class CamisetaController {
    @Autowired
    private CamisetaRepository camisetaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @CrossOrigin("*")
    @PostMapping
    public void saveCamiseta(@RequestBody CamisetaRequestDTO data) {
        if (data.categoria_id() == null) {
            throw new IllegalArgumentException("Categoria ID não pode estar em branco");
        }

        Categoria categoria = categoriaRepository.findById(data.categoria_id())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Camiseta camisetaNova = new Camiseta(data, categoria);
        camisetaRepository.save(camisetaNova);
    }

    @CrossOrigin("*")
    @GetMapping
    public List<CamisetaResponseDTO> getAll() {
        List<CamisetaResponseDTO> camisetaList = camisetaRepository.findAll()
                .stream()
                .map(CamisetaResponseDTO::new).toList();
        return camisetaList;
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public CamisetaResponseDTO getCamisetaById(@PathVariable Long id) {
        Camiseta camiseta = camisetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Camiseta Não Encontrada"));
        return new CamisetaResponseDTO(camiseta);
    }

    @CrossOrigin("*")
    @PutMapping("/{id}")
    public void updateCamisa(@PathVariable Long id, @RequestBody CamisetaRequestDTO data) {
        Camiseta camisaExistente = camisetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Camisa Não Encontrada"));

        if (data.categoria_id() == null) {
            throw new IllegalArgumentException("Categoria ID não pode ser nulo");
        }

        Categoria categoria = categoriaRepository.findById(data.categoria_id())
                .orElseThrow(() -> new RuntimeException("Categoria Não Encontrada"));

        camisaExistente.setTitle(data.title());
        camisaExistente.setImage(data.image());
        camisaExistente.setPrice(data.price());
        camisaExistente.setCategoria(categoria);

        camisetaRepository.save(camisaExistente);
    }

    @CrossOrigin("*")
    @DeleteMapping("/{id}")
    public void deleteCamiseta(@PathVariable Long id) {
        if (!camisetaRepository.existsById(id)) {
            throw new RuntimeException("Camiseta Não Encontrada");
        }
        camisetaRepository.deleteById(id);
    }

}
