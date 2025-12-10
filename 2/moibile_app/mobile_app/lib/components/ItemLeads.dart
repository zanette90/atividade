import 'package:flutter/material.dart';
import 'package:mobile_app/models/Lead.dart';

class ItemLeads extends StatelessWidget {
  final Lead _lead;
  ItemLeads(this._lead);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: Icon(
          Icons.person,
          color: Colors.white, // ou outra cor visível no fundo
        ),
        title: Text(_lead.nome.toString()),
        subtitle: Text(_lead.empresa.toString()),
      ),
    );
  }

}