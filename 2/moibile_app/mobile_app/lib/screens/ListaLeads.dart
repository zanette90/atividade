// lib/screens/ListaLeads.dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/Lead.dart';
import 'package:mobile_app/screens/FormularioLead.dart';
import 'package:mobile_app/api/services/LeadService.dart';

class ListaLeads extends StatefulWidget {
  final List<Lead> _leads = [];

  @override
  State<StatefulWidget> createState() {
    return ListaLeadState();
  }
}

class ListaLeadState extends State<ListaLeads> {
  final LeadService service = LeadService();
  bool _carregando = true;

  @override
  void initState() {
    super.initState();
    _carregarLeads();
  }

  void _carregarLeads() async {
    try {
      final leads = await service.getLead();
      setState(() {
        widget._leads.addAll(leads);
        _carregando = false;
      });
    } catch (e) {
      setState(() {
        _carregando = false;
      });
      debugPrint("Erro ao carregar leads: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Leads App")),
      body: _carregando
          ? Center(
          child: CircularProgressIndicator())
          : ListView.builder(
        itemCount: widget._leads.length,
        itemBuilder: (context, index) {
          final lead = widget._leads[index];
          return ItemLeads(lead);
        },
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {
          final Future<Lead?> futuro = Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => FormularioLead(),
            ),
          );

          futuro.then((leadRecebido) {
            if (leadRecebido != null) {
              setState(() {
                widget._leads.add(leadRecebido);

              });
            }
          });
        },
      ),
    );
  }
}