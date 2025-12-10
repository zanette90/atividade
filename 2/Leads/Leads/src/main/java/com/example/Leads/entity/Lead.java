package com.example.Leads.entity;

import com.example.Leads.dto.DadosAtualizarLead;
import com.example.Leads.dto.DadosCadastroLead;
import com.example.Leads.dto.StatusLead;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Lead {
    @Id @Getter
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Getter @Setter
    private String nome;
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String telefone;
    @Getter @Setter
    private String empresa;
    @Getter @Setter
    private String observacoes;
    @Enumerated(EnumType.STRING)
    @Getter @Setter
    private StatusLead status;
    @Getter
    private LocalDateTime dataCadastro;

    public Lead(DadosCadastroLead dadosCadastro) {
        this.nome = dadosCadastro.nome();
        this.email = dadosCadastro.email();
        this.telefone = dadosCadastro.telefone();
        this.empresa = dadosCadastro.empresa();
        this.observacoes = dadosCadastro.observacoes();
        this.status = StatusLead.NOVO;
        this.dataCadastro = LocalDateTime.now();
    }

    public void atualizar(DadosAtualizarLead dadosAtualizarLead) {
        setStatus(dadosAtualizarLead.status());
    }

}
