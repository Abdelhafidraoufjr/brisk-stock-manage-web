
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, BarChart3, Shield, Zap } from "lucide-react";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'register' | 'dashboard'>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  if (currentView === 'login') {
    return (
      <Login 
        onSuccess={() => setIsAuthenticated(true)}
        onRegisterClick={() => setCurrentView('register')}
        onBackToLanding={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <Register 
        onSuccess={() => setIsAuthenticated(true)}
        onLoginClick={() => setCurrentView('login')}
        onBackToLanding={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">StockPro</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" onClick={() => setCurrentView('login')}>
                Connexion
              </Button>
              <Button onClick={() => setCurrentView('register')}>
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Gérez votre stock en toute
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> simplicité</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Solution complète de gestion de stock avec suivi des clients, inventaire en temps réel, 
            et analytics avancés pour optimiser votre business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => setCurrentView('register')}
            >
              Commencer gratuitement
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => setCurrentView('login')}
            >
              Se connecter
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600">
              Des outils puissants pour une gestion efficace
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Package className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Gestion d'inventaire</CardTitle>
                <CardDescription>
                  Suivez vos stocks en temps réel avec des alertes automatiques
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Gestion des clients</CardTitle>
                <CardDescription>
                  Base de données complète avec historique des achats
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <ShoppingCart className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Suivi des achats</CardTitle>
                <CardDescription>
                  Enregistrez et analysez toutes vos transactions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Tableaux de bord et rapports détaillés
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Sécurisé</CardTitle>
                <CardDescription>
                  Vos données sont protégées et sauvegardées
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Zap className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Rapide</CardTitle>
                <CardDescription>
                  Interface intuitive et temps de réponse optimisés
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Prêt à optimiser votre gestion de stock ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez des milliers d'entreprises qui font confiance à StockPro
          </p>
          <Button 
            size="lg" 
            className="text-lg px-12 py-4"
            onClick={() => setCurrentView('register')}
          >
            Démarrer maintenant
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className="h-8 w-8 text-indigo-400" />
            <span className="text-xl font-bold">StockPro</span>
          </div>
          <p className="text-gray-400">
            © 2024 StockPro. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
