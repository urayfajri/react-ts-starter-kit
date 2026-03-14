import { Link } from "react-router-dom";

export default function AppDashboardPage() {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Welcome to your app. Use the sidebar to navigate. You can collapse or expand it with the button at the bottom.
      </p>
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="font-semibold">Quick links</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li><Link to="/app/products" className="text-primary hover:underline">Products</Link> – Demo CRUD with React Query</li>
          <li>Add more routes under <code className="bg-muted px-1 rounded">/app/*</code> in <code className="bg-muted px-1 rounded">routes.tsx</code></li>
        </ul>
      </div>
    </div>
  );
}
