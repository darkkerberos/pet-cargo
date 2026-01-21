import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Users = () => {
  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Users</h1>
          <p className="text-slate-500">Manage user database.</p>
        </div>
        <Button className="bg-[#00365c]">Add User</Button>
      </header>
      <Card className="overflow-hidden border-none shadow-lg">
        <CardHeader className="bg-white border-b">
          <CardTitle className="text-lg">User List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium">John Doe</td>
                <td className="px-6 py-4 text-sm text-slate-600">john@example.com</td>
                <td className="px-6 py-4 text-sm">Customer</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
