package com.example.Leads.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@Valid
public record CadastroLeadDto(
        @NotBlank
        String nome,
        @NotBlank
        String email,
        @NotBlank
        String telefone,
        String empresa,
        String observacoes,
        StatusLead statusLead
        ){

}
