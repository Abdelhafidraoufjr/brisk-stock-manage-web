
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const Analytics = () => {
  // Mock data for charts
  const salesData = [
    { month: 'Jan', sales: 12000, orders: 45 },
    { month: 'Fév', sales: 15000, orders: 52 },
    { month: 'Mar', sales: 18000, orders: 67 },
    { month: 'Avr', sales: 14000, orders: 49 },
    { month: 'Mai', sales: 22000, orders: 78 },
    { month: 'Jun', sales: 25000, orders: 85 },
  ];

  const topProducts = [
    { name: 'Laptop Dell XPS 13', value: 45, color: '#8884d8' },
    { name: 'Écran Samsung 27"', value: 30, color: '#82ca9d' },
    { name: 'Souris Logitech', value: 15, color: '#ffc658' },
    { name: 'Autres', value: 10, color: '#ff7300' },
  ];

  const clientActivity = [
    { month: 'Jan', nouveaux: 12, actifs: 45 },
    { month: 'Fév', nouveaux: 8, actifs: 52 },
    { month: 'Mar', nouveaux: 15, actifs: 58 },
    { month: 'Avr', nouveaux: 10, actifs: 62 },
    { month: 'Mai', nouveaux: 18, actifs: 70 },
    { month: 'Jun', nouveaux: 22, actifs: 78 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Analysez les performances de votre business</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CA ce mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€25,000</div>
            <p className="text-xs text-muted-foreground">
              +12% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground">
              +8% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€294</div>
            <p className="text-xs text-muted-foreground">
              +3% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de croissance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">
              Croissance mensuelle
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des ventes</CardTitle>
            <CardDescription>Chiffre d'affaires et nombre de commandes par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" name="CA (€)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produits les plus vendus</CardTitle>
            <CardDescription>Répartition des ventes par produit</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topProducts}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activité des clients</CardTitle>
            <CardDescription>Nouveaux clients vs clients actifs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clientActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="nouveaux" stroke="#8884d8" name="Nouveaux clients" />
                <Line type="monotone" dataKey="actifs" stroke="#82ca9d" name="Clients actifs" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendances récentes</CardTitle>
            <CardDescription>Métriques importantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Taux de conversion</span>
                <span className="text-sm text-green-600">↗ 3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Satisfaction client</span>
                <span className="text-sm text-green-600">↗ 4.8/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Temps de traitement</span>
                <span className="text-sm text-green-600">↗ 2.1 jours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Stock de sécurité</span>
                <span className="text-sm text-yellow-600">⚠ 3 alertes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">ROI marketing</span>
                <span className="text-sm text-green-600">↗ 12.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
