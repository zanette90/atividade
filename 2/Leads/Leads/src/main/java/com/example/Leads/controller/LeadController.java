package com.example.Leads.controller;

import com.example.Leads.dto.DadosAtualizarLead;
import com.example.Leads.dto.DadosCadastroLead;
import com.example.Leads.dto.DadosDetalhamentoLead;
import com.example.Leads.service.LeadService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("api/leads")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @PostMapping
    public ResponseEntity<DadosDetalhamentoLead> cadastrar(@RequestBody @Valid DadosCadastroLead dadosCadastroLead, UriComponentsBuilder uri) {
        return leadService.cadastrar(dadosCadastroLead,uri);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoLead> atualizar (@RequestBody @Valid DadosAtualizarLead dadosAtualizarLead, @PathVariable long id) {
        return leadService.atualizar(dadosAtualizarLead, id);
    }

    @GetMapping
    public ResponseEntity<Page<DadosDetalhamentoLead>> listarTodos(@PageableDefault(size = 20, sort = "nome")Pageable pageable) {
        return leadService.listar(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoLead> buscarById (@PathVariable long id) {
        return leadService.buscaById(id);
    }
}
