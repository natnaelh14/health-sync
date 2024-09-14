"use client";

import { DataTable } from "~/components/table/DataTable";
import { columns } from "~/components/table/columns";

export default function Home() {
  return (
    <div>
      <DataTable columns={columns} data={[]} />
    </div>
  );
}
