import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/api/services/LeadService.dart';
import 'package:mobile_app/models/Lead.dart';

class FormularioLead extends StatelessWidget {
  final TextEditingController _controladorNome = TextEditingController();
  final TextEditingController _controladorEmail = TextEditingController();
  final TextEditingController _controladorTelefone = TextEditingController();
  final TextEditingController _controladorEmpresa = TextEditingController();
  final LeadService service = LeadService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Cadastro de Lead")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            children: [
              TextField(
                controller: _controladorNome,
                decoration: InputDecoration(
                    icon: Icon(Icons.man),
                    labelText: "Nome",
                    hintText: "Digite seu nome"
                ),
                keyboardType: TextInputType.text,
              ),

              TextField(
                controller: _controladorEmail,
                decoration: InputDecoration(
                    icon: Icon(Icons.mail_lock_outlined),
                    labelText: "E-mail",
                    hintText: 'exemple@gmail.com'
                ),
                keyboardType: TextInputType.text,
              ),
              TextField(
                style: TextStyle(
                    fontSize: 20
                ),
                controller: _controladorTelefone,
                decoration: InputDecoration(
                  icon: Icon(Icons.phone),
                  labelText: "Telefone",
                  hintText: '44 99999999',
                ),
                keyboardType: TextInputType.number,
              ),
              TextField(
                controller: _controladorEmpresa,
                decoration: InputDecoration(
                    icon: Icon(Icons.work),
                    labelText: "Empresa",
                    hintText: 'Digite sua empresa'
                ),
                keyboardType: TextInputType.text,
              ),
              TextButton(
                onPressed: () async {
                  final String nome = _controladorNome.text;
                  final String email = _controladorEmail.text;
                  final String telefone = _controladorTelefone.text;
                  final String empresa = _controladorEmpresa.text;

                  if (!nome.isEmpty && !email.isEmpty && !telefone.isEmpty &&
                      !empresa.isEmpty) {
                    final leadCriado = Lead(nome, email, telefone, empresa, "");
                    await service.register(leadCriado);
                    Navigator.pop(context, leadCriado);
                  }
                },
                child: Text("Confirmar"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ItemLeads extends StatelessWidget {
  final Lead _lead;
  ItemLeads(this._lead);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: ListTile(
          leading: Icon(Icons.person),
          title: Text(_lead.nome.toString()),
          subtitle: Text(_lead.email.toString()),
          contentPadding: EdgeInsets.symmetric(horizontal: 20.0),
        ),
      ),
    );
  }
}