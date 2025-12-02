package com.example.Leads.service;

import com.example.Leads.dto.DadosAtualizarLead;
import com.example.Leads.dto.DadosCadastroLead;
import com.example.Leads.dto.DadosDetalhamentoLead;
import com.example.Leads.entity.Lead;
import com.example.Leads.repository.RepositoryLead;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class LeadService {

    @Autowired
    private RepositoryLead repositoryLead;

    @Transactional
    public ResponseEntity<DadosDetalhamentoLead> cadastrar(DadosCadastroLead dadosCadastroLead, UriComponentsBuilder uriComponentsBuilder) {
        var lead = new Lead(dadosCadastroLead);
        var uri = uriComponentsBuilder.path("lead{/id}").buildAndExpand(lead).toUri();
        repositoryLead.save(lead);
        return ResponseEntity.created(uri).body(new DadosDetalhamentoLead(lead));
    }

    @Transactional
    public ResponseEntity<DadosDetalhamentoLead> atualizar(DadosAtualizarLead dadosAtualizarLead, long id) {
        var lead = repositoryLead.getReferenceById(id);
        lead.atualizar(dadosAtualizarLead);
        return ResponseEntity.ok().body(new DadosDetalhamentoLead(lead));
    }

    public ResponseEntity<DadosDetalhamentoLead> buscaById(long id) {
        var lead = repositoryLead.getReferenceById(id);
        return ResponseEntity.ok().body(new DadosDetalhamentoLead(lead));
    }

    public ResponseEntity<Page<DadosDetalhamentoLead>> listar(Pageable pagina) {
        var page = repositoryLead.findAll(pagina).map(DadosDetalhamentoLead::new);
        return ResponseEntity.ok(page);
    }

    @Transactional
    public ResponseEntity delete(long id) {
        var lead = repositoryLead.getReferenceById(id);
        repositoryLead.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
