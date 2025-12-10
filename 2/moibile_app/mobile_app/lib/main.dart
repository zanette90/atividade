import 'package:flutter/material.dart';
import 'package:mobile_app/screens/Home.dart';

void main() {
  runApp(
  KanbanApp()
  );
}

class KanbanApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: Scaffold(
        body: HomePage(),
      ),
    );
  }
}












