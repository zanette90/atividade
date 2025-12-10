import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Inputs extends StatelessWidget {

  final TextEditingController dadosController;
  final String label;
  final String placeholder;
  final IconData icone;

  Inputs(this.dadosController, this.label, this.placeholder, this.icone);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: TextField(
        controller: dadosController,
        style: const TextStyle(fontSize: 20),
        decoration: InputDecoration(
          icon: Icon(icone),
          labelText: label,
          hintText: placeholder,
        ),
        keyboardType: TextInputType.text,
      ),
    );
  }
}