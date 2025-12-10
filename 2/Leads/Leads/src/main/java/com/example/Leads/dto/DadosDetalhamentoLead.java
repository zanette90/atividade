package com.example.Leads.dto;

import com.example.Leads.entity.Lead;

import java.time.LocalDateTime;


public record DadosDetalhamentoLead(long id,String nome, String email, String telefone, String empresa, String observacoes, StatusLead statusLead, LocalDateTime dataCadastro) {

    public DadosDetalhamentoLead(Lead lead) {
        this(lead.getId(),lead.getNome(),lead.getEmail(),lead.getTelefone(), lead.getEmpresa(),lead.getObservacoes(),lead.getStatus(),lead.getDataCadastro());
    }


}
