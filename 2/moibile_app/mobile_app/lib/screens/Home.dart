import 'package:flutter/material.dart';
import 'package:mobile_app/screens/FormularioLead.dart';
import 'package:mobile_app/models/Lead.dart';
import 'package:mobile_app/api/services/LeadService.dart';

class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final LeadService service = LeadService();
  final List<Lead> leadFiltrado = [];
  int _selectedIndex = 0;

  final List<String?> _statusMenu = [
    null,
    "NOVO",
    "CONTATO",
    "PROPOSTA",
    "NEGOCIACAO",
    "GANHO",
    "PERDIDO"
  ];

  final List<String> _titles = [
    "Todos os Leads",
    "Leads Novos",
    "Leads Contatados",
    "Leads Proposta",
    "Leads Negociação",
    "Leads Ganhos",
    "Leads Perdidos"
  ];

  Future<List<Lead>>? _futureLeads;

  @override
  void initState() {
    super.initState();
    _futureLeads = _carregarLeads();
  }

  Future<List<Lead>> _carregarLeads() async {
    List<Lead> leads = await service.getLead();
    final statusFiltro = _statusMenu[_selectedIndex];
    if (statusFiltro != null) {
      leads = leads.where((l) => l.statusLead == statusFiltro).toList();
    }
    return leads;
  }

  void _abrirFormulario() async {
    final leadRecebido = await Navigator.push<Lead?>(
      context,
      MaterialPageRoute(builder: (context) => FormularioLead()),
    );

    if (leadRecebido != null) {
      setState(() {
        leadFiltrado.add(leadRecebido);
        _futureLeads = _carregarLeads();
      });
    }
  }

  void _filtrarPorStatus(int index) {
    setState(() {
      _selectedIndex = index;
      _futureLeads = _carregarLeads();
    });
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_titles[_selectedIndex]),
        leading: Builder(
          builder: (context) => IconButton(
            icon: Icon(Icons.menu),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            tooltip: "Cadastrar Lead",
            onPressed: _abrirFormulario,
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(color: Colors.blue),
              child: Text(
                "Menu",
                style: TextStyle(color: Colors.white, fontSize: 24),
              ),
            ),
            ListTile(
              leading: Icon(Icons.add),
              title: Text("Cadastrar Lead"),
              onTap: () {
                Navigator.pop(context);
                _abrirFormulario();
              },
            ),
            ListTile(
              leading: Icon(Icons.list),
              title: Text("Todos os Leads"),
              onTap: () => _filtrarPorStatus(0),
            ),
            ExpansionTile(
              leading: Icon(Icons.filter_alt),
              title: Text("Por Status"),
              children: [
                ListTile(title: Text("Novos"), onTap: () => _filtrarPorStatus(1)),
                ListTile(title: Text("Contato"), onTap: () => _filtrarPorStatus(2)),
                ListTile(title: Text("Proposta"), onTap: () => _filtrarPorStatus(3)),
                ListTile(title: Text("Negociacao"), onTap: () => _filtrarPorStatus(4)),
                ListTile(title: Text("Ganhos"), onTap: () => _filtrarPorStatus(5)),
                ListTile(title: Text("Perdidos"), onTap: () => _filtrarPorStatus(6)),
              ],
            ),
          ],
        ),
      ),
      body: FutureBuilder<List<Lead>>(
        future: _futureLeads,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text("Nenhum lead encontrado."));
          }
          final leads = snapshot.data!;
          return ListView.builder(
            itemCount: leads.length,
            itemBuilder: (context, index) {
              final lead = leads[index];
              return Padding(
                padding: const EdgeInsets.all(8.0),
                child: ListTile(
                  leading: Icon(Icons.person),
                  title: Text(lead.nome),
                  subtitle: Text(lead.telefone),
                  trailing: Text(lead.empresa)
                ),
              );

            },
          );
        },
      ),
    );
  }
}