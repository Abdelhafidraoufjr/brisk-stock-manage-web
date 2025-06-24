
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";

interface Purchase {
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

interface AddPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (purchase: Purchase) => void;
}

const AddPurchaseModal = ({ isOpen, onClose, onAdd }: AddPurchaseModalProps) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientId: "",
    date: new Date().toISOString().split('T')[0],
    status: 'completed' as Purchase['status']
  });
  
  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0 }
  ]);
  
  const { toast } = useToast();

  // Mock clients data
  const mockClients = [
    { id: "1", name: "Jean Dupont" },
    { id: "2", name: "Marie Martin" },
    { id: "3", name: "Pierre Durand" }
  ];

  // Mock items data
  const mockItems = [
    { name: "Laptop Dell XPS 13", price: 1299.99 },
    { name: "Souris Logitech MX Master", price: 99.99 },
    { name: "Écran Samsung 27\"", price: 299.99 }
  ];

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || items.some(item => !item.name)) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const purchase: Purchase = {
      ...formData,
      items: items.filter(item => item.name),
      total: calculateTotal()
    };

    onAdd(purchase);
    
    // Reset form
    setFormData({
      clientName: "",
      clientId: "",
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    });
    setItems([{ name: "", quantity: 1, price: 0 }]);
    
    toast({
      title: "Achat enregistré",
      description: "L'achat a été enregistré avec succès",
    });
    
    onClose();
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const selectItem = (index: number, itemName: string) => {
    const selectedItem = mockItems.find(item => item.name === itemName);
    if (selectedItem) {
      updateItem(index, 'name', selectedItem.name);
      updateItem(index, 'price', selectedItem.price);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enregistrer un achat</DialogTitle>
          <DialogDescription>
            Enregistrez un nouvel achat pour un client
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Client *</Label>
              <Select 
                value={formData.clientName} 
                onValueChange={(value) => {
                  const client = mockClients.find(c => c.name === value);
                  setFormData(prev => ({ 
                    ...prev, 
                    clientName: value,
                    clientId: client?.id || ""
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.name}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Statut</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: Purchase['status']) => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Articles *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter
                </Button>
              </div>
              
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-lg">
                  <div className="col-span-5">
                    <Label className="text-xs">Article</Label>
                    <Select 
                      value={item.name} 
                      onValueChange={(value) => selectItem(index, value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Sélectionner un article" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockItems.map((mockItem) => (
                          <SelectItem key={mockItem.name} value={mockItem.name}>
                            {mockItem.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2">
                    <Label className="text-xs">Quantité</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                      min="1"
                      className="h-8"
                    />
                  </div>
                  
                  <div className="col-span-3">
                    <Label className="text-xs">Prix unitaire</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                      min="0"
                      className="h-8"
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <Label className="text-xs">Total</Label>
                    <div className="text-sm font-medium">
                      €{(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    {items.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="text-right">
                <div className="text-lg font-bold">
                  Total: €{calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPurchaseModal;
