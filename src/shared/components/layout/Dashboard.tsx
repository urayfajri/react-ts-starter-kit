import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import Header from "@/shared/components/layout/Header";
import ComponentShowcase from "@/shared/components/layout/ComponentShowcase";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 hero-mesh">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero — React Bits style: bold headline + gradient glow */}
        <section className="pt-12 pb-16 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36 relative">
          <div className="max-w-3xl space-y-6 relative">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm"
              aria-hidden
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              React + TypeScript
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl lg:leading-[1.1]">
              Build something{" "}
              <span className="text-gradient-glow">memorable</span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl leading-relaxed">
              A modern React + TypeScript starter with shadcn/ui, theme tokens, and React
              Query. Clear structure, best practices, and a UI that stands out.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/signup">
                <Button size="lg" className="min-w-[140px] shadow-lg shadow-primary/25">
                  Get started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="min-w-[140px]">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features — cards with hover glow */}
        <section id="features" className="py-16 sm:py-24 scroll-mt-20">
          <div className="mb-12 text-center sm:text-left">
            <h2 className="text-2xl font-bold sm:text-3xl">What’s included</h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Everything you need to ship a production-ready React app.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            <FeatureCard
              icon="🎨"
              title="Beautiful UI"
              description="Pre-built components with shadcn/ui and Tailwind. Accessible and customizable."
            />
            <FeatureCard
              icon="🌓"
              title="Dark mode"
              description="Theme switching with CSS variables. No flash, works with system preference."
            />
            <FeatureCard
              icon="⚙️"
              title="Data & state"
              description="React Query for server state, Zustand for global UI. Hooks and guards included."
            />
          </div>
        </section>

        {/* Component Showcase */}
        <section className="py-16 sm:py-24" aria-labelledby="showcase-heading">
          <div className="mb-12 text-center sm:text-left">
            <h2 id="showcase-heading" className="text-2xl font-bold sm:text-3xl">
              Component showcase
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Try button variants and see the design system in action.
            </p>
          </div>
          <ComponentShowcase />
        </section>

        {/* CTA — React Bits style: glowing border + gradient */}
        <section className="py-16 sm:py-24">
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 p-8 sm:p-10 lg:p-12 shadow-xl shadow-primary/5 smooth-transition transition-all duration-300 hover:border-primary/35 hover:shadow-primary/10">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.02] pointer-events-none" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-bold sm:text-2xl">Explore the app</h3>
                <p className="text-muted-foreground max-w-md">
                  Sign in to see the app layout with sidebar, dashboard, and products demo.
                </p>
              </div>
              <div className="flex shrink-0 justify-center sm:justify-end">
                <Link to="/app/products">
                  <Button size="lg" className="w-full sm:w-auto min-w-[160px] shadow-lg shadow-primary/20">
                    View products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
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
    <article
      className="group relative rounded-2xl border border-border bg-card p-6 sm:p-7 card-glow hover:-translate-y-0.5"
      tabIndex={0}
    >
      <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3.5 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </article>
  );
}
