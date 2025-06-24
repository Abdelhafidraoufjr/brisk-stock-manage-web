
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Package, Users, ShoppingCart, BarChart3, Plus, LogOut } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Inventory from "@/components/inventory/Inventory";
import Clients from "@/components/clients/Clients";
import Purchases from "@/components/purchases/Purchases";
import Analytics from "@/components/analytics/Analytics";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'inventory' | 'clients' | 'purchases' | 'analytics'>('overview');

  const menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'inventory', label: 'Inventaire', icon: Package },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'purchases', label: 'Achats', icon: ShoppingCart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'inventory':
        return <Inventory />;
      case 'clients':
        return <Clients />;
      case 'purchases':
        return <Purchases />;
      case 'analytics':
        return <Analytics />;
      default:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Articles en stock</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <Package className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clients actifs</p>
                    <p className="text-2xl font-bold text-gray-900">567</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Achats ce mois</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Valeur du stock</p>
                    <p className="text-2xl font-bold text-gray-900">€45,678</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => setActiveSection('inventory')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un article
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveSection('clients')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un client
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveSection('purchases')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Enregistrer un achat
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Nouvel article ajouté</span>
                    <span className="text-gray-500">Il y a 2h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Client mis à jour</span>
                    <span className="text-gray-500">Il y a 3h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Achat enregistré</span>
                    <span className="text-gray-500">Il y a 5h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={(section) => setActiveSection(section as any)}
        onLogout={onLogout}
      />
      <main className="flex-1 p-6 ml-64">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
