import { Button } from "@/shared/components/ui/button";
import Header from "@/shared/components/layout/Header";
import ComponentShowcase from "@/shared/components/layout/ComponentShowcase";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/5">
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-5xl font-bold tracking-tight">
              Welcome to Your Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A modern React + TypeScript starter kit with shadcn/ui, theme tokens, and
              powerful query/mutation tools.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={() => alert("Let's go! 🚀")}>
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🎨"
            title="Beautiful UI"
            description="Pre-built components with shadcn/ui and Tailwind CSS"
          />
          <FeatureCard
            icon="🌓"
            title="Dark Mode"
            description="Seamless theme switching with theme tokens"
          />
          <FeatureCard
            icon="⚙️"
            title="Data Fetching"
            description="React Query for queries and mutations"
          />
        </div>

        {/* Showcase Section */}
        <ComponentShowcase />

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl border border-primary/20 p-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Explore More Features</h3>
            <p className="text-muted-foreground">Check out the products demo page</p>
          </div>
          <a href="/products">
            <Button>View Products →</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card rounded-xl border p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 space-y-3">
      <div className="text-3xl">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
