import React from "react";
import { Button } from "@/shared/components/ui/button";

export default function ProductForm({
  onSubmit,
  initialName = "",
}: {
  onSubmit: (name: string) => void;
  initialName?: string;
}) {
  const [name, setName] = React.useState(initialName);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name);
        setName("");
      }}
      className="space-y-3"
    >
      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
