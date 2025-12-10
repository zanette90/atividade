
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mobile_app/models/Lead.dart';
class LeadService {

  static const String url = "http://localhost:8080/api/leads";

  Future<String> register(Lead lead) async {
    try {
      final response = await http.post(
        Uri.parse(url),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(lead.toJson()),
      );
      print(response.body);
      return response.body;
    } catch (error) {
      throw Exception("Erro na requisição: $error");
    }
  }

  //Future<List<Lead>> getLead() async {
    //try {
      //final response = await http.get(Uri.parse(url));
      //print(response.body);
      //final Map<String, dynamic> jsonBody = jsonDecode(response.body);
      //final List<dynamic> jsonList = jsonBody['content'] ?? [];

      //return jsonList.map((json) => Lead.fromJson(json)).toList();
    //} catch (e) {
      //throw Exception("Erro na requisição: $e");
    //}
  //}

  Future<List<Lead>> getLead() async {
    List<Lead> todosLeads = [];
    int pagina = 0;
    int tamanhoPagina = 20;
    bool temMais = true;

    try {
      while (temMais) {
        final response = await http.get(
          Uri.parse('$url?page=$pagina&size=$tamanhoPagina'),
        );

        final Map<String, dynamic> jsonBody = jsonDecode(response.body);
        final List<dynamic> jsonList = jsonBody['content'] ?? [];

        final leadsPagina = jsonList.map((json) => Lead.fromJson(json)).toList();
        todosLeads.addAll(leadsPagina);

        if (leadsPagina.length < tamanhoPagina) {
          temMais = false;
        } else {
          pagina++;
        }
      }
      return todosLeads;
    } catch (e) {
      throw Exception("Erro ao carregar leads: $e");
    }
  }

  Future<String> delLead(id) async {
    http.Response response = await http.delete(Uri.parse("$url/$id"));
    return response.body;
  }

  Future<String> patchLead(id, String status) async {
    http.Response response = await http.patch(Uri.parse("$url/$id"));
    return response.body;
  }
}