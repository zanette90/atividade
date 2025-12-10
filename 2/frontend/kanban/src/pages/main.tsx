import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import '@mantine/core/styles.css';
import "../styles/style.css";

import { useEffect, useState } from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";

import { Button, Group, Textarea, TextInput, Accordion, Modal, Grid, Text, ButtonGroup } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useForm } from '@mantine/form';
import { leadApi } from '../api';
import { Badge } from '@mantine/core';
import { HeaderSearch } from "../components/header";

import { ScrollArea } from "@mantine/core";

const Main: React.FC = () => {
  const [leads, setLeads] = useState([]);
  const [leadsNovo, setLeadsNovo] = useState([]);
  const [leadsContato, setLeadsContato] = useState([]);
  const [negociacao, setLeadsNegociacao] = useState([]);
  const [ganho, setLeadsGanho] = useState([]);
  const [perdido, setLeadsPerdido] = useState([]);

  const [opened, { open, close }] = useDisclosure(false);

  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [deleteId, setDeleteId] = useState(null);


  useEffect(() => {
    async function carregaLeads() {
      try {
        const dados = await leadApi.leadGet();
        const lista = dados.content || [];
        setLeads(lista);
      } catch (error) {
        console.error("Erro ao buscar leads:", error);
      }
    }
    carregaLeads();
  }, []);

  useEffect(() => {
    const novos = leads.filter(lead => lead.statusLead === "NOVO");
    setLeadsNovo(novos);
    const contato = leads.filter(lead => lead.statusLead === "CONTATO");
    setLeadsContato(contato);
    const negociacao = leads.filter(lead => lead.statusLead === "NEGOCIACAO");
    setLeadsNegociacao(negociacao);
    const ganho = leads.filter(lead => lead.statusLead === "GANHO");
    setLeadsGanho(ganho);
    const perdido = leads.filter(lead => lead.statusLead === "PERDIDO");
    setLeadsPerdido(perdido);
  }, [leads]);

  const confirmar = async (values) => {
    await leadApi.leadPost(values);
    setLeads((prev) => [...prev, values]);
    close();
    form.reset();
  };


  const form = useForm({
    initialValues: {
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      observacoes: "",
      statusLead: "NOVO"
    },

    validate: {
      nome: (value) =>
        value.trim().length === 0 ? "O nome é obrigatório" : null,
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "E-mail inválido",
      telefone: (value) =>
        value.trim().length === 0 ? "O telefone é obrigatório" : null,
    },
  });

  const onDragEnd = ({ source: origem, destination: destino, draggableId: id }) => {
    if (!destino || !id) return;
    const lead = leads.find((lead) => lead.id === parseInt(id));
    if (origem.droppableId !== destino.droppableId) {
      lead.statusLead = destino.droppableId;
      setLeads([...leads]);
      leadApi.patchLead(id, destino.droppableId);
    }
  };

  const abrirConfirmacaoDelete = (id) => {
    openDelete();
    setDeleteId(parseInt(id));
  }

  const remover = (id) => {
    if (!id) return;
    leadApi.deleteLead(id);
    const novaLista = leads.filter(lead => lead.id !== id);
    setLeads(novaLista);
    closeDelete();
  };

  return (
    <>
    <HeaderSearch></HeaderSearch>
      <div>
        <div className=".painel_buttons">
          <Button onClick={open} mb="md" className=".painel_buttons">
            <IconPlus/>Novo Lead
          </Button>
        </div>
        
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid>
            <Grid.Col span={2} className='coluna' >
              <Droppable droppableId={"NOVO"}>
                {(provided) => (
                  
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Accordion
                      key={"NOVO"}
                      multiple={false}
                      variant="separated"
                      transitionDuration={500}
                    >
                      <div className="titulo" id="novo">
                        <Badge variant="filled" leftSection radius="xl">{leadsNovo.length}</Badge> Novo
                      </div>
                      <ScrollArea h={500} type="auto" scrollbarSize={2}>
                      {leadsNovo.map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={String(lead.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                marginBottom: 10,
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Accordion.Item key={lead.id} value={lead.email} maw={300} {...provided.dragHandleProps} className="item" >
                                <Accordion.Control>
                                  {lead.nome}
                                </Accordion.Control>
                                <Accordion.Panel>
                                  <Text><strong>E-mail : </strong></Text>
                                  <Text>{lead.email}</Text>
                                  <Text><strong>Telefone : </strong> </Text>
                                  <Text>{lead.telefone}</Text>
                                  <Text><strong>Empresa : </strong> </Text>
                                  <Text>{lead.empresa}</Text>
                                  <Text><strong>Observações : </strong> </Text>
                                  <Text>{lead.observacoes}</Text>
                                  <Button onClick={() => abrirConfirmacaoDelete(lead.id)}><IconMinus />Remover</Button>
                                </Accordion.Panel>
                              </Accordion.Item>
                            </div>
                            
                          )}
                        </Draggable>
                      ))}
                      </ScrollArea>
                    </Accordion>
                    
                    {provided.placeholder}
                    
                    
                  </div>
                  
                )}
              </Droppable>
            </Grid.Col>


            <Grid.Col span={2} className='coluna' >
              <Droppable droppableId={"CONTATO"}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}

                  >
                    <Accordion
                      key={"CONTATO"}
                      multiple={false}
                      variant="separated"
                      transitionDuration={500}
                    >
                      <div className="titulo" id="novo">
                        <Badge variant="filled" leftSection radius="xl">{leadsContato.length}</Badge>
                        Contato 
                      </div>
                      <ScrollArea h={500} type="auto" scrollbarSize={2}>
                      {leadsContato.map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={String(lead.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                marginBottom: 10,
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Accordion.Item key={lead.id} value={lead.email} maw={300} {...provided.dragHandleProps} className="item">
                                <Accordion.Control>
                                  {lead.nome}
                                </Accordion.Control>
                                <Accordion.Panel>
                                  <Text><strong>E-mail : </strong> </Text>
                                  <Text>{lead.email}</Text>
                                  <Text><strong>Telefone : </strong></Text>
                                  <Text>{lead.telefone}</Text>
                                  <Text><strong>Empresa : </strong> </Text>
                                  <Text>{lead.empresa}</Text>
                                  <Text><strong>Observações:</strong> </Text>
                                  <Text>{lead.observacoes}</Text>
                                  <Button onClick={() => abrirConfirmacaoDelete(lead.id)}><IconMinus />Remover</Button>
                                </Accordion.Panel>
                              </Accordion.Item>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      </ScrollArea>
                    </Accordion>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid.Col>

            <Grid.Col span={2} className='coluna'>
              <Droppable droppableId={"NEGOCIACAO"}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}

                  >
                    <Accordion
                      key={"NEGOCIACAO"}
                      multiple={false}
                      variant="separated"
                      transitionDuration={500}
                    >
                      <div className="titulo" id="novo">
                        <Badge  variant="filled" leftSection radius="xl">{negociacao.length} </Badge>
                        Negociacao 
                      </div>
                      <ScrollArea h={500} type="auto" scrollbarSize={2}>
                      {negociacao.map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={String(lead.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                marginBottom: 10,
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Accordion.Item 
                              key={lead.id} 
                              value={lead.email} maw={300} {...provided.dragHandleProps} 
                              className="item">
                                <Accordion.Control>
                                  {lead.nome}
                                </Accordion.Control>
                                <Accordion.Panel>
                                   <Text><strong>E-mail : </strong> </Text>
                                  <Text>{lead.email}</Text>
                                  <Text><strong>Telefone : </strong></Text>
                                  <Text>{lead.telefone}</Text>
                                  <Text><strong>Empresa : </strong> </Text>
                                  <Text>{lead.empresa}</Text>
                                  <Text><strong>Observações:</strong> </Text>
                                  <Text>{lead.observacoes}</Text>
                                  <Button onClick={() => abrirConfirmacaoDelete(lead.id)}><IconMinus />Remover</Button>
                                </Accordion.Panel>
                              </Accordion.Item>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      </ScrollArea>
                    </Accordion>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid.Col>

            <Grid.Col span={2} className='coluna'>
              <Droppable droppableId={"GANHO"}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}

                  >
                    <Accordion
                      key={"GANHO"}
                      multiple={false}
                      variant="separated"
                      transitionDuration={500}
                    >
                      <div className="titulo" id="novo">
                        <Badge variant="filled" radius="lg" leftSection>{ganho.length}</Badge>
                        Ganho 
                      </div>
                      <ScrollArea h={500} type="auto" scrollbarSize={2}>
                      {ganho.map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={String(lead.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                marginBottom: 10,
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Accordion.Item 
                              key={lead.id} 
                              value={lead.email} 
                              maw={300} {...provided.dragHandleProps } 
                              className="item">
                                <Accordion.Control>
                                  {lead.nome}
                                </Accordion.Control>
                                <Accordion.Panel>
                                   <Text><strong>E-mail : </strong> </Text>
                                  <Text>{lead.email}</Text>
                                  <Text><strong>Telefone : </strong></Text>
                                  <Text>{lead.telefone}</Text>
                                  <Text><strong>Empresa : </strong> </Text>
                                  <Text>{lead.empresa}</Text>
                                  <Text><strong>Observações:</strong> </Text>
                                  <Text>{lead.observacoes}</Text>
                                  <Button onClick={() => abrirConfirmacaoDelete(lead.id)}><IconMinus />Remover</Button>
                                </Accordion.Panel>
                              </Accordion.Item>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      </ScrollArea>
                    </Accordion>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid.Col>

            <Grid.Col span={2} className='coluna' >
              <Droppable droppableId={"PERDIDO"}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Accordion
                      key={"PERDIDO"}
                      multiple={false}
                      variant="separated"
                      transitionDuration={500}
                    >
                      <div className="titulo" id="novo">
                        <Badge variant="filled" radius="xl">{perdido.length}</Badge>
                        Perdido
                      </div>
                      <ScrollArea h={500} type="auto" scrollbarSize={2}>
                      {perdido.map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={String(lead.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                marginBottom: 10,
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Accordion.Item 
                              key={lead.id} 
                              value={lead.email} 
                              maw={300} 
                              {...provided.dragHandleProps} 
                              className="item"
                              >
                                <Accordion.Control>
                                  {lead.nome}
                                </Accordion.Control>
                                <Accordion.Panel>
                                   <Text><strong>E-mail : </strong> </Text>
                                  <Text>{lead.email}</Text>
                                  <Text><strong>Telefone : </strong></Text>
                                  <Text>{lead.telefone}</Text>
                                  <Text><strong>Empresa : </strong> </Text>
                                  <Text>{lead.empresa}</Text>
                                  <Text><strong>Observações:</strong> </Text>
                                  <Text>{lead.observacoes}</Text>
                                  <Button onClick={() => abrirConfirmacaoDelete(lead.id)}><IconMinus />Remover</Button>
                                </Accordion.Panel>
                              </Accordion.Item>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      </ScrollArea>
                    </Accordion>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid.Col>
          </Grid>
        </DragDropContext>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        withinPortal={false}
        size="55rem"
        title="Cadastro de Leads"
        centered
      >
        <form onSubmit={form.onSubmit((values) => confirmar(values))}>
          <Group wrap="nowrap" mt="md">
            <TextInput
              label="Nome"
              placeholder="Digite seu nome"
              required
              {...form.getInputProps("nome")}
            />
            <TextInput
              label="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              required
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Telefone"
              placeholder="Digite seu telefone"
              required
              {...form.getInputProps("telefone")}
            />
            <TextInput
              label="Empresa"
              placeholder="Digite sua Empresa"
              {...form.getInputProps("empresa")}
            />
            <Textarea
              label="Observações"
              placeholder="Digite as observações"
              {...form.getInputProps("observacoes")}
            />
            <Group>
              <Button type="submit">Confirmar</Button>
              <Button variant="outline" onClick={close}>Cancelar</Button>
            </Group>
          </Group>
        </form>
      </Modal>

      <Modal
        opened={deleteOpened}
        withinPortal={false}
        onClose={closeDelete}
        title="Excluir Lead">
        <Group mt="md">
          <Text>Tem certeza que deseja excluir?</Text>
          <Button onClick={() => remover(deleteId)}>
            Sim
          </Button>
          <Button variant="outline" onClick={closeDelete}>Não</Button>
        </Group>
      </Modal>
    </>
  );
};

export default Main;