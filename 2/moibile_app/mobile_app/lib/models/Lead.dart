class Lead {
  final String nome;
  final String email;
  final String telefone;
  final String empresa;
  final String statusLead;


  Lead(this.nome, this.email, this.telefone, this.empresa, this.statusLead);

  Map<String, dynamic> toJson() {
    return {
      "nome": nome,
      "email": email,
      "telefone": telefone,
      "empresa": empresa,
      "statusLead": statusLead
    };
  }

  factory Lead.fromJson(Map<String, dynamic> json) {
    return Lead(
      json['nome'] ?? '',
      json['email'] ?? '',
      json['telefone'] ?? '',
      json['empresa'] ?? '',
      json['statusLead'] ?? ''
    );
  }

  @override
  String toString() {
    return 'Lead{nome: $nome, email: $email, telefone: $telefone, empresa: $empresa, status: $statusLead}';
  }


}