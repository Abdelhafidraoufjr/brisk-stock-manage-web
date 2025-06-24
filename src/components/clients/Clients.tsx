
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Edit } from "lucide-react";
import AddClientModal from "./AddClientModal";
import EditClientModal from "./EditClientModal";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  totalPurchases: number;
  lastPurchase: string;
  status: 'active' | 'inactive';
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      phone: "01 23 45 67 89",
      company: "Tech Solutions",
      address: "123 Rue de la Paix, Paris",
      totalPurchases: 15420.50,
      lastPurchase: "2024-01-15",
      status: 'active'
    },
    {
      id: "2",
      name: "Marie Martin",
      email: "marie.martin@email.com",
      phone: "01 98 76 54 32",
      company: "Digital Corp",
      address: "456 Avenue des Champs, Lyon",
      totalPurchases: 8750.00,
      lastPurchase: "2024-01-10",
      status: 'active'
    },
    {
      id: "3",
      name: "Pierre Durand",
      email: "pierre.durand@email.com",
      phone: "01 11 22 33 44",
      company: "Innovation Ltd",
      address: "789 Boulevard Saint-Germain, Marseille",
      totalPurchases: 3200.75,
      lastPurchase: "2023-12-20",
      status: 'inactive'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (newClient: Omit<Client, 'id' | 'totalPurchases' | 'lastPurchase'>) => {
    const client: Client = {
      id: Date.now().toString(),
      totalPurchases: 0,
      lastPurchase: new Date().toISOString().split('T')[0],
      ...newClient
    };
    setClients([...clients, client]);
  };

  const handleEditClient = (updatedClient: Client) => {
    setClients(clients.map(client => client.id === updatedClient.id ? updatedClient : client));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Gérez votre base de données clients</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CA total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{clients.reduce((sum, client) => sum + client.totalPurchases, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des clients</CardTitle>
          <CardDescription>
            Tous vos clients et leurs informations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Total achats</TableHead>
                <TableHead>Dernier achat</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.company}</TableCell>
                  <TableCell>€{client.totalPurchases.toFixed(2)}</TableCell>
                  <TableCell>{new Date(client.lastPurchase).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                      {client.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingClient(client)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddClientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddClient}
      />

      {editingClient && (
        <EditClientModal
          client={editingClient}
          isOpen={!!editingClient}
          onClose={() => setEditingClient(null)}
          onEdit={handleEditClient}
        />
      )}
    </div>
  );
};

export default Clients;
