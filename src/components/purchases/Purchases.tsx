
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, ShoppingCart, Edit } from "lucide-react";
import AddPurchaseModal from "./AddPurchaseModal";

interface Purchase {
  id: string;
  clientName: string;
  clientId: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: "1",
      clientName: "Jean Dupont",
      clientId: "1",
      items: [
        { name: "Laptop Dell XPS 13", quantity: 2, price: 1299.99 },
        { name: "Souris Logitech MX Master", quantity: 2, price: 99.99 }
      ],
      total: 2799.96,
      date: "2024-01-15",
      status: 'completed'
    },
    {
      id: "2",
      clientName: "Marie Martin",
      clientId: "2",
      items: [
        { name: "Écran Samsung 27\"", quantity: 3, price: 299.99 }
      ],
      total: 899.97,
      date: "2024-01-10",
      status: 'completed'
    },
    {
      id: "3",
      clientName: "Pierre Durand",
      clientId: "3",
      items: [
        { name: "Laptop Dell XPS 13", quantity: 1, price: 1299.99 }
      ],
      total: 1299.99,
      date: "2024-01-08",
      status: 'pending'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPurchases = purchases.filter(purchase =>
    purchase.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddPurchase = (newPurchase: Omit<Purchase, 'id'>) => {
    const purchase: Purchase = {
      id: Date.now().toString(),
      ...newPurchase
    };
    setPurchases([...purchases, purchase]);
  };

  const getStatusColor = (status: Purchase['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Purchase['status']) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achats</h1>
          <p className="text-gray-600">Gérez les achats de vos clients</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Enregistrer un achat
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total achats</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchases.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achats terminés</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {purchases.filter(p => p.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {purchases.filter(p => p.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CA total</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{purchases.filter(p => p.status === 'completed').reduce((sum, purchase) => sum + purchase.total, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Rechercher un achat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Purchases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des achats</CardTitle>
          <CardDescription>
            Historique de tous les achats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell className="font-medium">#{purchase.id}</TableCell>
                  <TableCell>{purchase.clientName}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {purchase.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>€{purchase.total.toFixed(2)}</TableCell>
                  <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(purchase.status)}>
                      {getStatusLabel(purchase.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
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

      <AddPurchaseModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddPurchase}
      />
    </div>
  );
};

export default Purchases;
