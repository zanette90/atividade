package com.example.Leads.Entity;

import com.example.Leads.dto.CadastroLeadDto;
import com.example.Leads.dto.StatusLead;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
public class Lead {
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Setter
    private String nome;
    @Setter
    private String email;
    @Setter
    private String telefone;
    @Setter
    private String empresa;
    @Enumerated(EnumType.STRING)
    @Setter
    private StatusLead status;
    private LocalDateTime dataCadastro;

    public Lead(CadastroLeadDto dadosCadastro) {
        this.nome = dadosCadastro.nome();
        this.email = dadosCadastro.email();
        this.telefone = dadosCadastro.telefone();
        this.empresa = dadosCadastro.empresa();
        this.status = dadosCadastro.statusLead();
        this.dataCadastro = LocalDateTime.now();
    }
}
