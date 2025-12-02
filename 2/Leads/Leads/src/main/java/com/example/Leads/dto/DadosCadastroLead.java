package com.example.Leads.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Valid
public record DadosCadastroLead(
        @NotBlank
        String nome,
        @Pattern( regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                message = "Email inválido")
        String email,
        @NotBlank
        String telefone,
        String empresa,
        String observacoes

        ){

}
